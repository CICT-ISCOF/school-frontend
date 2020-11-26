import React, { Component } from 'react';
import toastr from 'toastr';
import Axios from 'axios';
import state from '../../state';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Magic from '../Backgrounds/magic';

export default class Form extends Component {
	url = '/degrees';

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

		const id = Number(params.id);

		const schools = state.get('schools') || [];
		const school = schools.find((school) => school.id === id);

		if (!school) {
			this.props.history.goBack();
			return;
		}

		this.state = {
			processing: false,
			parent: school,
			SchoolId: school.id,
			mode: 'Add',
			type: 'PhD',
			description: '',
			name: '',
		};

		if (fragments.includes('edit')) {
			const degreeId = Number(params.degreeId);

			const target = school.Degrees.find(
				(degree) => degree.id === degreeId
			);

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
				.then((degree) => {
					const schools = state.get('schools') || [];
					const parent = schools.find(
						(school) => school.id === this.state.parent.id
					);
					if (this.state.mode === 'Add') {
						parent.Degrees.push(degree);
					} else {
						const existing = parent.Degrees.find(
							(item) => item.id === degree.id
						);
						const index = parent.Degrees.indexOf(existing);
						parent.Degrees.splice(index, 1, degree);
					}

					const index = schools.indexOf(parent);

					schools.splice(index, 1, parent);

					state.set('schools', schools);

					toastr.success('Degree saved successfully.');
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

	request({ name, type, description, SchoolId, id }) {
		return this.state.mode === 'Add'
			? Axios.post(this.url, { name, type, description, SchoolId })
			: Axios.put(`${this.url}/${id}`, {
					name,
					type,
					description,
					SchoolId,
			  });
	}

	render() {
		return (
			<div className='landing-page'>
				<Navbar transparent={false} />
				<div className='section section-hero section-shaped pt-3'>
					<Magic />
					<div className='page-header'>
						<div className='container shape-container d-flex align-items-center py-lg'>
							<div className='col px-0'>
								<div className='row align-items-center justify-content-center'>
									<div className='col-sm-12'>
										<div className='rounded bg-white w-100 h-100 shadow'>
											<div className='container pt-3 px-5'>
												<h2>
													{this.state.mode} Degree for{' '}
													{this.state.parent.name}
												</h2>
												<button
													className='btn btn-sm btn-warning'
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
													<div className='row'>
														<div className='col-sm-12 col-md-6 offset-md-3'>
															<div className='form-group'>
																<label htmlFor='type'>
																	Type:
																</label>
																<select
																	id='type'
																	name='type'
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
																	<option value='PhD'>
																		PhD
																	</option>
																	<option value='Bachelor'>
																		Bachelor
																	</option>
																	<option value='Master'>
																		Master
																	</option>
																</select>
															</div>
														</div>
														<div className='col-sm-12 col-md-6 offset-md-3'>
															<div className='form-group'>
																<label htmlFor='name'>
																	Name:
																</label>
																<input
																	id='name'
																	type='text'
																	name='name'
																	placeholder='Name'
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
																			'name',
																			e
																		)
																	}
																	value={
																		this
																			.state
																			.name
																	}
																/>
															</div>
														</div>
														<div className='col-sm-12 col-md-6 offset-md-3'>
															<div className='form-group'>
																<label htmlFor='description'>
																	Description:
																</label>
																<textarea
																	id='description'
																	name='description'
																	placeholder='Description'
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
														<div className='col-sm-12 col-md-6 offset-md-3 mb-5'>
															<button
																type='submit'
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
																	<i className='fas fa-circle-notch fa-spin'></i>
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
