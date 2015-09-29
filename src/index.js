import React from 'react'
import Routes from './containers/Routes.react'
import { Provider } from 'react-redux'

import store from './stores/store'
import './static/sass/app.scss'

React.render(
	<Provider store={store}>
		{()=><Routes/>}
	</Provider>,
	document.body
)
