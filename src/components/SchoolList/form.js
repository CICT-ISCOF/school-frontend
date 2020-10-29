import React, { Component, createRef } from 'react';
import './form.scss';
import Axios from 'axios';
import Navbar from '../Navbar';
import Magic from '../Backgrounds/magic';
import Footer from '../Footer';
import FormOne from './formone';
import FormTwo from './formtwo';
import FormThree from './formthree';
import FormFour from './formfour';
import FormFile from './formfile';
import state from '../../state';
import toastr from 'toastr';

export default class Form extends Component {
	profile = createRef();
	cover = createRef();
	url = '/schools';

	constructor(props) {
		super(props);
		if (!state.has('user') && !state.has('token')) {
			state.clear();
			this.props.history.push('/login');
		}
		const fragments = window.location.pathname.split('/');
		this.state = {
			processing: false,
			mode: fragments.includes('add') ? 'Add' : 'Edit',
			region: '6',
			type: 'Public',
			district: '6',
			province: 'Iloilo',
			name: '',
			address: '',
			phone: '',
			email: '',
			website: '',
			profile_picture: null,
			cover_photo: null,
			curricular_program: '',
			mission: '',
			vision: '',
			urls: {
				cover: 'https://via.placeholder.com/1000x300',
				profile: 'https://via.placeholder.com/100',
			},
		};
		if (fragments.includes('edit')) {
			const {
				match: { params },
			} = this.props;

			const id = Number(params.id);
			const schools = state.get('schools') || [];
			const target = schools.find((school) => school.id === id);
			if (!target) {
				this.props.history.push('/schools');
				return;
			}
			this.state = {
				mode: 'Edit',
				...target,
				profile_picture: null,
				cover_photo: null,
				urls: {
					cover: target.CoverPhoto.uri,
					profile: target.ProfilePicture.uri,
				},
			};
		}
	}

	handle(key) {
		return (e) => {
			e.preventDefault();
			this.setState({ [key]: e.target.value });
		};
	}

	createHandlers() {
		return {
			cover: (e) => {
				e.preventDefault();
				this.cover.current.click();
			},
			profile: (e) => {
				e.preventDefault();
				this.profile.current.click();
			},
		};
	}

	readFile(key, e) {
		e.preventDefault();
		const stateKey = key === 'cover' ? 'cover_photo' : 'profile_picture';
		const file = e.target.files[0];
		this.setState({ [stateKey]: file });
		const fr = new FileReader();

		fr.onload = () => {
			const urls = this.state.urls;
			this.setState({
				urls: {
					...urls,
					[key]: fr.result,
				},
			});
		};

		fr.readAsDataURL(file);
	}

	handleSubmit() {
		return async (e) => {
			e.preventDefault();
			this.setState({ processing: true });
			const formData = new FormData(e.target);
			try {
				const response = await (this.state.mode === 'Add'
					? Axios.post(this.url, formData)
					: Axios.put(`${this.url}/${this.state.id}`, formData));
				const school = (await Axios.get(`/schools/${response.data.id}`))
					.data;
				const schools = state.get('schools') || [];
				if (this.state.mode === 'Add') {
					schools.push(school);
				} else {
					const existing = schools.find(
						(school) => school.id === this.state.id
					);
					schools.splice(schools.indexOf(existing), 1, school);
				}
				state.set('schools', schools);
				toastr.success('School saved successfully.');
			} catch (error) {
				if (error.response && error.response.status === 422) {
					error.response.data.errors.forEach((error) => {
						toastr.error(error.msg, error.param);
					});
					return;
				}
				console.log(error.toJSON());
				toastr.error('Unable to save school.');
			} finally {
				this.setState({ processing: false });
			}
		};
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
													{this.state.mode} School
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
												<FormFile
													handlers={this.createHandlers()}
													urls={this.state.urls}
												/>
												<form
													onSubmit={this.handleSubmit()}
												>
													<input
														type="file"
														ref={this.profile}
														className={`d-none ${
															this.state
																.processing
																? 'disabled'
																: ''
														}`}
														onChange={(e) =>
															this.readFile(
																'profile',
																e
															)
														}
														name="profile_picture"
														disabled={
															this.state
																.processing
														}
													/>
													<input
														type="file"
														ref={this.cover}
														className={`d-none ${
															this.state
																.processing
																? 'disabled'
																: ''
														}`}
														onChange={(e) =>
															this.readFile(
																'cover',
																e
															)
														}
														name="cover_photo"
														disabled={
															this.state
																.processing
														}
													/>
													<FormOne
														state={this.state}
														handle={this.handle.bind(
															this
														)}
														processing={
															this.processing
														}
													/>
													<hr />
													<FormTwo
														state={this.state}
														handle={this.handle.bind(
															this
														)}
														processing={
															this.processing
														}
													/>
													<hr />
													<FormThree
														state={this.state}
														handle={this.handle.bind(
															this
														)}
														processing={
															this.processing
														}
													/>
													<hr />
													<FormFour
														state={this.state}
														handle={this.handle.bind(
															this
														)}
														processing={
															this.processing
														}
													/>
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
