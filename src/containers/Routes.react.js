import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Root from './Root.react'
import NotFound from '../components/NotFound.react'
import Redis from './Redis.react'

class Routes extends Component {
	render() {
		return (
			<Router history={createBrowserHistory()}>
				<Route path="/" component={Root}>
					<Route path="/redis" component={Redis}/>
					<Route path="*" component={NotFound}/>
				</Route>
			</Router>
		)
	}
}

export default  Routes
