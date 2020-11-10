import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import Register from './components/Register';
import SchoolList from './components/SchoolList';
import SchoolShow from './components/SchoolList/show';
import SchoolForm from './components/SchoolList/form';
import DegreeForm from './components/Degree/form';
import CourseForm from './components/Course/form';
import NonHEForm from './components/NonHE/form';
import MajorForm from './components/Major/form';
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

let handle;

const start = () => {
	handle = setInterval(() => {
		Axios.get(`${process.env.REACT_APP_BACKEND_URL}/schools`)
			.then((response) => state.set('schools', response.data))
			.catch(() => {});
	}, 30000);
};

const stop = () => {
	clearInterval(handle);
};

export default class App extends Component {
	handle = null;

	componentDidMount() {
		Axios.interceptors.response.use((response) => {
			if (response.status === 401 || response.status === 403) {
				state.clear();
				window.location.href = '/';
			}
			return response;
		});
		start();
	}

	componentWillUnmount() {
		stop();
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/users' component={User} />
					<Route exact path='/schools/add' component={SchoolForm} />
					<Route
						exact
						path='/schools/:id/edit'
						component={SchoolForm}
					/>
					<Route exact path='/schools/:id' component={SchoolShow} />
					<Route
						exact
						path='/schools/:id/degrees/add'
						component={DegreeForm}
					/>
					<Route
						exact
						path='/schools/:id/degrees/:degreeId/edit'
						component={DegreeForm}
					/>

					<Route
						exact
						path='/schools/:id/degrees/:degreeId/courses/add'
						component={CourseForm}
					/>
					<Route
						exact
						path='/schools/:id/degrees/:degreeId/courses/:courseId/edit'
						component={CourseForm}
					/>
					<Route
						exact
						path='/schools/:id/degrees/:degreeId/courses/:courseId/majors/add'
						component={MajorForm}
					/>
					<Route
						exact
						path='/schools/:id/degrees/:degreeId/courses/:courseId/majors/:majorId/edit'
						component={MajorForm}
					/>
					<Route
						exact
						path='/schools/:id/non-he/add'
						component={NonHEForm}
					/>
					<Route
						exact
						path='/schools/:id/non-he/:nonHEId/edit'
						component={NonHEForm}
					/>
					<Route path='/schools' exact component={SchoolList} />
					<Route path='/register' exact component={Register} />
					<Route component={FZF} />
				</Switch>
			</Router>
		);
	}
}
