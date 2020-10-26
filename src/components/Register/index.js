import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dark from '../Backgrounds/dark';
import FooterThanks from '../FooterThanks';
import Navbar from '../Navbar';

export default class Register extends Component {
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
											<form>
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
														/>
													</div>
												</div>
												<div className="text-muted font-italic">
													<small>
														Password Strength:{' '}
														<span className="text-success font-weight-700">
															strong
														</span>
													</small>
												</div>
												<div className="row my-4">
													<div className="col-12">
														<div className="custom-control custom-control-alternative custom-checkbox">
															<input
																className="custom-control-input"
																id="customCheckRegister"
																type="checkbox"
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
														type="button"
														className="btn btn-primary mt-4"
													>
														Create account
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
