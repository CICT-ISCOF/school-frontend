import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import state from '../../state';
import Axios from 'axios';
import toastr from 'toastr';

export default class Degree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: state.get('user'),
			logged: state.has('user'),
		};
	}

	emitDelete() {
		const id = this.props.degree.id;
		const schools = state.get('schools') || [];
		const parent = schools.find(
			(school) => school.id === this.props.degree.SchoolId
		);
		return (e) => {
			e.preventDefault();
			const $ = window.$;
			$(`#deleteDegreeModal${id}`).modal('hide');
			$(`#deleteDegreeModal${id}`).on('hidden.bs.modal', () => {
				Axios.delete(`/degrees/${id}`)
					.then(() => {
						const degree = parent.Degrees.find(
							(degree) => degree.id === id
						);
						parent.Degrees.splice(
							parent.Degrees.indexOf(degree),
							1
						);
						schools.splice(schools.indexOf(parent), 1, parent);
						state.set('schools', schools);
						toastr.success('Degree deleted successfully.');
					})
					.catch((error) => {
						console.log(error);
						toastr.error('Unable to delete degree.');
					});
			});
		};
	}

	render() {
		const {
			name,
			type,
			description,
			Courses,
			SchoolId,
			id,
		} = this.props.degree;
		const OwnerId = this.props.OwnerId;
		return (
			<div className="col-sm-12 col-md-6 p-2">
				<div className="bg-white rounded shadow p-3">
					<h4 className="d-flex">
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
									style={{ height: '28px', width: '28px' }}
								>
									<i className="fas fa-edit"></i>
								</Link>
								<a
									href={`/schools/${SchoolId}/degrees/${id}/delete`}
									style={{ height: '28px', width: '28px' }}
									type="button"
									className="btn btn-sm btn-icon btn-danger rounded-circle mx-1 align-self-center"
									data-toggle="modal"
									data-target={`#deleteDegreeModal${id}`}
								>
									<i className="fas fa-trash my-0 mx-0"></i>
								</a>
								<div
									className="modal fade"
									id={`deleteDegreeModal${id}`}
									tabIndex="-1"
									role="dialog"
									aria-labelledby={`deleteDegreeModalLabel${id}`}
									aria-hidden="true"
								>
									<div
										className="modal-dialog modal-dialog-centered modal-lg"
										role="document"
									>
										<div className="modal-content">
											<div className="modal-header">
												<h5
													className="modal-title"
													id={`deleteDegreeModalLabel${id}`}
												>
													Delete {type}
												</h5>
												<button
													type="button"
													className="close"
													data-dismiss="modal"
													aria-label="Close"
												>
													<span aria-hidden="true">
														&times;
													</span>
												</button>
											</div>
											<div
												className="modal-body"
												style={{ fontSize: '16px' }}
											>
												Are you sure you want to delete{' '}
												{type}?
											</div>
											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-danger btn-sm"
													onClick={this.emitDelete()}
												>
													Confirm
												</button>
												<button
													type="button"
													className="btn btn-secondary btn-sm"
													data-dismiss="modal"
												>
													Close
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : null}
					</h4>
					<h6>{type}</h6>
					<p>{description}</p>
					<p>Courses: {Courses.length}</p>
				</div>
			</div>
		);
	}
}
