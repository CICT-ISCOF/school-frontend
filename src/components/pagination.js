import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: Number(this.props.current),
		};
	}

	offset() {
		return (this.state.current - 1) * this.props.limit;
	}

	total() {
		return Math.ceil(this.props.total / this.props.limit);
	}

	previousPage() {
		return this.state.current - 1;
	}

	nextPage() {
		return this.state.current + 1;
	}

	previousPageURL() {
		return `${this.props.url}?page=${this.previousPage()}`;
	}

	nextPageURL() {
		return `${this.props.url}?page=${this.nextPage()}`;
	}

	hasPreviousPage() {
		return this.previousPage() >= 1;
	}

	hasNextPage() {
		return this.nextPage() <= this.total();
	}

	makeUrl(page) {
		return `${this.props.url}?page=${page}`;
	}

	change(page) {
		this.props.change(page);
		this.setState({ current: page });
	}

	renderLinks() {
		const links = [];
		for (let count = 1; count <= this.total(); count++) {
			links.push(
				<li
					key={count}
					className={`page-item ${
						count === this.state.current ? 'active' : ''
					}`}
				>
					<Link
						className="page-link"
						to={this.makeUrl(count)}
						onClick={(e) => this.change(count)}
					>
						{count}
					</Link>
				</li>
			);
		}
		return links;
	}

	render() {
		const pagination =
			this.state.current <= this.total() && this.total() > 1 ? (
				<nav aria-label="Page navigation example">
					<ul className="pagination pagination-sm">
						{this.hasPreviousPage() ? (
							<li className="page-item">
								<Link
									className="page-link"
									to={this.previousPageURL()}
									onClick={(e) =>
										this.change(this.previousPage())
									}
								>
									<i className="fa fa-angle-left"></i>
								</Link>
							</li>
						) : null}
						{this.renderLinks()}
						{this.hasNextPage() ? (
							<li className="page-item">
								<Link
									className="page-link"
									to={this.nextPageURL()}
									onClick={(e) =>
										this.change(this.nextPage())
									}
								>
									<i className="fa fa-angle-right"></i>
								</Link>
							</li>
						) : null}
					</ul>
				</nav>
			) : null;
		return (
			<div>
				{pagination}
				{this.props.children}
				{pagination}
			</div>
		);
	}
}
