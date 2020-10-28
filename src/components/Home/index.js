import React, { Component } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './index.scss';
import { ReactComponent as Card } from 'bootstrap-icons/icons/card-checklist.svg';
import { ReactComponent as Search } from 'bootstrap-icons/icons/search.svg';
import { Link } from 'react-router-dom';
import Circle from '../Backgrounds/circle';

export default class Home extends Component {
	render() {
		return (
			<div className="index-page">
				<Navbar />
				<div className="wrapper">
					<div className="section section-hero section-shaped">
						<Circle />
						<div className="page-header">
							<div className="container shape-container d-flex align-items-center py-lg">
								<div className="col px-0">
									<div className="row align-items-center justify-content-center">
										<div className="col-lg-6 text-center">
											<img
												src="./assets/img/brand/white.png"
												style={{ width: '200px' }}
												className="img-fluid"
												alt="Logo"
											/>
											<p className="lead text-white">
												Lorem ipsum dolor sit amet
												consectetur, adipisicing elit.
												Laudantium, hic? Laborum
												voluptates ex, ullam molestias
												aspernatur optio excepturi
												dolores suscipit, quae pariatur
												doloremque mollitia iusto
												minima. Atque accusantium ut
												laborum.
											</p>
											<div className="btn-wrapper mt-5">
												<Link
													to="/schools"
													className="btn btn-lg btn-white btn-icon mb-3 mb-sm-0"
												>
													<span className="btn-inner--icon mb-1">
														<Search />
													</span>
													<span className="btn-inner--text">
														Browse Schools
													</span>
												</Link>
												<Link
													to="/schools/add"
													className="btn btn-lg btn-github btn-icon mb-3 mb-sm-0"
													target="_blank"
												>
													<span className="btn-inner--icon mb-1">
														<Card />
													</span>
													<span className="btn-inner--text">
														<span className="text-warning">
															Register
														</span>{' '}
														your School
													</span>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="separator separator-bottom separator-skew zindex-100">
							<svg
								x="0"
								y="0"
								viewBox="0 0 2560 100"
								preserveAspectRatio="none"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<polygon
									className="fill-white"
									points="2560 0 2560 100 0 100"
								></polygon>
							</svg>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		);
	}
}
