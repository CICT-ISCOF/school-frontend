import React, { Component } from 'react';
import Major from './major';

export default class Course extends Component {
	render() {
		const { title, tuition, description, Majors } = this.props.course;
		return (
			<div className="col-sm-12 col-md-6 p-2">
				<div className="bg-white rounded shadow p-3">
					<h3>{title}</h3>
					<h6>
						Tuition:
						{' ' + tuition}
					</h6>
					<p>{description}</p>
					<div>
						<h5>Majors:</h5>
						{Majors.map((major, index) => (
							<Major key={index} major={major} />
						))}
					</div>
				</div>
			</div>
		);
	}
}
