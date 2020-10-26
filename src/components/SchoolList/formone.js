import React, { Component } from 'react';

export default class FormOne extends Component {
	render() {
		const { state, handle, processing } = this.props;
		return (
			<div className="row">
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="region">Region:</label>
						<select
							value={state.region}
							onChange={handle('region')}
							name="region"
							id="region"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						>
							<option value="6">VI</option>
						</select>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="type">Type:</label>
						<select
							value={state.type}
							onChange={handle('type')}
							id="type"
							name="type"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						>
							<option value="Public">Public</option>
							<option value="Private">Private</option>
							<option value="Both">Both</option>
						</select>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="district">District:</label>
						<input
							value={state.district}
							onChange={handle('district')}
							type="text"
							id="district"
							name="district"
							placeholder="District"
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
