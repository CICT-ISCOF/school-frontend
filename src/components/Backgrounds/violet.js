import React, { Component } from 'react';

export default class Violet extends Component {
	key;

	constructor(props) {
		super(props);
		this.state = {
			mode: 'default',
		};
	}

	componentDidMount() {
		this.start();
	}

	componentWillUnmount() {
		clearInterval(this.key);
	}

	start() {
		this.key = setInterval(
			() =>
				this.setState({
					mode: this.state.mode === 'primary' ? 'default' : 'primary',
				}),
			10000
		);
	}

	render() {
		return (
			<div className={`shape shape-style-3 shape-${this.state.mode}`}>
				<span className="span-150"></span>
				<span className="span-50"></span>
				<span className="span-50"></span>
				<span className="span-75"></span>
				<span className="span-100"></span>
				<span className="span-75"></span>
				<span className="span-50"></span>
				<span className="span-100"></span>
				<span className="span-50"></span>
				<span className="span-100"></span>
			</div>
		);
	}
}
