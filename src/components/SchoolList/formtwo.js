import React, { Component } from 'react';

export default class FormTwo extends Component {
	render() {
		const { state, handle, processing } = this.props;
		return (
			<div className="row">
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="province">Province:</label>
						<input
							value={state.province}
							onChange={handle('province')}
							type="text"
							id="province"
							name="province"
							placeholder="Province"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						/>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="name">Name:</label>
						<input
							value={state.name}
							onChange={handle('name')}
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						/>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="address">Address:</label>
						<input
							value={state.address}
							onChange={handle('address')}
							type="text"
							id="address"
							name="address"
							placeholder="Address"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						/>
					</div>
				</div>
			</div>
		);
	}
}
