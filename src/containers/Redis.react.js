import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadRedis as loadRedisFromAction } from '../actions/action'
import RedisList from '../components/RedisList.react'

class Redis extends Component {
	componentDidMount() {
		this.props.loadRedis()
	}

	onRemote() {
		this.props.loadRedis()
	}

	render() {
		console.log('redis render ....', this.props)
		const { items } = this.props

		return (
			<RedisList items={items} onRemote={()=>this.onRemote()}/>
		)
	}
}

Redis.propTypes = {
	loadRedis: PropTypes.any,
	isFetching: PropTypes.bool,
	items: PropTypes.any,
}

function mapStateToProps(state) {
	return {
		items: state.redis.items,
	}
}

export default connect(mapStateToProps, {
	loadRedis: loadRedisFromAction,
})(Redis)
