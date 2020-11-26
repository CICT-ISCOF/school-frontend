import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import state from '../../state';

export default class Card extends Component {
	key = -1;

	constructor(props) {
		super(props);
		this.state = {
			user: state.get('user'),
			logged: state.has('user'),
		};
	}

	componentDidMount() {
		this.key = state.listen('user', (user) => {
			this.setState({ logged: state.has('user'), user });
		});
	}

	componentWillUnmount() {
		state.removeListener('user', this.key);
	}

	render() {
		const {
			ProfilePicture,
			name,
			address,
			district,
			province,
			phone,
			email,
			website,
			id,
			UserId,
			// CoverPhoto,
		} = this.props.school;
		const rating = Number(this.props.rating ? this.props.rating : 0);
		return (
			<div className='col-sm-12 col-md-6 col-lg-6 p-3'>
				<div className='card shadow-sm'>
					{/* <img
						className="card-img-top"
						src={CoverPhoto.uri}
						alt={`${name} Cover`}
					/> */}
					<div className='card-body'>
						<div className='d-flex'>
							<img
								className='img-fluid rounded-circle shadow'
								height='80'
								width='80'
								src={ProfilePicture.uri}
								alt={`${name} Profile`}
							/>
							{this.state.logged &&
							(this.state.user.type === 'Admin' ||
								Number(this.state.user.id) ===
									Number(UserId)) ? (
								<div className='d-flex ml-auto'>
									<div className='d-inline align-self-center'>
										<Link
											to={`/schools/${id}/edit`}
											className='btn btn-icon-only rounded-circle btn-sm btn-warning'
										>
											<i className='fas fa-edit'></i>
										</Link>
									</div>
								</div>
							) : null}
						</div>
						<h4 className='card-title mt-2'>
							<Link to={`/schools/${id}`}>{name}</Link>
						</h4>
						<p className='card-text my-0'>
							Rating:{' '}
							{rating.isInteger() ? rating : rating.toFixed(1)}
						</p>
						<Link
							className='btn btn-sm btn-secondary my-1'
							to={`/schools/${id}/rate`}
						>
							Rate
						</Link>
						<p className='card-text d-none d-sm-block my-0'>
							Province of {' ' + province}
						</p>
						<p className='card-text d-none d-sm-block my-0'>
							District {' ' + district}
						</p>
						<p className='card-text my-0'>{email}</p>
						<p className='card-text my-0'>{phone}</p>
						<p className='card-text d-none d-sm-block my-0'>
							{website}
						</p>
						<p className='card-text my-0'>{address}</p>
					</div>
				</div>
			</div>
		);
	}
}
