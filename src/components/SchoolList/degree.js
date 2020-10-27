import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import state from '../../state';

export default class Degree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: state.get('user'),
			logged: state.has('user'),
		};
	}
	render() {
		const {
			name,
			type,
			description,
			Courses,
			OwnerId,
			SchoolId,
			id,
		} = this.props.degree;
		return (
			<div className="col-sm-12 col-md-6 p-2">
				<div className="bg-white rounded shadow p-3">
					<h3 className="d-flex">
						{name}{' '}
						{this.state.logged &&
						(this.state.user.type === 'Admin' ||
							this.state.user.id === OwnerId) ? (
							<div className="d-flex ml-auto">
								<Link
									to={`/schools/${SchoolId}/degrees/${id}/courses/add`}
									className="btn btn-sm btn-primary mx-1 align-self-center"
								>
									Add Course
								</Link>
								<Link
									to={`/schools/${SchoolId}/degrees/${id}/edit`}
									className="btn btn-sm btn-icon btn-warning rounded-circle mx-1 align-self-center"
									style={{ height: '30px', width: '30px' }}
								>
									<i className="fas fa-edit"></i>
								</Link>
							</div>
						) : null}
					</h3>
					<h6>{type}</h6>
					<p>{description}</p>
					<p>Courses: {Courses.length}</p>
				</div>
			</div>
		);
	}
}
