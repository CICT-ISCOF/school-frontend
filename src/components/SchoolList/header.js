import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		const { target, show, degrees, courses, nonHE } = this.props.header;
		return (
			<div className="row justify-content-center">
				<div className="col-lg-3 order-lg-2">
					<div className="card-profile-image">
						<a
							href={window.location.href}
							onClick={(e) => {
								e.preventDefault();
								show('profile');
							}}
						>
							<img
								src={target.ProfilePicture.uri}
								alt={target.name + ' Profile'}
								className="rounded-circle"
							/>
						</a>
					</div>
				</div>
				<div className="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
					<div className="card-profile-actions py-4 mt-lg-0">
						<a
							href={`/schools/${target.id}/degrees`}
							className="btn btn-sm btn-dark mr-4"
							onClick={(e) => {
								e.preventDefault();
								show('degrees');
							}}
						>
							Degrees
						</a>
						<a
							href={`/schools/${target.id}/courses`}
							className="btn btn-sm btn-default float-right"
							onClick={(e) => {
								e.preventDefault();
								show('courses');
							}}
						>
							Courses
						</a>
					</div>
				</div>
				<div className="col-lg-4 order-lg-1">
					<div className="card-profile-stats d-flex justify-content-center">
						<div>
							<span className="heading">{degrees}</span>
							<span className="description">Degrees</span>
						</div>
						<div>
							<span className="heading">{courses}</span>
							<span className="description">Courses</span>
						</div>
						<div>
							<span className="heading">{nonHE}</span>
							<span className="description">Non-HE</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
