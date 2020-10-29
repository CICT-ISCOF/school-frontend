import React, { Component } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import state from '../../state';
import toastr from 'toastr';
import Education from './education';
import Course from './course';
import Degree from './degree';
import Profile from './profile';
import Header from './header';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Show extends Component {
	key = -1;
	modeKey = -1;

	constructor(props) {
		super(props);
		const {
			match: { params },
		} = this.props;

		const id = Number(params.id);

		const schools = state.get('schools') || [];
		const target = schools.find((school) => school.id === id);
		if (!target) {
			this.props.history.goBack();
			return;
		}

		let courseCount = 0;
		target.Degrees.forEach((degree) =>
			degree.Courses.forEach(() => courseCount++)
		);

		this.state = {
			id,
			user: state.get('user'),
			logged: state.has('user'),
			mode: state.has(`school-show-mode-${id}`)
				? state.get(`school-show-mode-${id}`)
				: 'profile',
			target,
			degrees: target.Degrees.length,
			courses: courseCount,
			nonHE: target.Education.length,
		};
	}

	componentDidMount() {
		const id = this.state.target.id;
		this.key = state.listen('schools', (schools) => {
			const target = schools.find((school) => school.id === id);
			if (!target) {
				this.props.history.goBack();
				return;
			}
			let courseCount = 0;
			target.Degrees.forEach((degree) =>
				degree.Courses.forEach(() => courseCount++)
			);
			this.setState({
				target,
				degrees: target.Degrees.length,
				courses: courseCount,
				nonHE: target.Education.length,
				user: state.get('user'),
				logged: state.has('user'),
			});
		});

		this.modeKey = state.listen(
			`school-show-mode-${this.state.id}`,
			(mode) => {
				switch (mode) {
					case 'degrees':
						if (
							this.state.degrees === 0 &&
							this.state.nonHE === 0
						) {
							return toastr.info(
								'This school does not have any degrees and Non-HE.'
							);
						}
						this.setState({ mode: 'degrees' });
						break;
					case 'courses':
						if (
							this.state.courses === 0 &&
							this.state.nonHE === 0
						) {
							return toastr.info(
								'This school does not have any courses and Non-HE.'
							);
						}
						this.setState({ mode: 'courses' });
						break;
					default:
						this.setState({ mode: 'profile' });
						break;
				}
			}
		);
	}

	componentWillUnmount() {
		state
			.removeListener('schools', this.key)
			.removeListener(`school-show-mode-${this.state.id}`, this.modeKey);
	}

	show(mode) {
		state.set(`school-show-mode-${this.state.id}`, mode);
	}

	deleteHandler() {
		const $ = window.$;
		const modal = $('#deleteSchoolModal');
		modal.modal('hide');
		modal.on('hidden.bs.modal', () => {
			Axios.delete(`/schools/${this.state.target.id}`)
				.then(() => {
					const schools = state.get('schools') || [];
					const school = schools.find(
						(school) => school.id === this.state.target.id
					);
					if (school) {
						const index = schools.indexOf(school);
						schools.splice(index, 1);
					}
					toastr.success('School deleted successfully.');
					this.props.history.goBack();
				})
				.catch((error) => {
					console.log(error);
					toastr.error('Unable to delete school.');
				});
		});
	}

	educationHandler() {
		return (id) => {
			const education = this.state.target.Education.find(
				(e) => e.id === id
			);
			const schools = state.get('schools') || [];
			const school = schools.find(
				(school) => school.id === this.state.target.id
			);
			Axios.delete(`/education/${education.id}`)
				.then(() => {
					school.Education.splice(
						school.Education.indexOf(education),
						1
					);
					const target = this.state.target;
					target.Education.splice(
						target.Education.indexOf(education),
						1
					);
					this.setState({ target });
					schools.splice(schools.indexOf(school), 1, school);
					state.set('schools', schools);
					toastr.success('Non-HE deleted successfully.');
				})
				.catch((error) => {
					console.log(error);
					toastr.error('Unable to delete Non-HE');
				});
		};
	}

	render() {
		return (
			<div className="profile-page">
				<Navbar transparent={false} />
				<div className="wrapper">
					<section className="section-profile-cover section-shaped my-0">
						<img
							className="bg-image"
							src={this.state.target.CoverPhoto.uri}
							style={{ width: '100%' }}
							alt={this.state.target.name + ' Cover'}
						/>
						<div className="separator separator-bottom separator-skew">
							<svg
								x="0"
								y="0"
								viewBox="0 0 2560 100"
								preserveAspectRatio="none"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<polygon
									className="fill-secondary"
									points="2560 0 2560 100 0 100"
								></polygon>
							</svg>
						</div>
					</section>
					<section className="section bg-secondary">
						<div className="container">
							<div className="card card-profile shadow mt--300">
								<div className="px-4">
									<Header
										header={{
											target: this.state.target,
											show: this.show.bind(this),
											degrees: this.state.degrees,
											courses: this.state.courses,
											nonHE: this.state.nonHE,
										}}
									/>
									{this.state.logged &&
									(this.state.user.type === 'Admin' ||
										Number(this.state.user.id) ===
											Number(
												this.state.target.UserId
											)) ? (
										<div>
											<div className="text-center mt-5 mb-2">
												<Link
													className="btn btn-sm btn-warning text-right"
													to={`/schools/${this.state.target.id}/edit`}
												>
													Edit School
												</Link>
												<button
													type="button"
													className="btn btn-danger btn-sm text-left"
													data-toggle="modal"
													data-target="#deleteSchoolModal"
												>
													Delete School
												</button>
												<div
													className="modal fade"
													id="deleteSchoolModal"
													tabIndex="-1"
													role="dialog"
													aria-labelledby="deleteSchoolModaltitle"
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
																	id="deleteSchoolModaltitle"
																>
																	Delete{' '}
																	{
																		this
																			.state
																			.target
																			.name
																	}
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
															<div className="modal-body">
																Are you sure you
																want to delete{' '}
																{
																	this.state
																		.target
																		.name
																}
																?
															</div>
															<div className="modal-footer">
																<button
																	type="button"
																	className="btn btn-danger btn-sm"
																	onClick={(
																		e
																	) => {
																		this.deleteHandler();
																	}}
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
											<div className="text-center mb-2">
												<Link
													className="btn btn-sm btn-info text-right"
													to={`/schools/${this.state.target.id}/degrees/add`}
												>
													Add Degree
												</Link>
												<Link
													className="btn btn-sm btn-success text-left"
													to={`/schools/${this.state.target.id}/non-he/add`}
												>
													Add Non-HE
												</Link>
											</div>
										</div>
									) : null}
									{this.state.mode === 'profile' ? (
										<Profile profile={this.state.target} />
									) : null}
									{this.state.mode === 'degrees' ? (
										<div className="row mb-4 mt-5">
											{this.state.target.Degrees.map(
												(degree, index) => (
													<Degree
														key={index}
														degree={degree}
														OwnerId={
															this.state.target
																.UserId
														}
														SchoolId={
															this.state.target.id
														}
														history={
															this.props.history
														}
													/>
												)
											)}
										</div>
									) : null}
									{this.state.mode === 'courses' ? (
										<div className="row mb-2 mt-5">
											{this.state.target.Degrees.map(
												(degree) =>
													degree.Courses.map(
														(course, index) => (
															<Course
																key={index}
																course={course}
																school={
																	this.state
																		.target
																}
															/>
														)
													)
											)}
										</div>
									) : null}

									{this.state.mode === 'courses' ? (
										<div className="mb-4">
											<hr />
											<h4>Non-HE Offers</h4>
											<div className="row">
												{this.state.target.Education.map(
													(
														{
															type,
															tuition,
															date_of_examination,
															description,
															id,
															SchoolId,
														},
														index
													) => (
														<Education
															key={index}
															type={type}
															tuition={tuition}
															date={
																date_of_examination
															}
															description={
																description
															}
															id={id}
															SchoolId={SchoolId}
															UserId={
																this.state
																	.target
																	.UserId
															}
															emitDelete={this.educationHandler()}
														/>
													)
												)}
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</section>
				</div>
				<Footer />
			</div>
		);
	}
}
