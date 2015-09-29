import React, { Component, PropTypes } from 'react'
import { Button, Nav, NavItem } from 'react-bootstrap'

class Tool extends Component {
	onAdd = (e)=> {
		e.preventDefault()
		alert('add')
	}

	onDelete = (e)=> {
		e.preventDefault()
	}

	onUpdate = (e)=> {
		e.preventDefault()
	}

	onQuery = (e)=> {
		const { onRemote } = this.props
		onRemote()
	}

	render() {
		return (
			<Nav>
				<NavItem eventKey={1} href="#">
					<Button bsStyle="primary" onClick={this.onAdd}>Add</Button>
					<Button bsStyle="danger" onClick={this.onDelete}>Delete</Button>
					<Button bsStyle="info" onClick={this.onUpdate}>Update</Button>
					<Button bsStyle="success" onClick={this.onQuery}>Query</Button>
				</NavItem>
			</Nav>
		)
	}
}

Tool.propTypes = {
	onRemote: PropTypes.func.isRequired,
}

export default Tool
