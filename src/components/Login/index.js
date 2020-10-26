import React, { Component } from 'react';
import Navbar from '../Navbar';
import state from '../../state';
import Axios from 'axios';
import toastr from 'toastr';
import FooterThanks from '../FooterThanks';
import Dark from '../Backgrounds/dark';

export default class Login extends Component {
	url = '/auth/login';

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			processing: false,
			remember: false,
		};
	}

	async submit(e) {
		e.preventDefault();
		this.setState({ processing: true });
		try {
			const response = await Axios.post(this.url, {
				username: this.state.username,
				password: this.state.password,
			});
			const { user, token } = response.data;
			const data = state.getAll();
			if (!this.state.remember) {
				state.use(sessionStorage);
			} else {
				state.use(localStorage);
			}
			state.setAll(data);
			state.set('user', user);
			state.set('token', token);
			return this.props.history.push({
				pathname: '/schools',
			});
		} catch (error) {
			if (error.response && error.response.status === 422) {
				error.response.data.errors.forEach((error) => {
					toastr.error(error.msg, error.param);
				});
				return;
			}
			console.log('toJSON' in error ? error.toJSON() : error);
			toastr.error('Unable to sign in.');
		} finally {
			this.setState({ processing: false });
		}
	}

	render() {
		return (
			<div className="login-page">
				<Navbar />
				<div className="wrapper">
					<section className="section section-shaped section-lg">
						<Dark />
						<div className="container pt-lg-7">
							<div className="row justify-content-center">
								<div className="col-lg-5">
									<div className="card bg-secondary shadow border-0">
										<div className="card-header bg-white pb-5">
											<div className="text-muted text-center mb-3">
												<small>Sign in with</small>
											</div>
											<div className="text-center">
												<a
													href="/"
													onClick={(e) =>
														e.preventDefault()
													}
													className="btn btn-neutral btn-icon mr-4"
												>
													<span className="btn-inner--icon">
														<i className="fab fa-facebook"></i>
													</span>
													<span className="btn-inner--text">
														Facebook
													</span>
												</a>
												<a
													href="/"
													onClick={(e) =>
														e.preventDefault()
													}
													className="btn btn-neutral btn-icon"
												>
													<span className="btn-inner--icon">
														<i className="fab fa-google"></i>
													</span>
													<span className="btn-inner--text">
														Google
													</span>
												</a>
											</div>
										</div>
										<div className="card-body px-lg-5 py-lg-5">
											<div className="text-center text-muted mb-4">
												<small>
													Or sign in with credentials
												</small>
											</div>
											<form>
												<div className="form-group">
													<div className="input-group input-group-alternative mb-3">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<i className="ni ni-email-83"></i>
															</span>
														</div>
														<input
															className={`form-control ${
																this.state
																	.processing
																	? 'disabled'
																	: ''
															}`}
															disabled={
																this.state
																	.processing
															}
															placeholder="Username"
															type="text"
															onChange={(e) =>
																this.setState({
																	username:
																		e.target
																			.value,
																})
															}
														/>
													</div>
												</div>
												<div className="form-group focused">
													<div className="input-group input-group-alternative">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<i className="ni ni-lock-circle-open"></i>
															</span>
														</div>
														<input
															className={`form-control ${
																this.state
																	.processing
																	? 'disabled'
																	: ''
															}`}
															disabled={
																this.state
																	.processing
															}
															placeholder="Password"
															type="password"
															onChange={(e) =>
																this.setState({
																	password:
																		e.target
																			.value,
																})
															}
															onKeyPress={(e) => {
																if (
																	e.key ===
																	'Enter'
																) {
																	this.submit(
																		e
																	);
																}
															}}
														/>
													</div>
												</div>
												<div className="row my-4">
													<div className="col-12">
														<div className="custom-control custom-control-alternative custom-checkbox">
															<input
																className={`custom-control-input ${
																	this.state
																		.processing
																		? 'disabled'
																		: ''
																}`}
																disabled={
																	this.state
																		.processing
																}
																id="customCheckRegister"
																type="checkbox"
																onChange={(e) =>
																	this.setState(
																		{
																			remember: !this
																				.state
																				.remember,
																		}
																	)
																}
																checked={
																	this.state
																		.remember
																		? true
																		: false
																}
															/>
															<label
																className="custom-control-label"
																htmlFor="customCheckRegister"
															>
																<span>
																	Remember Me
																</span>
															</label>
														</div>
													</div>
												</div>
												<div className="text-center">
													<button
														type="button"
														className={`btn btn-primary mt-4 ${
															this.state
																.processing
																? 'disabled'
																: ''
														}`}
														disabled={
															this.state
																.processing
														}
														onClick={(e) =>
															this.submit(e)
														}
													>
														{this.state
															.processing ? (
															<i className="fas fa-circle-notch fa-spin"></i>
														) : (
															'Sign In'
														)}
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<FooterThanks />
				</div>
			</div>
		);
	}
}
