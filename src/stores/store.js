import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import { fetchApp, httpApp } from '../reducers/common'
import redisApp from '../reducers/redis'
import api from '../middleware/api'

const logger = createLogger({
	level: 'info',
	collapsed: true,
	predicate: true,
})

const platformApp = combineReducers({
	http: httpApp,
	loading: fetchApp,
	redis: redisApp,
})

const createStoreWithMiddleware = applyMiddleware(
	thunk,
	api,
	logger
)(createStore)

export default createStoreWithMiddleware(platformApp)
