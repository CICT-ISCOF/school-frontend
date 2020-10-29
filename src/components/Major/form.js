import React, { Component } from 'react';
import toastr from 'toastr';
import Axios from 'axios';
import state from '../../state';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Magic from '../Backgrounds/magic';

export default class Form extends Component {
	url = '/majors';

	constructor(props) {
		super(props);
		const fragments = window.location.pathname.split('/');

		const {
			match: { params },
		} = this.props;

		const id = Number(params.id);

		const schools = state.get('schools') || [];
		const school = schools.find((school) => school.id === id);

		if (!school) {
			this.props.history.goBack();
			return;
		}

		const degreeId = Number(params.degreeId);

		const degree = school.Degrees.find((degree) => degree.id === degreeId);

		if (!degree) {
			this.props.history.goBack();
			return;
		}

		const courseId = Number(params.courseId);

		const course = degree.Courses.find((course) => course.id === courseId);

		if (!course) {
			this.props.history.goBack();
			return;
		}

		this.state = {
			processing: false,
			school,
			degree,
			course,
			CourseId: course.id,
			mode: 'Add',
			title: '',
			description: '',
		};

		if (fragments.includes('edit')) {
			const majorId = Number(params.majorId);

			const target = course.Majors.find((major) => major.id === majorId);

			if (!target) {
				this.props.history.goBack();
				return;
			}

			this.state = {
				processing: false,
				school,
				degree,
				course,
				CourseId: course.id,
				mode: 'Edit',
				...target,
			};
		}
	}

	set(key, e) {
		this.setState({ [key]: e.target.value });
	}

	componentDidMount() {
		if (!state.has('user') && !state.has('token')) {
			state.clear();
			this.props.history.push('/login');
			return;
		}
	}

	handleSubmit() {
		return (e) => {
			e.preventDefault();
			this.setState({ processing: true });
			this.request(this.state)
				.then((response) => response.data)
				.then((major) => {
					const schools = state.get('schools') || [];
					const school = schools.find(
						(school) => school.id === this.state.school.id
					);

					const degree = school.Degrees.find(
						(degree) => degree.id === this.state.degree.id
					);

					const course = degree.Courses.find(
						(course) => course.id === this.state.course.id
					);

					if (this.state.mode === 'Add') {
						course.Majors.push(major);
					} else {
						const existing = course.Majors.find(
							(item) => item.id === major.id
						);
						course.Majors.splice(
							course.Majors.indexOf(existing),
							1,
							major
						);
					}

					degree.Courses.splice(
						degree.Courses.indexOf(course),
						1,
						course
					);

					school.Degrees.splice(
						school.Degrees.indexOf(degree),
						1,
						degree
					);

					schools.splice(schools.indexOf(school), 1, school);

					state.set('schools', schools);

					toastr.success('Major saved successfully.');
				})
				.catch((error) => {
					if (error.response && error.response.status === 422) {
						error.response.data.errors.forEach((error) => {
							toastr.error(error.msg, error.param);
						});
						return;
					}
					console.log(error);
					toastr.error('Unable to save major.');
				})
				.finally(() => this.setState({ processing: false }));
		};
	}

	request({ title, description, CourseId, id }) {
		return this.state.mode === 'Add'
			? Axios.post(this.url, { title, description, CourseId })
			: Axios.put(`${this.url}/${id}`, {
					title,
					description,
					CourseId,
			  });
	}

	render() {
		return (
			<div className="landing-page">
				<Navbar transparent={false} />
				<div className="section section-hero section-shaped pt-3">
					<Magic />
					<div className="page-header">
						<div className="container shape-container d-flex align-items-center py-lg">
							<div className="col px-0">
								<div className="row align-items-center justify-content-center">
									<div className="col-sm-12">
										<div className="rounded bg-white w-100 h-100 shadow">
											<div className="container pt-3 px-5">
												<h5>
													{this.state.mode} Major for{' '}
													{this.state.course.title}
												</h5>
												<h5>
													in {this.state.school.name}
												</h5>
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
