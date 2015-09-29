import React, { Component, PropTypes } from 'react'

import '../static/sass/loadingbar.scss'

class Loadingbar extends Component {
	componentDidUpdate() {
		const { random, show } = this.props.loading

		if (!random) {
			this.hideLoading()
			return
		}

		this.randomCt = this.randomCt || new Set()
		const exist = this.randomCt.has(random)
		if (show) {
			if (!exist) {
				this.randomCt.add(random)
				this.showLoading()
			}
		} else {
			if (exist) {
				this.randomCt.delete(random)
			}

			if (this.randomCt.size === 0) {
				this.hideLoading()
			}
		}
	}

	getStat() {
		this.stat = this.stat || 0
		let rnd = 0

		if (this.stat >= 0 && this.stat < 0.25) {
			rnd = (Math.random() * (5 - 3 + 1) + 3) / 100
		} else if (this.stat >= 0.25 && this.stat < 0.65) {
			rnd = (Math.random() * 3) / 100
		} else if (this.stat >= 0.65 && this.stat < 0.9) {
			rnd = (Math.random() * 2) / 100
		} else if (this.stat >= 0.9 && this.stat < 0.99) {
			rnd = 0.005
		} else {
			rnd = 0
		}

		this.stat += rnd
		return this.stat
	}

	applyNodeStyle(domNode, styleObject) {
		let node = this.refs[domNode]

		if (!node) {
			return this
		}

		node = node.getDOMNode()

		for (const key in styleObject) {
			if (styleObject.hasOwnProperty(key)) {
				node.style[key] = styleObject[key]
			}
		}

		return this
	}

	showLoading() {
		this.applyNodeStyle('bar', {display: 'block'})
		this.applyNodeStyle('bar', {width: this.getStat() * 100 + '%'})
		this.applyNodeStyle('spinner', {display: 'block'})
	}

	hideLoading() {
		this.applyNodeStyle('bar', {width: '100%'})
		this.stat = 0

		setTimeout(function delayHide() {
			this.applyNodeStyle('bar', {
				display: 'none',
				width: '0%',
			})

			this.applyNodeStyle('spinner', {
				display: 'none',
			})
		}.bind(this), 500)
	}

	render() {
		return (
			<div>
				<div className="loading-bar">
					<div className="bar" ref="bar" style={{ background: this.props.color }}>
						<div className="peg"></div>
					</div>
				</div>
				<div className="loading-bar-spinner" ref="spinner">
					<div className="spinner-icon"
					     style={{borderTopColor: this.props.color, borderLeftColor: this.props.color}}></div>
				</div>
			</div>
		)
	}
}


Loadingbar.propTypes = {
	loading: PropTypes.any,
	color: PropTypes.string,
}

export default Loadingbar
