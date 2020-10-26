import React, { Component } from 'react';

export default class FormThree extends Component {
	render() {
		const { state, handle, processing } = this.props;
		return (
			<div className="row">
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="phone">Phone:</label>
						<input
							value={state.phone}
							onChange={handle('phone')}
							type="number"
							id="phone"
							name="phone"
							placeholder="Phone"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						/>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							value={state.email}
							onChange={handle('email')}
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						/>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="website">Website:</label>
						<input
							value={state.website}
							onChange={handle('website')}
							type="text"
							id="website"
							name="website"
							placeholder="Website"
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
