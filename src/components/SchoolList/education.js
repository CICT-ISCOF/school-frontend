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
									to={`/schools/${SchoolId}/non-he/${id}/edit`}
									className="btn btn-sm btn-warning ml-auto mx-1 d-flex"
								>
									<i className="fas fa-edit align-self-center"></i>
								</Link>
								<button
									className="btn btn-sm btn-danger mx-1 d-flex"
									data-toggle="modal"
									data-target={`#deleteModal${id}`}
								>
									<i className="fas fa-trash align-self-center"></i>
								</button>
								<div
									className="modal fade"
									id={`deleteModal${id}`}
									tabIndex="-1"
									role="dialog"
									aria-labelledby={`deleteModalLabel${id}`}
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
													id={`deleteModalLabel${id}`}
												>
													Delete {type}
												</h5>
												<button
													type="button"
													className="close"
													data-dismiss="modal"
													aria-label="Close"
												>
													<span aria-hidden="true">
														&times;
													</span>
												</button>
											</div>
											<div
												className="modal-body"
												style={{ fontSize: '16px' }}
											>
												Are you sure you want to delete{' '}
												{type}?
											</div>
											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-danger btn-sm"
													onClick={(e) => {
														e.preventDefault();
														const $ = window.$;
														$(
															`#deleteModal${id}`
														).modal('hide');
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
			</div>
		);
	}
}
