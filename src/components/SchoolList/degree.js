import React, { Component } from 'react';

export default class Degree extends Component {
	render() {
		const { name, type, description, Courses } = this.props.degree;
		return (
			<div className="col-sm-12 col-md-6 p-2">
				<div className="bg-white rounded shadow p-3">
					<h3>{name}</h3>
					<h6>{type}</h6>
					<p>{description}</p>
					<p>Courses: {Courses.length}</p>
				</div>
			</div>
		);
	}
}
