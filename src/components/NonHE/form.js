import React, { Component } from 'react';
import toastr from 'toastr';
import Axios from 'axios';
import state from '../../state';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Magic from '../Backgrounds/magic';
import dayjs from 'dayjs';

export default class Form extends Component {
	url = '/education';

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

		this.state = {
			mode: 'Add',
			processing: false,
			parent: school,
			SchoolId: school.id,
			type: 'Preschool',
			tuition: '',
			date_of_examination: '',
			description: '',
		};

		if (fragments.includes('edit')) {
			const nonHEId = Number(params.nonHEId);

			const target = school.Education.find((item) => item.id === nonHEId);

			if (!target) {
				this.props.history.goBack();
				return;
			}

			this.state = {
				processing: false,
				parent: school,
				SchoolId: school.id,
				mode: 'Edit',
				...target,
				date_of_examination: target.date_of_examination
					? dayjs(target.date_of_examination).format(
							'YYYY-MM-DD[T]HH:mm'
					  )
					: null,
			};
		}
	}

	set(key, e) {
		this.setState({ [key]: e.target.value });
	}

	handleSubmit() {
		return (e) => {
			this.setState({ processing: true });
			e.preventDefault();
			this.request(this.state)
				.then((response) => response.data)
				.then((education) => {
					const schools = state.get('schools') || [];
					const parent = schools.find(
						(school) =>
							Number(school.id) === Number(this.state.parent.id)
					);

					if (this.state.mode === 'Add') {
						parent.Education.push(education);
					} else {
						const existing = parent.Education.find(
							(item) => item.id === education.id
						);
						parent.Education.splice(
							parent.Education.indexOf(existing),
							1,
							education
						);
					}

					schools.splice(schools.indexOf(parent), 1, parent);

					state.set('schools', schools);

					toastr.success('Non-HE saved successfully.');
				})
				.catch((error) => {
					if (error.response && error.response.status === 422) {
						error.response.data.errors.forEach((error) => {
							toastr.error(error.msg, error.param);
						});
						return;
					}
					console.log(error);
					toastr.error('Unable to save degree.');
				})
				.finally(() => this.setState({ processing: false }));
		};
	}

	request({ type, tuition, date_of_examination, description, SchoolId }) {
		const data = {
			type,
			tuition,
			description,
			SchoolId,
		};

		if (date_of_examination.length > 0) {
			data.date_of_examination = date_of_examination;
		}
		return this.state.mode === 'Add'
			? Axios.post(this.url, data)
			: Axios.put(`${this.url}/${this.state.id}`, data);
	}

	componentDidMount() {
		if (!state.has('user') && !state.has('token')) {
			state.clear();
			this.props.history.push('/login');
			return;
		}
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
												<h2>
													{this.state.mode} Non-HE for{' '}
													{this.state.parent.name}
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
																<label htmlFor="type">
																	Type:
																</label>
																<select
																	id="type"
																	name="type"
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
																			'type',
																			e
																		)
																	}
																	value={
																		this
																			.state
																			.type
																	}
																>
																	<option value="Preschool">
																		Preschool
																	</option>
																	<option value="Elementary">
																		Elementary
																	</option>
																	<option value="Secondary">
																		Secondary
																	</option>
																	<option value="SHS">
																		SHS
																	</option>
																</select>
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
																<label htmlFor="date_of_examination">
																	Date of
																	Examination:
																</label>
																<input
																	type="datetime-local"
																	id="date_of_examination"
																	name="date_of_examination"
																	placeholder="Date of Examination"
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
																			'date_of_examination',
																			e
																		)
																	}
																	value={
																		this
																			.state
																			.date_of_examination ||
																		''
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
