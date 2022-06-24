import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {Dashboard} from './Dashboard';
import {Route, Router} from 'react-router-dom';
import {history} from '../store/history';
import {Navigation} from './Navigation';
import {TaskDetail} from './TaskDetail';
import {Redirect} from 'react-router';
import {Login} from './Login';

const RouteGuard = Component => ({match}) => {
	console.info('Route Guard', match);
	if(store.getState().session.authenticated) {
		return <Component match={match}/>;
	} else {
		return <Redirect to='/login'/>;
	}

};

export const Main = () => (
	<Router history={history}>
		<Provider store={store}>
			<div>
				<Navigation/>
				<Route exact path='/login' component={Login}/>
				<Route exact path='/dashboard' render={RouteGuard(Dashboard)}/>
				<Route exact path='/task/:id' render={RouteGuard(TaskDetail)}/>
			</div>
		</Provider>
	</Router>
);
