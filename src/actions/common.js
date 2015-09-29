export const FETCH_START = 'FETCH_START'
export const FETCH_END = 'FETCH_END'
export const REQUEST_FAIL = 'REQUEST_FAIL'

export function fetchStart(random) {
	return {
		type: FETCH_START,
		random: random,
	}
}

export function fetchEnd(random) {
	return {
		type: FETCH_END,
		random: random,
	}
}

export function requestFail(error) {
	return {
		type: REQUEST_FAIL,
		error,
		createdAt: Date.now(),
	}
}
