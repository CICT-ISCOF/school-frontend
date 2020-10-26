import React, { Component } from 'react';

export default class Major extends Component {
	render() {
		const { title, description } = this.props.major;
		return (
			<div>
				<h6>{title}</h6>
				<div>{description}</div>
			</div>
		);
	}
}
