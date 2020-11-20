import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Information extends Component {
	render() {
		return (
			<li className='nav-item dropdown'>
				<a
					href='/'
					className='nav-link'
					data-toggle='dropdown'
					onClick={(e) => e.preventDefault()}
					role='button'
				>
					<i className='ni ni-ui-04 d-lg-none'></i>
					<span className='nav-link-inner--text'>Information</span>
				</a>
				<div className='dropdown-menu dropdown-menu-xl'>
					<div className='dropdown-menu-inner'>
						<Link
							to='/schools'
							className='media d-flex align-items-center'
						>
							<div className='icon icon-shape bg-gradient-primary rounded-circle text-white'>
								<i className='ni ni-spaceship'></i>
							</div>
							<div className='media-body ml-3'>
								<h6 className='heading text-primary mb-md-1'>
									Looking for a School?
								</h6>
								<p className='description d-none d-md-inline-block mb-0'>
									Looking for suitable schools now made
									easier.
								</p>
							</div>
						</Link>
						<a href='/' className='media d-flex align-items-center'>
							<div className='icon icon-shape bg-gradient-success rounded-circle text-white'>
								<i className='ni ni-palette'></i>
							</div>
							<div className='media-body ml-3'>
								<h6 className='heading text-primary mb-md-1'>
									Foundation
								</h6>
								<p className='description d-none d-md-inline-block mb-0'>
									The foundations of schools in one.
								</p>
							</div>
						</a>
						<a href='/' className='media d-flex align-items-center'>
							<div className='icon icon-shape bg-gradient-warning rounded-circle text-white'>
								<i className='ni ni-ui-04'></i>
							</div>
							<div className='media-body ml-3'>
								<h5 className='heading text-warning mb-md-1'>
									Interactive
								</h5>
								<p className='description d-none d-md-inline-block mb-0'>
									Lorem ipsum dolor, sit amet consectetur
									adipisicing elit. Debitis dolor esse amet
									ullam doloremque, facere facilis.
								</p>
							</div>
						</a>
					</div>
				</div>
			</li>
		);
	}
}
