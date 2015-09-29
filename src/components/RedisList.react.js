import React, { Component, PropTypes } from 'react'
import { Table } from 'react-bootstrap'

import Tool from './Tool.react'

class RedisList extends Component {
	render() {
		const { items, onRemote } = this.props
		let table = <div></div>

		if (items) {
			const ret = []
			for (const o in items) {
				if (items.hasOwnProperty(o)) {
					ret.push(
						<tr key={o}>
							<td>111</td>
							<td>{o}</td>
							<td>{items[o].name}</td>
							<td>{items[o].age}</td>
						</tr>
					)
				}
			}

			table = (
				<div>
					<Table striped bordered condensed hover>
						<thead>
						<tr>
							<th>Operator</th>
							<th>ID</th>
							<th>Name</th>
							<th>Age</th>
						</tr>
						</thead>
						<tbody>
						{ret}
						</tbody>
					</Table>
				</div>
			)
		}

		return (
			<div>
				<Tool onRemote={onRemote}/>
				{table}
			</div>
		)
	}
}

RedisList.propTypes = {
	items: PropTypes.any.isRequired,
	onRemote: PropTypes.func.isRequired,
}

export default RedisList
