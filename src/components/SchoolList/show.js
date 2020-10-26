import React, { Component } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import state from '../../state';
import toastr from 'toastr';
import Education from './education';
import Course from './course';
import Degree from './degree';
import Profile from './profile';
import Header from './header';

export default class Show extends Component {
	constructor(props) {
		super(props);
		const {
			match: { params },
		} = this.props;

		const id = Number(params.id);

		const schools = state.get('schools') || [];
		const target = schools.find((school) => school.id === id);
		if (!target) {
			this.props.history.goBack();
			return;
		}

		let courseCount = 0;
		target.Degrees.forEach((degree) =>
			degree.Courses.forEach((course) => courseCount++)
		);

		this.state = {
			mode: 'profile',
			target,
			degrees: target.Degrees.length,
			courses: courseCount,
			nonHE: target.Education.length,
		};
	}

	show(mode) {
		switch (mode) {
			case 'degrees':
				if (this.state.degrees === 0) {
					return toastr.info(
						'This school does not have any degrees.'
					);
				}
				this.setState({ mode: 'degrees' });
				break;
			case 'courses':
				if (this.state.courses === 0) {
					return toastr.info(
						'This school does not have any courses.'
					);
				}
				this.setState({ mode: 'courses' });
				break;
			default:
				this.setState({ mode: 'profile' });
				break;
		}
	}

	render() {
		return (
			<div className="profile-page">
				<Navbar transparent={false} />
				<div className="wrapper">
					<section className="section-profile-cover section-shaped my-0">
						<img
							className="bg-image"
							src={this.state.target.CoverPhoto.uri}
							style={{ width: '100%' }}
							alt={this.state.target.name + ' Cover'}
						/>
						<div className="separator separator-bottom separator-skew">
							<svg
								x="0"
								y="0"
								viewBox="0 0 2560 100"
								preserveAspectRatio="none"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<polygon
									className="fill-secondary"
									points="2560 0 2560 100 0 100"
								></polygon>
							</svg>
						</div>
					</section>
					<section className="section bg-secondary">
						<div className="container">
							<div className="card card-profile shadow mt--300">
								<div className="px-4">
									<Header
										header={{
											target: this.state.target,
											show: this.show.bind(this),
											degrees: this.state.degrees,
											courses: this.state.courses,
											nonHE: this.state.nonHE,
										}}
									/>
									{this.state.mode === 'profile' ? (
										<Profile profile={this.state.target} />
									) : null}
									{this.state.mode === 'degrees' ? (
										<div className="row mb-4 mt-5">
											{this.state.target.Degrees.map(
												(degree, index) => (
													<Degree
														key={index}
														degree={degree}
													/>
												)
											)}
										</div>
									) : null}
									{this.state.mode === 'courses' ? (
										<div className="row mb-2 mt-5">
											{this.state.target.Degrees.map(
												(degree) =>
													degree.Courses.map(
														(course, index) => (
															<Course
																key={index}
																course={course}
															/>
														)
													)
											)}
										</div>
									) : null}

									{this.state.mode === 'courses' ? (
										<div className="mb-4">
											<hr />
											<h4>Non-HE Offers</h4>
											<div className="row">
												{this.state.target.Education.map(
													(
														{
															type,
															tuition,
															date,
															description,
														},
														index
													) => (
														<Education
															key={index}
															type={type}
															tuition={tuition}
															date={date}
															description={
																description
															}
														/>
													)
												)}
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</section>
				</div>
				<Footer />
			</div>
		);
	}
}
