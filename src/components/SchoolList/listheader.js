import React, { Component } from 'react';
import state from '../../state';

export default class ListHeader extends Component {
	key = -1;

	constructor(props) {
		super(props);
		this.state = {
			query: '',
			logged: state.has('user'),
		};
	}

	componentDidMount() {
		this.key = state.listen('user', () =>
			this.setState({ logged: state.has('user') })
		);
	}

	componentWillUnmount() {
		state.removeListener('user', this.key);
	}

	render() {
		const { setMode, mode, refreshing, search } = this.props;
		return (
			<div className="row mb-2">
				<div className="col-sm-12 col-md-8 d-flex my-2">
					<div className="align-self-center">Filters:</div>
					<button
						className={`btn btn-warning btn-sm ml-2 ${
							mode === 'all' ? 'active' : ''
						}`}
						onClick={(e) => setMode('all')}
					>
						All
					</button>
					<button
						className={`btn btn-primary btn-sm ${
							this.state.mode === 'public' ? 'active' : ''
						}`}
						onClick={(e) => setMode('public')}
					>
						Public
					</button>
					<button
						className={`btn btn-info btn-sm ${
							mode === 'private' ? 'active' : ''
						}`}
						onClick={(e) => setMode('private')}
					>
						Private
					</button>
					{this.state.logged ? (
						<button
							className="btn btn-success btn-sm"
							onClick={() =>
								this.props.history.push('/schools/add')
							}
						>
							Add School
						</button>
					) : null}
				</div>
				<div className="col-sm-12 col-md-4 d-flex my-2">
					<input
						className={`form-control form-control-sm ml-auto ${
							refreshing ? 'disabled' : ''
						}`}
						onChange={(e) => {
							e.preventDefault();
							this.setState({
								query: e.target.value,
							});
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								search(this.state.query);
							}
						}}
						placeholder="Search"
						type="text"
						disabled={refreshing}
					/>
				</div>
			</div>
		);
	}
}
