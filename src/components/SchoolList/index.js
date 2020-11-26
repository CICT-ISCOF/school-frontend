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
import Pagination from '../pagination';

export default class SchoolList extends Component {
	url = '/schools';
	key = -1;

	constructor(props) {
		super(props);

		const query = new URLSearchParams(this.props.location.search);

		this.state = {
			schools: state.has('schools') ? state.get('schools') : [],
			refreshing: false,
			mode: 'all',
			list: 'all', // all | search
			page: Number(query.get('page')) || 1,
			ratings: [],
		};
	}

	componentDidMount() {
		this.refresh();
		this.key = state.listen('schools', (schools) => {
			if (this.state.list === 'all') {
				this.setState({
					schools,
				});
			}
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
				const ratings = this.state.ratings;
				schools.forEach(() => ratings.push(0));
				schools.forEach(async (school, index) => {
					const ratings = this.state.ratings;
					const response = await Axios.get(`/rating?id=${school.id}`);
					ratings[index] = response.data.total;
					this.setState({ ratings });
				});
				this.setState({ list: 'all' });
				state.set('schools', schools);
			})
			.catch((error) => {
				console.log(error);
				toastr.error('Unable to fetch schools.');
			})
			.finally(() => this.setState({ refreshing: false }));
	}

	search(query) {
		this.setState({ list: 'search' });
		this.refresh('/search?name=' + query, true);
	}

	mapAll() {
		return this.state.schools.map((school, index) => (
			<Card
				key={index}
				school={school}
				rating={this.state.ratings[index]}
			/>
		));
	}

	mapCustom(key = 'Both') {
		return this.state.schools
			.filter((school) => school.type === key || school.type === 'Both')
			.map((school, index) => (
				<Card
					key={index}
					school={school}
					rating={this.state.ratings[index]}
				/>
			));
	}

	setMode(mode) {
		this.setState({ mode });
	}

	paginate(page) {
		this.setState({ page });
	}

	render() {
		let items;
		switch (this.state.mode) {
			case 'all':
				items = this.mapAll();
				break;
			case 'public':
				items = this.mapCustom('Public');
				break;
			case 'private':
				items = this.mapCustom('Private');
				break;
			default:
				this.setState({ mode: 'all' });
				items = this.mapAll();
				break;
		}

		const page = this.state.page;
		const list = [];
		const limit = 10;
		const offset = (page - 1) * limit;

		for (let count = offset; count < offset + limit; count++) {
			if (typeof items[count] !== 'undefined') {
				list.push(items[count]);
			}
		}

		return (
			<div className='landing-page'>
				<Navbar />
				<div className='section section-hero section-shaped'>
					<Violet />
					<div className='page-header'>
						<div className='container shape-container d-flex align-items-center py-lg'>
							<div className='col px-0'>
								<div className='row align-items-center justify-content-center'>
									<div className='col-sm-12'>
										<div className='rounded bg-white w-100 h-100 shadow'>
											<div className='container py-3'>
												<Refresher
													refresh={this.refresh.bind(
														this
													)}
													refreshing={
														this.state.refreshing
													}
												/>
												<hr className='mt-0 mb-3' />
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
												<Pagination
													url={
														this.props.history
															.location.pathname
													}
													current={page}
													limit={limit}
													total={items.length}
													change={this.paginate.bind(
														this
													)}
												>
													<div className='row'>
														{list.length > 0 ? (
															list
														) : (
															<div className='col-sm-12 text-center py-3'>
																<h2>
																	No Results
																</h2>
															</div>
														)}
													</div>
												</Pagination>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='separator separator-bottom separator-skew zindex-100'>
						<svg
							x='0'
							y='0'
							viewBox='0 0 2560 100'
							preserveAspectRatio='none'
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
						>
							<polygon
								className='fill-white'
								points='2560 0 2560 100 0 100'
							></polygon>
						</svg>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
