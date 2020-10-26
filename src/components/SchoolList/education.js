import React, { Component } from 'react';

export default class Education extends Component {
	render() {
		const { type, tuition, date, description } = this.props;
		return (
			<div className="col-sm-12 col-md-6 p-2">
				<div className="bg-white p-3 rounded shadow">
					<h4>Type: {type}</h4>
					<h6>Tuition: {tuition}</h6>
					<p>Date of Examination: {date ? date : 'N/A'}</p>
					<p>{description}</p>
				</div>
			</div>
		);
	}
}
