import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import state from '../../state';
import Axios from 'axios';

export default class Major extends Component {
	emitDelete() {
		return (e) => {
			e.preventDefault();
			const schools = state.get('schools') || [];
			const school = schools.find(
				(school) => school.id === this.props.SchoolId
			);

			const degree = school.Degrees.find(
				(degree) => degree.id === this.props.DegreeId
			);

			const course = degree.Courses.find(
				(course) => course.id === this.props.major.CourseId
			);

			const major = course.Majors.find(
				(major) => major.id === this.props.major.id
			);
			const $ = window.$;
			$(`#deleteMajorModal${major.id}`).modal('hide');
			$(`#deleteMajorModal${major.id}`).on('hidden.bs.modal', () => {
				Axios.delete(`/majors/${major.id}`)
					.then(() => {
						course.Majors.splice(course.Majors.indexOf(major), 1);

						degree.Courses.splice(
							degree.Courses.indexOf(course),
							1
						);

						school.Degrees.splice(
							school.Degrees.indexOf(degree),
							1,
							degree
						);

						schools.splice(schools.indexOf(school), 1, school);
						state.set('schools', schools);
						toastr.success('Major deleted successfully.');
					})
					.catch((error) => {
						console.log(error);
						toastr.error('Unable to delete major.');
					});
			});
		};
	}

	render() {
		const { CourseId, title, description, id } = this.props.major;
		const { SchoolId, DegreeId } = this.props;
		const school = state
			.get('schools')
			.find((school) => school.id === SchoolId);
		const user = state.has('user') ? state.get('users') : null;
		return (
			<div className='mt-1 mb-2 p-3 shadow-sm rounded border'>
				<h6 className='mb-0 d-flex'>
					{title}
					<div className='d-flex mb-2 align-self-center ml-auto'>
						{user &&
						(user.type === 'Admin' || school.UserId === user.id) ? (
							<Link
								to={`/schools/${SchoolId}/degrees/${DegreeId}/courses/${CourseId}/majors/${id}/edit`}
								className='btn btn-sm btn-icon btn-warning rounded-circle mx-1 align-self-center'
								style={{ height: '28px', width: '28px' }}
							>
								<i className='fas fa-edit'></i>
							</Link>
						) : null}
						{user &&
						(user.type === 'Admin' || school.UserId === user.id) ? (
							<a
								style={{ height: '28px', width: '28px' }}
								href={`/schools/${SchoolId}/degrees/${DegreeId}/courses/${CourseId}/majors/${id}/dete`}
								type='button'
								className='btn btn-sm btn-icon btn-danger rounded-circle mx-1 align-self-center'
								data-toggle='modal'
								data-target={`#deleteMajorModal${id}`}
							>
								<i className='fas fa-trash my-0 mx-0'></i>
							</a>
						) : null}
						{user &&
						(user.type === 'Admin' || school.UserID === user.id) ? (
							<div
								className='modal fade'
								id={`deleteMajorModal${id}`}
								tabIndex='-1'
								role='dialog'
								aria-labelledby={`deleteMajorModalLabel${id}`}
								aria-hidden='true'
							>
								<div
									className='modal-dialog modal-dialog-centered modal-lg'
									role='document'
								>
									<div className='modal-content'>
										<div className='modal-header'>
											<h5
												className='modal-title'
												id={`deleteMajorModalLabel${id}`}
											>
												Delete {title}
											</h5>
											<button
												type='button'
												className='close'
												data-dismiss='modal'
												aria-label='Close'
											>
												<span aria-hidden='true'>
													&times;
												</span>
											</button>
										</div>
										<div
											className='modal-body'
											style={{ fontSize: '16px' }}
										>
											Are you sure you want to delete{' '}
											{title}?
										</div>
										<div className='modal-footer'>
											<button
												type='button'
												className='btn btn-danger btn-sm'
												onClick={this.emitDelete()}
											>
												Confirm
											</button>
											<button
												type='button'
												className='btn btn-secondary btn-sm'
												data-dismiss='modal'
											>
												Close
											</button>
										</div>
									</div>
								</div>
							</div>
						) : null}
					</div>
				</h6>
				<small>{description}</small>
			</div>
		);
	}
}
