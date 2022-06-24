import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import React from 'react';

const _Navigation = () => (
	<div>
		<Link to='/dashboard'>
			<h1>My Application</h1>
		</Link>
	</div>
);

const mapStateToProps = state => state;

export const Navigation = connect(mapStateToProps)(_Navigation);
