import store from '../stores/store'
import { fetchStart, fetchEnd, requestFail } from '../actions/common'

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

function fetchAspect(request, option = {}, handle = ()=> {}) {
	const promise = fetch(request, option)
	const random = Math.random()
	store.dispatch(fetchStart(random))

	promise.then((res) => parseResponse(res, option.dataType, random))
	return promise
}

export default { fetch: fetchAspect }
