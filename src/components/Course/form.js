import React, { Component } from 'react';
import Axios from 'axios';
import toastr from 'toastr';
import state from '../../state';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Dark from '../Backgrounds/dark';

export default class Form extends Component {
	url = '/courses';

	constructor(props) {
		super(props);
		if (!state.has('user') && !state.has('token')) {
			state.clear();
			this.props.history.push('/login');
		}
		const fragments = window.location.pathname.split('/');

		const {
			match: { params },
		} = this.props;

		const schoolId = Number(params.id);
		const degreeId = Number(params.degreeId);

		const schools = state.get('schools') || [];
		const school = schools.find((school) => school.id === schoolId);

		if (!school) {
			this.props.history.goBack();
			return;
		}

		const degree = school.Degrees.find((degree) => degree.id === degreeId);

		if (!degree) {
			this.props.history.goBack();
			return;
		}

		this.state = {
			processing: false,
			mode: 'Add',
			school,
			degree,
			DegreeId: degree.id,
			title: '',
			tuition: '',
		};

		if (fragments.includes('edit')) {
			const courseId = Number(params.courseId);

			const target = degree.Courses.find(
				(course) => course.id === courseId
			);

			if (!target) {
				this.props.history.goBack();
				return;
			}

			this.state = {
				processing: false,
				mode: 'Edit',
				school,
				degree,
				DegreeId: degree.id,
				...target,
			};
		}
	}

	set(key, e) {
		this.setState({ [key]: e.target.value });
	}

	handleSubmit() {
		return (e) => {
			e.preventDefault();
			this.setState({ processing: true });
			this.request(this.state)
				.then((response) => response.data)
				.then((course) => {
					const schools = state.get('schools') || [];
					const school = schools.find(
						(school) => school.id === this.state.school.id
					);

					const degree = school.Degrees.find(
						(degree) => degree.id === this.state.DegreeId
					);

					if (this.state.mode === 'Add') {
						degree.Courses.push(course);
					} else {
						const existing = degree.Courses.find(
							(item) => item.id === course.id
						);

						degree.Courses.splice(
							degree.Courses.indexOf(existing),
							1,
							course
						);
					}

					school.Degrees.splice(
						school.Degrees.indexOf(degree),
						1,
						degree
					);

					schools.splice(schools.indexOf(school), 1, school);

					state.set('schools', schools);

					toastr.success('Course saved successfully.');
				})
				.catch((error) => {
					if (error.response && error.response.status === 422) {
						error.response.data.errors.forEach((error) => {
							toastr.error(error.msg, error.param);
						});
						return;
					}
					console.log(error);
					toastr.error('Unable to save course.');
				})
				.finally(() => this.setState({ processing: false }));
		};
	}

	request({ title, tuition, description, DegreeId, id }) {
		return this.state.mode === 'Add'
			? Axios.post(this.url, { title, tuition, description, DegreeId })
			: Axios.put(`${this.url}/${id}`, {
					title,
					tuition,
					description,
					DegreeId,
			  });
	}

	render() {
		return (
			<div className="landing-page">
				<Navbar transparent={false} />
				<div className="section section-hero section-shaped pt-3">
					<Dark />
					<div className="page-header">
						<div className="container shape-container d-flex align-items-center py-lg">
							<div className="col px-0">
								<div className="row align-items-center justify-content-center">
									<div className="col-sm-12">
										<div className="rounded bg-white w-100 h-100 shadow">
											<div className="container pt-3 px-5">
												<h2>
													{this.state.mode} Course for{' '}
													{this.state.degree.type}
												</h2>
												<h2>
													in {this.state.school.name}
												</h2>
												<button
													className="btn btn-sm btn-warning"
													onClick={(e) => {
														e.preventDefault();
														this.props.history.goBack();
													}}
												>
													Back
												</button>
												<form
													onSubmit={this.handleSubmit()}
												>
													<div className="row">
														<div className="col-sm-12 col-md-6 offset-md-3">
															<div className="form-group">
																<label htmlFor="title">
																	Title:
																</label>
																<input
																	id="title"
																	type="text"
																	name="title"
																	placeholder="Title"
																	className={`form-control form-control-alternative ${
																		this
																			.state
																			.processing
																			? 'disabled'
																			: ''
																	}`}
																	disabled={
																		this
																			.state
																			.processing
																	}
																	onChange={(
																		e
																	) =>
																		this.set(
																			'title',
																			e
																		)
																	}
																	value={
																		this
																			.state
																			.title
																	}
																/>
															</div>
														</div>
														<div className="col-sm-12 col-md-6 offset-md-3">
															<div className="form-group">
																<label htmlFor="tuition">
																	Tuition:
																</label>
																<input
																	id="tuition"
																	type="text"
																	name="tuition"
																	placeholder="Tuition"
																	className={`form-control form-control-alternative ${
																		this
																			.state
																			.processing
																			? 'disabled'
																			: ''
																	}`}
																	disabled={
																		this
																			.state
																			.processing
																	}
																	onChange={(
																		e
																	) =>
																		this.set(
																			'tuition',
																			e
																		)
																	}
																	value={
																		this
																			.state
																			.tuition
																	}
																/>
															</div>
														</div>
														<div className="col-sm-12 col-md-6 offset-md-3">
															<div className="form-group">
																<label htmlFor="description">
																	Description:
																</label>
																<textarea
																	id="description"
																	name="description"
																	placeholder="Description"
																	className={`form-control form-control-alternative ${
																		this
																			.state
																			.processing
																			? 'disabled'
																			: ''
																	}`}
																	disabled={
																		this
																			.state
																			.processing
																	}
																	onChange={(
																		e
																	) =>
																		this.set(
																			'description',
																			e
																		)
																	}
																	value={
																		this
																			.state
																			.description
																	}
																></textarea>
															</div>
														</div>
														<div className="col-sm-12 col-md-6 offset-md-3 mb-5">
															<button
																type="submit"
																className={`btn btn-default btn-sm mt-2 mb-4 ${
																	this.state
																		.processing
																		? 'disabled'
																		: ''
																}`}
																disabled={
																	this.state
																		.processing
																}
															>
																{this.state
																	.processing ? (
																	<i className="fas fa-circle-notch fa-spin"></i>
																) : (
																	'Save'
																)}
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
