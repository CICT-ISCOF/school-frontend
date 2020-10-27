import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SchoolList from './components/SchoolList';
import SchoolShow from './components/SchoolList/show';
import SchoolForm from './components/SchoolList/form';
import DegreeForm from './components/Degree/form';
import NonHEForm from './components/NonHE/form';
import FZF from './components/404';
import Axios from 'axios';
import state from './state';

Axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
Axios.defaults.headers.common['Accept'] = 'application/json';
Axios.defaults.headers.common['Authorization'] = `Bearer ${state.get('token')}`;
state.listen('token', (token) => {
	if (!token) {
		delete Axios.defaults.headers.common['Authorization'];
	}
	Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
});

export default class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route exact path="/schools/add" component={SchoolForm} />
					<Route
						exact
						path="/schools/:id/edit"
						component={SchoolForm}
					/>
					<Route exact path="/schools/:id" component={SchoolShow} />
					<Route
						exact
						path="/schools/:id/degrees/add"
						component={DegreeForm}
					/>
					<Route
						exact
						path="/schools/:id/degrees/:degreeId/edit"
						component={DegreeForm}
					/>
					<Route
						exact
						path="/schools/:id/non-he/add"
						component={NonHEForm}
					/>
					<Route
						exact
						path="/schools/:id/non-he/:nonHEId/edit"
						component={NonHEForm}
					/>
					<Route path="/schools" component={SchoolList} />
					<Route path="/register" component={Register} />
					<Route component={FZF} />
				</Switch>
			</Router>
		);
	}
}
