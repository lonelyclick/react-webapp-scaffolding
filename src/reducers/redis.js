import { REQ_REDIS, RES_REDIS } from '../actions/action'

function redisApp(state = {isFetching: false, didInvalidate: false, items: []}, action = {}) {
	switch (action.type) {
	case REQ_REDIS:
		return Object.assign({}, state, {
			isFetching: true,
			didInvalidate: false,
		})
	case RES_REDIS:
		return Object.assign({}, state, {
			isFetching: false,
			didInvalidate: false,
			items: action.response,
			lastUpdate: Date.now(),
		})
	default:
		return state
	}
}

export default redisApp
