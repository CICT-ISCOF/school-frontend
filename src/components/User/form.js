import React, { Component } from 'react';
import toastr from 'toastr';
import Axios from 'axios';
import state from '../../state';

export default class Form extends Component {
	url = '/users';

	constructor(props) {
		super(props);
		const fragments = window.location.pathname.split('/');

		const {
			match: { params },
		} = this.props;

		this.state = {
			processing: false,
			mode: 'Add',
			type: 'School Admin',
			username: '',
			password: '',
		};

		if (fragments.includes('edit')) {
			const users = state.get('users') || [];
			const id = Number(params.id);

			const target = users.find((user) => user.id === id);

			if (!target) {
				this.props.history.goBack();
				return;
			}

			target.password = '';

			this.state = {
				processing: false,
				mode: 'Edit',
				...target,
			};
		}
	}

	set(key, e) {
		this.setState({ [key]: e.target.value });
	}

	handleSubmit() {
		return (e) => {
			e.preventDefault();
			this.setState({ processing: true });
			this.request(this.state)
				.then((response) => response.data)
				.then((user) => {
					const users = state.get('users') || [];

					if (this.state.mode === 'Add') {
						users.push(user);
					} else {
						const existing = users.find(
							(item) => item.id === user.id
						);
						users.splice(users.indexOf(existing), 1, user);
					}

					state.set('users', users);

					toastr.success('User saved successfully.');
				})
				.catch((error) => {
					if (error.response && error.response.status === 422) {
						error.response.data.errors.forEach((error) => {
							toastr.error(error.msg, error.param);
						});
						return;
					}
					console.log(error);
					toastr.error('Unable to save user.');
				})
				.finally(() => this.setState({ processing: false }));
		};
	}

	request({ type, username, password, id }) {
		return this.state.mode === 'Add'
			? Axios.post(this.url, { type, username, password })
			: Axios.put(`${this.url}/${id}`, { type, username, password });
	}

	render() {
		return (
			<div className="container pt-3 px-5">
				<h5>{this.state.mode} User</h5>
				<button
					className="btn btn-sm btn-warning"
					onClick={(e) => {
						e.preventDefault();
						this.props.history.goBack();
					}}
				>
					Back
				</button>
				<form onSubmit={this.handleSubmit()}>
					<div className="row">
						<div className="col-sm-12 col-md-6 offset-md-3">
							<div className="form-group">
								<label htmlFor="type">Type:</label>
								<select
									id="type"
									name="type"
									placeholder="Type"
									className={`form-control form-control-alternative ${
										this.state.processing ? 'disabled' : ''
									}`}
									disabled={this.state.processing}
									onChange={(e) => this.set('type', e)}
									value={this.state.type}
								>
									<option value="Admin">Admin</option>
									<option value="School Admin">
										School Admin
									</option>
								</select>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 offset-md-3">
							<div className="form-group">
								<label htmlFor="username">Username:</label>
								<input
									id="username"
									name="username"
									type="text"
									placeholder="Username"
									className={`form-control form-control-alternative ${
										this.state.processing ? 'disabled' : ''
									}`}
									disabled={this.state.processing}
									onChange={(e) => this.set('username', e)}
									value={this.state.username}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 offset-md-3">
							<div className="form-group">
								<label htmlFor="password">Password:</label>
								<input
									id="password"
									name="password"
									type="password"
									placeholder="Password"
									className={`form-control form-control-alternative ${
										this.state.processing ? 'disabled' : ''
									}`}
									disabled={this.state.processing}
									onChange={(e) => this.set('password', e)}
									value={this.state.password}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 offset-md-3 mb-5">
							<button
								type="submit"
								className={`btn btn-default btn-sm mt-2 mb-4 ${
									this.state.processing ? 'disabled' : ''
								}`}
								disabled={this.state.processing}
							>
								{this.state.processing ? (
									<i className="fas fa-circle-notch fa-spin"></i>
								) : (
									'Save'
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
