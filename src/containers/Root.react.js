import React, { Component, PropTypes } from 'react/addons'
import { Navbar, Nav, NavItem, Glyphicon, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'

import Loadingbar from '../components/Loadingbar'

class Root extends Component {
	@autobind
	onLogout(e) {
		e.preventDefault()
		alert('logout')
	}

	@autobind
	onToken(e) {
		e.preventDefault()
		alert('token')
	}

	render() {
		return (
			<div className="app">
				<Loadingbar loading={this.props.loading} color="yellow"/>
				<Navbar fixedTop inverse fluid brand={<span><Glyphicon glyph="dashboard" /> Project</span>}>
					<Nav>
						<LinkContainer to="/redis"><NavItem><Glyphicon glyph="hdd"/> Redis</NavItem></LinkContainer>
						<LinkContainer to="/bay"><NavItem><Glyphicon glyph="user"/> Key</NavItem></LinkContainer>
						<LinkContainer to="/log"><NavItem><Glyphicon glyph="log"/> Value</NavItem></LinkContainer>
					</Nav>
					<Nav right>
						<NavItem><Glyphicon glyph="user"/> guang@zhihu.com</NavItem>
						<NavItem onClick={this.onToken}><Glyphicon glyph="lock"/> Token</NavItem>
						<NavItem onClick={this.onLogout}><Glyphicon glyph="log-out"/> Logout</NavItem>
						<NavItem>{this.props.http.httpFailText}</NavItem>
					</Nav>
				</Navbar>

				<div className="app-main">
					{this.props.children}
				</div>
			</div>
		)
	}
}

Root.propTypes = {
	loading: PropTypes.any,
	http: PropTypes.any,
	children: PropTypes.element,
}

function mapStateToProps(state) {
	console.log(state)
	return {
		loading: state.loading,
		http: state.http,
	}
}

export default connect(mapStateToProps)(Root)

