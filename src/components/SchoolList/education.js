import React, { Component } from 'react';
import dayjs from 'dayjs';
import state from '../../state';
import { Link } from 'react-router-dom';

export default class Education extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logged: state.has('user'),
			user: state.get('user'),
		};
	}
	render() {
		const {
			type,
			tuition,
			date,
			description,
			id,
			SchoolId,
			UserId,
			emitDelete,
		} = this.props;
		return (
			<div className="col-sm-12 col-md-6 p-2">
				<div className="bg-white p-3 rounded shadow">
					<h4 className="d-flex">
						Type: {type}
						{this.state.logged &&
						(this.state.user.type === 'Admin' ||
							this.state.user.id === UserId) ? (
							<div className="d-flex ml-auto">
								<Link
									style={{ height: '28px', width: '28px' }}
									to={`/schools/${SchoolId}/non-he/${id}/edit`}
									className="btn btn-sm btn-icon btn-warning rounded-circle mx-1 align-self-center"
								>
									<i className="fas fa-edit"></i>
								</Link>
								<a
									type="button"
									href={`/schools/${SchoolId}/non-he/${id}/delete`}
									className="btn btn-sm btn-icon btn-danger rounded-circle mx-1 align-self-center"
									data-toggle="modal"
									data-target={`#deleteEducationModal${id}`}
								>
									<i className="fas fa-trash"></i>
								</a>
							</div>
						) : null}
					</h4>
					<h6>Tuition: {tuition}</h6>
					<p>
						Date of Examination:{' '}
						{date
							? dayjs(date).format('DD/MM/YYYY hh:mm A')
							: 'N/A'}
					</p>
					<p>{description}</p>
				</div>
				<div
					className="modal fade"
					id={`deleteEducationModal${id}`}
					tabIndex="-1"
					role="dialog"
					aria-labelledby={`deleteEducationModalLabel${id}`}
					aria-hidden="true"
				>
					<div
						className="modal-dialog modal-dialog-centered modal-lg"
						role="document"
					>
						<div className="modal-content">
							<div className="modal-header">
								<h5
									className="modal-title"
									id={`deleteEducationModalLabel${id}`}
								>
									Delete {type}
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
							<div
								className="modal-body"
								style={{ fontSize: '16px' }}
							>
								Are you sure you want to delete {type}?
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-danger btn-sm"
									onClick={(e) => {
										e.preventDefault();
										const $ = window.$;
										$(`#deleteModal${id}`).modal('hide');
										emitDelete(id);
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
			</div>
		);
	}
}
