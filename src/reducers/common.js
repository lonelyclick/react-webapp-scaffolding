import { FETCH_START, FETCH_END, REQUEST_FAIL } from '../actions/common'

export function fetchApp(state = {}, action = {}) {
	switch (action.type) {
	case FETCH_START:
		return Object.assign({}, state, {random: action.random, show: true})
	case FETCH_END:
		return Object.assign({}, state, {random: action.random, show: false})
	default:
		return state
	}
}

export function httpApp(state = {}, action = {}) {
	switch (action.type) {
	case REQUEST_FAIL:
		return Object.assign({}, state, {httpFail: true, httpFailText: action.error})
	default :
		return state
	}
}

export default {fetchApp, httpApp}
