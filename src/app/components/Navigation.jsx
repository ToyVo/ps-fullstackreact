import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import React from 'react';
import * as mutations from '../store/mutations';
import {Username} from './Username';

const _Navigation = ({id, authenticated}) => (
	<div>
		<Link to='/dashboard'>
			<h1>My Application</h1>
		</Link>
		{authenticated ?
			<h4>Welcome, <Username id={id}/>!</h4>
			: null
		}
	</div>
);

const mapStateToProps = ({session}) => ({
	id: session.id,
	authenticated: session.authenticated === mutations.AUTHENTICATED
});

export const Navigation = connect(mapStateToProps)(_Navigation);
