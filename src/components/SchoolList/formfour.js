import React, { Component } from 'react';

export default class FormThree extends Component {
	render() {
		const { state, handle, processing } = this.props;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<label htmlFor="curricular_program">
							Curricular Program:
						</label>
						<textarea
							value={state.curricular_program}
							onChange={handle('curricular_program')}
							id="curricular_program"
							name="curricular_program"
							placeholder="Curricular Program"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						></textarea>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label htmlFor="mission">Mission:</label>
						<textarea
							value={state.mission}
							onChange={handle('mission')}
							id="mission"
							name="mission"
							placeholder="Mission"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						></textarea>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label htmlFor="vision">Vision:</label>
						<textarea
							value={state.vision}
							onChange={handle('vision')}
							id="vision"
							placeholder="Vision"
							name="vision"
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						></textarea>
					</div>
				</div>
			</div>
		);
	}
}
