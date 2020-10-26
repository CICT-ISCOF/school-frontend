import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Circle from './Backgrounds/circle';

export default class FourZeroFour extends Component {
	render() {
		return (
			<div className="index-page">
				<Navbar transparent={false} />
				<div className="wrapper">
					<div className="section section-hero section-shaped">
						<Circle />
						<div className="page-header">
							<div className="container shape-container d-flex align-items-center py-lg">
								<div className="col px-0">
									<div className="row align-items-center justify-content-center">
										<div className="col-lg-6 text-center">
											<h1 className="text-white">
												Page Not Found
											</h1>
											<p className="text-white">
												Are you looking for something?
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="separator separator-bottom separator-skew zindex-100">
							<svg
								x="0"
								y="0"
								viewBox="0 0 2560 100"
								preserveAspectRatio="none"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<polygon
									class="fill-white"
									points="2560 0 2560 100 0 100"
								></polygon>
							</svg>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
