import React, { Component } from 'react';

export default class FormFile extends Component {
	render() {
		const { profile, cover } = this.props.handlers;
		const urls = this.props.urls;
		return (
			<div
				className="container-fluid p-2 rounded shadow-sm mt-2 mb-4 d-flex"
				style={{
					position: 'relative',
				}}
			>
				<img
					src={urls.cover}
					alt="Cover"
					className="file-form shadow bg-white"
					style={{
						maxHeight: '300px',
						width: '100%',
						height: 'auto',
						objectFit: 'contain',
					}}
					onClick={cover}
				/>
				<img
					src={urls.profile}
					alt="Profile"
					className="file-form rounded-circle shadow d-inline border bg-white mt-3 form-profile-picture"
					onClick={profile}
				/>
			</div>
		);
	}
}
