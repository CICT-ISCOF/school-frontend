import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Account extends Component {
	render() {
		const { logout } = this.props;
		return (
			<li className="nav-item dropdown">
				<a
					className="nav-link nav-link-icon dropdown-toggle"
					href="/"
					onClick={(e) => e.preventDefault()}
					id="navbar-success_dropdown_1"
					role="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<i className="ni ni-settings-gear-65"></i>
					<span className="nav-link-inner--text d-lg-none">
						Settings
					</span>
				</a>
				<div
					className="dropdown-menu dropdown-menu-right"
					aria-labelledby="navbar-success_dropdown_1"
				>
					<Link className="dropdown-item" to="/settings">
						Settings
					</Link>
					<div className="dropdown-divider"></div>
					<a
						className="dropdown-item"
						href="/logout"
						onClick={(e) => {
							e.preventDefault();
							logout();
						}}
					>
						Logout
					</a>
				</div>
			</li>
		);
	}
}
