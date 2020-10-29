import React, { Component } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import state from '../../state';
import Account from './account';
import Information from './information';

export default class Navbar extends Component {
	key = -1;

	constructor(props) {
		super(props);
		this.state = {
			logged: state.has('user'),
			user: state.get('user'),
			transparent:
				'transparent' in this.props ? this.props.transparent : true,
		};
	}

	componentDidMount() {
		this.key = state.listen('user', (user) => {
			this.setState({ user });
		});
	}

	componentWillUnmount() {
		state.removeListener('user', this.key);
	}

	logout() {
		state.clear();
		this.setState({ logged: false });
		window.location.href = '/';
	}

	render() {
		const fragments = window.location.pathname.split('/');
		return (
			<nav
				id="navbar-main"
				className={`navbar navbar-main navbar-expand-lg ${
					this.state.transparent
						? 'navbar-transparent navbar-light'
						: 'navbar-dark bg-dark front'
				} headroom`}
			>
				<div className="container">
					<Link className="navbar-brand mr-lg-5" to="/">
						<img src="/assets/img/brand/white.png" alt="Logo" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbar_global"
						aria-controls="navbar_global"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="navbar-collapse collapse"
						id="navbar_global"
					>
						<div className="navbar-collapse-header">
							<div className="row">
								<div className="col-6 collapse-brand">
									<Link to="/">
										<img
											src="/assets/img/brand/blue.png"
											alt="Logo"
										/>
									</Link>
								</div>
								<div className="col-6 collapse-close">
									<button
										type="button"
										className="navbar-toggler"
										data-toggle="collapse"
										data-target="#navbar_global"
										aria-controls="navbar_global"
										aria-expanded="false"
										aria-label="Toggle navigation"
									>
										<span></span>
										<span></span>
									</button>
								</div>
							</div>
						</div>
						<ul className="navbar-nav navbar-nav-hover align-items-lg-center">
							<Information />
							<li className="nav-item">
								<Link to="/schools" className="nav-link">
									List of Schools
								</Link>
							</li>
							{this.state.logged &&
							this.state.user.type === 'Admin' ? (
								<li className="nav-item">
									<Link to="/users" className="nav-link">
										Users
									</Link>
								</li>
							) : null}
						</ul>
						<ul className="navbar-nav align-items-lg-center ml-lg-auto">
							<li className="nav-item">
								<a
									className="nav-link nav-link-icon"
									href="/"
									target="_blank"
									data-toggle="tooltip"
									title="Like us on Facebook"
								>
									<i className="fa fa-facebook-square"></i>
									<span className="nav-link-inner--text d-lg-none">
										Facebook
									</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link nav-link-icon"
									href="/"
									target="_blank"
									data-toggle="tooltip"
									title="Follow us on Instagram"
								>
									<i className="fa fa-instagram"></i>
									<span className="nav-link-inner--text d-lg-none">
										Instagram
									</span>
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link nav-link-icon"
									href="/"
									target="_blank"
									data-toggle="tooltip"
									title="Follow us on Twitter"
								>
									<i className="fa fa-twitter-square"></i>
									<span className="nav-link-inner--text d-lg-none">
										Twitter
									</span>
								</a>
							</li>
							<li className="nav-item d-none d-lg-block ml-lg-4">
								{fragments.includes('login') ||
								this.state.logged ? null : (
									<Link
										to="/login"
										className="btn btn-neutral btn-icon"
									>
										<span className="btn-inner--icon">
											<i className="fas fa-user-circle mr-2"></i>
										</span>
										<span className="nav-link-inner--text">
											Login
										</span>
									</Link>
								)}
								{fragments.includes('register') ||
								this.state.logged ? null : (
									<Link
										to="/register"
										className="btn btn-neutral btn-icon"
									>
										<span className="btn-inner--icon">
											<i className="fas fa-edit mr-2"></i>
										</span>
										<span className="nav-link-inner--text">
											Register
										</span>
									</Link>
								)}
							</li>
							{this.state.logged ? (
								<Account logout={this.logout.bind(this)} />
							) : null}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
