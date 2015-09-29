import ajax from '../utils/ajax'
import { CALL_API } from '../middleware/api'

export const REQ_REDIS = 'REQ_REDIS'
export const RES_REDIS = 'RES_REDIS'
export const FAIL_REDIS = 'FAIL_REDIS'


export function requestRedis() {
	return {
		type: REQ_REDIS,
	}
}

export function resRedis(item) {
	return {
		type: RES_REDIS,
		resAt: Date.now(),
		item: item,
	}
}

function fetchRedis() {
	return {
		[CALL_API]: {
			types: [REQ_REDIS, RES_REDIS, FAIL_REDIS],
			endpoint: '/redis/list',
			// schema: Schemas.USER,
			fetchOption: {method: 'get'},
		},
	}
}

export function loadRedis() {
	return (dispatch) => {
		return dispatch(fetchRedis())
	}
}