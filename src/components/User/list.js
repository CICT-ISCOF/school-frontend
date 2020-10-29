import React, { Component } from 'react';
import Axios from 'axios';
import toastr from 'toastr';
import './list.scss';
import state from '../../state';
import { ReactComponent as Refreshing } from 'bootstrap-icons/icons/arrow-repeat.svg';
import { Link } from 'react-router-dom';
import Pagination from '../pagination';

export default class List extends Component {
	url = '/users';
	key = -1;
	constructor(props) {
		super(props);

		const query = new URLSearchParams(this.props.location.search);

		this.state = {
			users: state.has('users') ? state.get('users') : [],
			refreshing: false,
			page: Number(query.get('page')) || 1,
		};
	}

	refresh() {
		this.setState({ refreshing: true });
		Axios.get('/users')
			.then((response) => response.data)
			.then((users) => state.set('users', users))
			.catch((error) => {
				console.log(error);
				toastr.error('Unable to fetch users.');
			})
			.finally(() => this.setState({ refreshing: false }));
	}

	paginate(page) {
		this.setState({ page });
	}

	componentDidMount() {
		this.key = state.listen('users', (users) => {
			this.setState({ users });
		});
		this.refresh();
	}

	componentWillUnmount() {
		state.removeListener('users', this.key);
	}

	delete(index) {
		const user = this.state.users[index];
		const $ = window.$;

		const modal = $(`#deleteUserModal${user.id}`);
		modal.modal('hide');
		modal.on('hidden.bs.modal', (e) => {
			Axios.delete(`${this.url}/${user.id}`)
				.then(() => {
					const users = state.get('users') || [];
					const existing = users.find((item) => item.id === user.id);
					users.splice(users.indexOf(existing), 1);
					state.set('users', users);
					toastr.success('User deleted successfully.');
				})
				.catch((error) => {
					console.log(error);
					toastr.error('Unable to delete user.');
				});
		});
	}

	render() {
		const items = this.state.users.map((user, index) => (
			<tr key={index}>
				<td>{user.username}</td>
				<td>
					<span
						className={`badge badge-${
							user.type === 'Admin' ? 'primary' : 'warning'
						}`}
					>
						{user.type}
					</span>
				</td>
				<td>{user.Schools.length}</td>
				<td className="text-center">
					<Link
						to={`/users/${user.id}/edit`}
						className={`btn rounded-circle btn-sm btn-warning ${
							user.id === state.get('user').id ? 'disabled' : null
						}`}
						disabled={user.id === state.get('user').id}
						style={{ width: '28px', height: '28px' }}
					>
						<i className="fas fa-edit"></i>
					</Link>
					<a
						href={`/users/${user.id}/delete`}
						className={`btn rounded-circle btn-sm btn-danger ${
							user.id === state.get('user').id ? 'disabled' : null
						}`}
						disabled={user.id === state.get('user').id}
						style={{ width: '28px', height: '28px' }}
						data-toggle="modal"
						data-target={`#deleteUserModal${user.id}`}
					>
						<i className="fas fa-trash"></i>
					</a>
					<div
						className="modal fade"
						id={`deleteUserModal${user.id}`}
						tabIndex="-1"
						role="dialog"
						aria-labelledby={`#deleteUserModalLabel${user.id}`}
						aria-hidden="true"
					>
						<div
							className="modal-dialog modal-dialog-centered"
							role="document"
						>
							<div className="modal-content">
								<div className="modal-header">
									<h5
										className="modal-title"
										id={`#deleteUserModalLabel${user.id}`}
									>
										Delete User
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									Are you sure you want to delete{' '}
									{user.username}?
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-danger btn-sm"
										onClick={(e) => {
											e.preventDefault();
											this.delete(index);
										}}
									>
										Confirm
									</button>
									<button
										type="button"
										className="btn btn-secondary btn-sm"
										data-dismiss="modal"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</td>
			</tr>
		));

		const page = this.state.page;
		const list = [];
		const limit = 10;
		const offset = (page - 1) * limit;

		for (let count = offset; count < offset + limit; count++) {
			if (typeof items[count] !== 'undefined') {
				list.push(items[count]);
			}
		}

		return (
			<div>
				<h4 className="d-flex">
					Users
					<Refreshing
						className={`ml-auto align-self-center ${
							this.state.refreshing ? 'icon-spin' : ''
						}`}
						style={{ cursor: 'pointer' }}
						onClick={(e) => this.refresh()}
					/>
				</h4>
				<hr />
				<div className="d-flex mb-3">
					<Link to="/users/add" className="btn btn-sm btn-info">
						Add User
					</Link>
				</div>
				<div className="container table-responsive">
					<Pagination
						url={this.props.history.location.pathname}
						current={page}
						limit={limit}
						total={items.length}
						change={this.paginate.bind(this)}
					>
						{list.length > 0 ? (
							<table className="table table-sm my-5">
								<thead>
									<tr>
										<th>Username</th>
										<th>Type</th>
										<th>Registered Schools</th>
										<th className="text-center">Actions</th>
									</tr>
								</thead>
								<tbody>{list}</tbody>
							</table>
						) : (
							<div className="text-center py-3">
								<h2>No Results</h2>
							</div>
						)}
					</Pagination>
				</div>
			</div>
		);
	}
}
