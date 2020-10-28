import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class Footer extends Component {
	render() {
		return (
			<footer className="footer adjust">
				<div className="container">
					<div className="row align-items-center justify-content-md-between">
						<div className="col-md-6">
							<div className="copyright">
								© 2020 <Link to="/">School</Link>.
							</div>
						</div>
						<div className="col-md-6">
							<ul className="nav nav-footer justify-content-end">
								<li className="nav-item">
									<Link to="/about-us" className="nav-link">
										About Us
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/privacy-policy"
										className="nav-link"
									>
										Privacy Policy
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
