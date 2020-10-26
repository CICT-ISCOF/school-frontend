import React, { Component } from 'react';

export default class Dark extends Component {
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
			<div
				className={`shape shape-style-1 bg-gradient-${this.state.mode}`}
			>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		);
	}
}
