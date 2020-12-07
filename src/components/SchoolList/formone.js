import React, { Component } from 'react';

export default class FormOne extends Component {
	render() {
		const { state, handle, processing } = this.props;
		return (
			<div className='row'>
				<div className='col-md-4'>
					<div className='form-group'>
						<label htmlFor='region'>Region:</label>
						<select
							value={state.region}
							onChange={handle('region')}
							name='region'
							id='region'
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						>
							{[
								'National Capital Region - NCR',
								'Region I -  Ilocos Region',
								'Region II -  Cagayan Valley',
								'Region III -  Central Luzon',
								'Region IV -  CALABARZON',
								'MIMAROPA',
								'Region V -  Bicol Region',
								'Region VI -  Western Visayas',
								'Region VII -  Central Visayas',
								'Region VII -  Eastern Visayas',
								'Region IX -  Zamboanga Peninsula',
								'Region X -  Northern Mindanao',
								'Region XI -  Davao Region',
								'Region XII -  SOCCSKSARGEN',
								'CARAGA',
								'Cordillera Administrative Region (CAR)',
								'Negros Island Region (NIR)',
							].map((region, index) => (
								<option value={region} key={index}>
									{region}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='col-md-4'>
					<div className='form-group'>
						<label htmlFor='type'>Type:</label>
						<select
							value={state.type}
							onChange={handle('type')}
							id='type'
							name='type'
							className={`form-control form-control-alternative form-control-sm ${
								processing ? 'disabled' : ''
							}`}
							disabled={processing}
						>
							<option value='Public'>Public</option>
							<option value='Private'>Private</option>
							<option value='Both'>Both</option>
						</select>
					</div>
				</div>
				<div className='col-md-4'>
					<div className='form-group'>
						<label htmlFor='district'>District:</label>
						<input
							value={state.district}
							onChange={handle('district')}
							type='text'
							id='district'
							name='district'
							placeholder='District'
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
