import Axios from 'axios';
import React, { Component } from 'react';
import state from '../state';
import toastr from 'toastr';
import Navbar from './Navbar';
import Footer from './Footer';
import Magic from './Backgrounds/magic';

export default class Rate extends Component {
	constructor(props) {
		super(props);

		const {
			match: { params },
		} = this.props;

		this.state = {
			school: state
				.get('schools')
				.find((school) => Number(school.id) === Number(params.id)),
			SchoolId: params.id,
			rating: 1,
			message: '',
			processing: false,
			ip_address: state.get('unique-token'),
		};
	}

	async submit() {
		this.setState({ processing: true });
		try {
			const response = await Axios.post(`/rating`, this.state);
			console.log(response.data);
			toastr.success('Rating saved successfully.');
		} catch (error) {
			console.log(error);
			toastr.error('Unable to save rating.');
		} finally {
			this.setState({ processing: false });
		}
	}

	render() {
		return (
			<div className='landing-page'>
				<Navbar transparent={false} />
				<div className='section section-hero section-shaped pt-3'>
					<Magic />
					<div className='page-header'>
						<div className='container shape-container d-flex align-items-center py-lg'>
							<div className='col px-0'>
								<div className='row align-items-center justify-content-center'>
									<div className='col-sm-12'>
										<div className='rounded bg-white w-100 h-100 shadow'>
											<div className='container py-3 px-5'>
												<h2>
													Rate{' '}
													{this.state.school.name}
												</h2>
												<form
													onSubmit={(e) => {
														e.preventDefault();
														this.submit();
													}}
												>
													{/* <div className='form-group'>
														<label htmlFor='message'>
															Message (optional):
														</label>
														<textarea
															name='message'
															id='message'
															cols='30'
															rows='10'
															className={`form-control form-control-sm ${
																this.state
																	.processing
																	? 'disabled'
																	: ''
															}`}
															onChange={(e) => {
																e.preventDefault();
																this.setState({
																	message:
																		e.target
																			.value,
																});
															}}
															disabled={
																this.state
																	.processing
															}
														></textarea>
													</div> */}
													<div className='form-group'>
														<label htmlFor='rating'>
															Rating:
														</label>
														<select
															name='rating'
															id='rating'
															className={`form-control form-control-sm ${
																this.state
																	.processing
																	? 'disabled'
																	: ''
															}`}
															onChange={(e) => {
																e.preventDefault();
																this.setState({
																	rating: Number(
																		e.target
																			.value
																	),
																});
															}}
															disabled={
																this.state
																	.processing
															}
														>
															{[
																1,
																2,
																3,
																4,
																5,
															].map(
																(
																	rate,
																	index
																) => (
																	<option
																		value={
																			rate
																		}
																		key={
																			index
																		}
																	>
																		{rate}
																	</option>
																)
															)}
														</select>
													</div>
													<div className='form-group'>
														<button
															type='submit'
															className={`btn btn-sm btn-primary ${
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
																.processing
																? 'Saving'
																: 'Save'}
														</button>
													</div>
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
