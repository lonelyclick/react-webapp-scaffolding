import ajax from '../utils/ajax'
import { fetchStart, fetchEnd, requestFail } from '../actions/common'

export const CALL_API = Symbol('Call API')

function parseResponse(res, dataType = 'json', random = Math.random()) {
	let payload
	store.dispatch(fetchEnd(random))
	if (res.status === 200) {
		try {
			if (dataType === 'json') {
				payload = res.json()
			}
		} catch (err) {
			throw new Error(`Parse ${dataType.toUpperCase()} Error`)
		}
	} else {
		throw new Error(`HTTP ERROR : ${res.status} - ${res.statusText}`)
	}
	return payload
}

export default store => next => action => {
	const callAPI = action[CALL_API]

	if (typeof callAPI === 'undefined') {
		return next(action)
	}

	let { endpoint, fetchOption } = callAPI
	const { schema, types } = callAPI

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState())
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.')
	}

	const fetchOptionType = typeof fetchOption

	if (fetchOptionType !== 'undefined' && fetchOptionType !== 'object') {
		throw new Error('Specify a object fetchOption')
	}

	//if (!schema) {
	//	throw new Error('Specify one of the exported Schemas.')
	//}
	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types.')
	}
	if (!types.every(type => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.')
	}

	fetchOption = fetchOption || {}
	// fetchOption.schema = schema

	function actionWith(data) {
		const finalAction = Object.assign({}, action, data)
		delete finalAction[CALL_API]
		return finalAction
	}

	const [requestType, successType, failureType] = types
	const random = Math.random()

	next(actionWith(fetchStart(random)))

	return fetch(endpoint, fetchOption)
		.then((res) => {
			fetchOption.dataType = fetchOption.dataType || 'json'
			let payload

			if (res.status === 200) {
				try {
					if (fetchOption.dataType === 'json') {
						payload = res.json()
					}
				} catch (err) {
					throw new Error(`Parse ${fetchOption.dataType.toUpperCase()} Error`)
				}
			} else {
				throw new Error(`HTTP ERROR : ${res.status} - ${res.statusText}`)
			}
			return payload
		})
		.then(response=> {
			next(actionWith(fetchEnd(random)))
			next(actionWith({
				response,
				type: successType,
			}))
		})
		.catch(error=> {
			next(actionWith(fetchEnd(random)))
			next(actionWith(requestFail(error)))
		})
}