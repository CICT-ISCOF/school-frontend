import React, { Component } from 'react';
import state from '../../state';

export default class Profile extends Component {
	key = -1;

	constructor(props) {
		super(props);
		this.state = {
			user: state.get('user'),
			logged: state.has('user'),
		};
	}

	componentDidMount() {
		this.key = state.listen('user', (user) =>
			this.setState({ user, logged: state.has('user') })
		);
	}

	componentWillUnmount() {
		state.removeListener('user', this.key);
	}

	render() {
		const {
			name,
			address,
			province,
			district,
			type,
			phone,
			email,
			website,
			curricular_program,
			mission,
			vision,
		} = this.props.profile;
		return (
			<div>
				<div
					className={`text-center ${this.state.logged ? '' : 'mt-5'}`}
				>
					<h3>{name}</h3>
					<div className="h6 font-weight-300">{address}</div>
					<div>
						Province of {province} - District {district}
					</div>
					<div>
						School Type:
						{' ' + type}
					</div>
					<div>{phone}</div>
					<div>{email}</div>
					<a href={website}>{website}</a>
					<div className="mt-4">
						<h5>Mission</h5>
						<p>{mission}</p>
					</div>
					<div>
						<h5>Vision</h5>
						<p>{vision}</p>
					</div>
				</div>
				<div className="mt-5 py-5 border-top text-center">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<p>{curricular_program}</p>
							<a href={website}>Visit Website</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
