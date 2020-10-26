import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FooterThanks extends Component {
	render() {
		return (
			<footer className="footer">
				<div className="container">
					<div className="row row-grid align-items-center mb-5">
						<div className="col-lg-6">
							<h3 className="text-primary font-weight-light mb-2">
								Thank you for using our app!
							</h3>
							<h4 className="mb-0 font-weight-light">
								Let's get in touch on any of these platforms.
							</h4>
						</div>
						<div className="col-lg-6 text-lg-center btn-wrapper">
							<button
								target="_blank"
								href="/"
								rel="nofollow"
								className="btn btn-icon-only btn-twitter rounded-circle"
								data-toggle="tooltip"
								data-original-title="Follow us"
							>
								<span className="btn-inner--icon">
									<i className="fa fa-twitter"></i>
								</span>
							</button>
							<button
								target="_blank"
								href="/"
								rel="nofollow"
								className="btn-icon-only rounded-circle btn btn-facebook"
								data-toggle="tooltip"
								data-original-title="Like us"
							>
								<span className="btn-inner--icon">
									<i className="fab fa-facebook"></i>
								</span>
							</button>
							<button
								target="_blank"
								href="/"
								rel="nofollow"
								className="btn-icon-only rounded-circle btn btn-instagram"
								data-toggle="tooltip"
								data-original-title="Follow us"
							>
								<span className="btn-inner--icon">
									<i className="fab fa-instagram"></i>
								</span>
							</button>
						</div>
					</div>
					<hr />
					<div className="row align-items-center justify-content-md-between">
						<div className="col-md-6">
							<div className="copyright">
								© 2020{' '}
								<Link to="/" target="_blank">
									Schools
								</Link>
								.
							</div>
						</div>
						<div className="col-md-6">
							<ul className="nav nav-footer justify-content-end">
								<li className="nav-item">
									<Link to="/" className="nav-link">
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/contact-us" className="nav-link">
										Contact Us
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
