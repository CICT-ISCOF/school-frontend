import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dark from '../Backgrounds/dark';
import FooterThanks from '../FooterThanks';
import Navbar from '../Navbar';
import Axios from 'axios';
import toastr from 'toastr';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			processing: false,
			username: '',
			password: '',
			agrees: false,
		};
	}

	set(key, e) {
		this.setState({ [key]: e.target.value });
	}

	getPasswordStrength() {
		if (this.state.password.length > 9) {
			return 'success';
		}
		if (this.state.password.length > 6) {
			return 'warning';
		}
		return 'danger';
	}

	getPasswordStrengthLabel() {
		return { success: 'Strong', warning: 'Medium', danger: 'Weak' }[
			this.getPasswordStrength()
		];
	}

	submit(e) {
		e.preventDefault();
		Axios.post(`/auth/register`, {
			username: this.state.username,
			password: this.state.password,
			type: 'School Admin',
		})
			.then(() => {
				toastr.success(
					'Registered successfully. Go to the sign in page to log in.'
				);
			})
			.catch((error) => {
				if (error.response && error.response.status === 422) {
					error.response.data.errors.forEach((error) => {
						toastr.error(error.msg, error.param);
					});
					return;
				}
				console.log(error);
				toastr.error('Unable to register.');
			})
			.finally(() => this.setState({ processing: false }));
	}

	render() {
		return (
			<div className="register-page">
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
												<small>Sign up with</small>
											</div>
											<div className="text-center">
												<a
													href="/"
													className="btn btn-neutral btn-icon mr-4"
													onClick={(e) =>
														e.preventDefault()
													}
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
													className="btn btn-neutral btn-icon"
													onClick={(e) =>
														e.preventDefault()
													}
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
													Or sign up with credentials
												</small>
											</div>
											<form
												onSubmit={(e) => this.submit(e)}
											>
												<div className="form-group">
													<div className="input-group input-group-alternative mb-3">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<i className="ni ni-hat-3"></i>
															</span>
														</div>
														<input
															className="form-control"
															placeholder="Username"
															type="text"
															onChange={(e) =>
																this.set(
																	'username',
																	e
																)
															}
															value={
																this.state
																	.username
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
															className="form-control"
															placeholder="Password"
															type="password"
															onChange={(e) =>
																this.set(
																	'password',
																	e
																)
															}
															value={
																this.state
																	.password
															}
														/>
													</div>
												</div>
												<div className="text-muted font-italic">
													{this.state.password
														.length > 0 ? (
														<small>
															Password Strength:{' '}
															<span
																className={`text-${this.getPasswordStrength()} font-weight-700`}
															>
																{this.getPasswordStrengthLabel()}
															</span>
														</small>
													) : null}
												</div>
												<div className="row my-4">
													<div className="col-12">
														<div className="custom-control custom-control-alternative custom-checkbox">
															<input
																className="custom-control-input"
																id="customCheckRegister"
																type="checkbox"
																onChange={(e) =>
																	this.setState(
																		{
																			agrees: !this
																				.state
																				.agrees,
																		}
																	)
																}
																value={
																	this.state
																		.agrees
																}
															/>
															<label
																className="custom-control-label"
																htmlFor="customCheckRegister"
															>
																<span>
																	I agree with
																	the{' '}
																	<Link to="/privacy-policy">
																		Privacy
																		Policy
																	</Link>
																</span>
															</label>
														</div>
													</div>
												</div>
												<div className="text-center">
													<button
														type="submit"
														className={`btn btn-primary mt-4 ${
															this.state
																.processing ||
															!this.state.agrees
																? 'disabled'
																: ''
														}`}
														disabled={
															this.state
																.processing ||
															!this.state.agrees
														}
													>
														{this.state.processing
															? 'Creating account'
															: 'Create account'}
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
