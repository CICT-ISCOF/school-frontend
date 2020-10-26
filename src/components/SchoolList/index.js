import React, { Component } from 'react';
import './index.scss';
import Axios from 'axios';
import toastr from 'toastr';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Card from './card';
import state from '../../state';
import Violet from '../Backgrounds/violet';
import ListHeader from './listheader';
import Refresher from './refresher';

export default class SchoolList extends Component {
	url = '/schools';
	key = -1;

	constructor(props) {
		super(props);
		this.state = {
			schools: state.has('schools') ? state.get('schools') : [],
			refreshing: false,
			mode: 'all',
		};
	}

	componentDidMount() {
		this.refresh();
		this.key = state.listen('schools', (schools) => {
			this.setState({
				schools,
			});
		});
	}

	componentWillUnmount() {
		state.removeListener('schools', this.key);
	}

	refresh(params = '', isSearch = false) {
		this.setState({ refreshing: true });
		Axios.get(this.url + params)
			.then((response) => response.data)
			.then((schools) => {
				if (isSearch) {
					return this.setState({ schools });
				}
				state.set('schools', schools);
			})
			.catch((error) => {
				console.log(error);
				toastr.error('Unable to fetch schools.');
			})
			.finally(() => this.setState({ refreshing: false }));
	}

	search(query) {
		this.refresh('/search?name=' + query, true);
	}

	mapAll() {
		return this.state.schools.map((school, index) => (
			<Card key={index} school={school} />
		));
	}

	mapCustom(key = 'Both') {
		return this.state.schools
			.filter((school) => school.type === key || school.type === 'Both')
			.map((school, index) => <Card key={index} school={school} />);
	}

	setMode(mode) {
		this.setState({ mode });
	}

	render() {
		let list;
		switch (this.state.mode) {
			case 'all':
				list = this.mapAll();
				break;
			case 'public':
				list = this.mapCustom('Public');
				break;
			case 'private':
				list = this.mapCustom('Private');
				break;
			default:
				list = this.mapAll();
				break;
		}
		return (
			<div className="landing-page">
				<Navbar />
				<div className="section section-hero section-shaped">
					<Violet />
					<div className="page-header">
						<div className="container shape-container d-flex align-items-center py-lg">
							<div className="col px-0">
								<div className="row align-items-center justify-content-center">
									<div className="col-sm-12">
										<div className="rounded bg-white w-100 h-100 shadow">
											<div className="container pt-3">
												<Refresher
													refresh={this.refresh.bind(
														this
													)}
													refreshing={
														this.state.refreshing
													}
												/>
												<hr className="mt-0 mb-3" />
												<ListHeader
													setMode={this.setMode.bind(
														this
													)}
													mode={this.state.mode}
													refreshing={
														this.state.refreshing
													}
													search={this.search.bind(
														this
													)}
													history={this.props.history}
												/>
												<div className="row">
													{list.length > 0 ? (
														list
													) : (
														<div className="col-sm-12 text-center py-3">
															<h2>No Results</h2>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="separator separator-bottom separator-skew zindex-100">
						<svg
							x="0"
							y="0"
							viewBox="0 0 2560 100"
							preserveAspectRatio="none"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polygon
								className="fill-white"
								points="2560 0 2560 100 0 100"
							></polygon>
						</svg>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
