import React, { Component } from 'react';
import Navbar from '../Navbar';
import Dark from '../Backgrounds/dark';
import Footer from '../Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './list';
import Form from './form';

export default class User extends Component {
	render() {
		return (
			<div className="landing-page">
				<Navbar />
				<div className="section section-hero section-shaped">
					<Dark />
					<div className="page-header">
						<div className="container shape-container d-flex align-items-center py-lg">
							<div className="col px-0">
								<div className="row align-items-center justify-content-center">
									<div className="col-sm-12">
										<div className="rounded bg-white w-100 h-100 shadow">
											<div className="container py-3">
												<BrowserRouter>
													<Switch>
														<Route
															path={
																this.props.match
																	.url
															}
															exact
															component={List}
														/>
														<Route
															path={`${this.props.match.url}/add`}
															component={Form}
														/>
														<Route
															path={`${this.props.match.url}/:id/edit`}
															component={Form}
														/>
													</Switch>
												</BrowserRouter>
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
