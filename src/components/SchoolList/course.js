import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Major from './major';
import Axios from 'axios';
import state from '../../state';
import toastr from 'toastr';

export default class Course extends Component {
	emitDelete() {
		const id = this.props.course.id;
		const schools = state.get('schools') || [];
		const school = schools.find(
			(school) => school.id === this.props.school.id
		);

		const parent = school.Degrees.find(
			(degree) => degree.id === this.props.course.DegreeId
		);

		return (e) => {
			e.preventDefault();
			const $ = window.$;
			$(`#deleteCourseModal${id}`).modal('hide');
			$(`#deleteCourseModal${id}`).on('hidden.bs.modal', () => {
				Axios.delete(`/courses/${id}`)
					.then(() => {
						const course = parent.Courses.find(
							(course) => course.id === id
						);

						parent.Courses.splice(
							parent.Courses.indexOf(course),
							1
						);

						school.Degrees.splice(
							school.Degrees.indexOf(parent),
							1,
							parent
						);

						schools.splice(schools.indexOf(school), 1, school);
						state.set('schools', schools);
						toastr.success('Major deleted successfully.');
					})
					.catch((error) => {
						console.log(error);
						toastr.error('Unable to delete course.');
					});
			});
		};
	}

	render() {
		const {
			title,
			tuition,
			description,
			Majors,
			DegreeId,
			id,
		} = this.props.course;

		const school = this.props.school;
		const user = state.has('user') ? state.get('users') : null;

		return (
			<div className='col-sm-12 col-md-6 p-2'>
				<div className='bg-white rounded shadow p-3'>
					<h4>{title}</h4>
					<div className='d-flex mb-2'>
						{user &&
						(user.type === 'Admin' || school.UserId === user.id) ? (
							<Link
								to={`/schools/${school.id}/degrees/${DegreeId}/courses/${id}/majors/add`}
								className='btn btn-sm btn-primary mx-1 align-self-center'
							>
								Add Major
							</Link>
						) : null}
						{user &&
						(user.type === 'Admin' || school.UserId === user.id) ? (
							<Link
								to={`/schools/${school.id}/degrees/${DegreeId}/courses/${id}/edit`}
								className='btn btn-sm btn-icon btn-warning rounded-circle mx-1 align-self-center'
								style={{ height: '30px', width: '30px' }}
							>
								<i className='fas fa-edit'></i>
							</Link>
						) : null}
						{user &&
						(user.type === 'Admin' || school.UserId === user.id) ? (
							<a
								style={{ height: '30px', width: '30px' }}
								href={`/schools/${school.id}/degrees/${DegreeId}/courses/${id}/delete`}
								type='button'
								className='btn btn-sm btn-icon btn-danger rounded-circle mx-1 align-self-center'
								data-toggle='modal'
								data-target={`#deleteCourseModal${id}`}
							>
								<i className='fas fa-trash my-0 mx-0'></i>
							</a>
						) : null}
						{user &&
						(user.type === 'Admin' || school.UserID === user.id) ? (
							<div
								className='modal fade'
								id={`deleteCourseModal${id}`}
								tabIndex='-1'
								role='dialog'
								aria-labelledby={`deleteCourseModalLabel${id}`}
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
												id={`deleteCourseModalLabel${id}`}
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
					<h6>
						Tuition:
						{' ' + tuition}
					</h6>
					<p>{description}</p>
					<div>
						<h5>Majors: {Majors.length > 0 ? null : 'N/A'}</h5>
						{Majors.map((major, index) => (
							<Major
								key={index}
								major={major}
								SchoolId={school.id}
								DegreeId={DegreeId}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}
