import React, { Component } from 'react';
import { ReactComponent as ArrowRepeat } from 'bootstrap-icons/icons/arrow-repeat.svg';

export default class Refresher extends Component {
	render() {
		const { refreshing, refresh } = this.props;
		return (
			<h1 className="ml-3 d-flex">
				Schools
				<ArrowRepeat
					onClick={() => refresh()}
					className={`ml-auto mr-3 align-self-center custom-icon ${
						refreshing ? 'custom-icon-spin' : ''
					}`}
				/>
			</h1>
		);
	}
}
