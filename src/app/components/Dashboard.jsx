import React from 'react';
import { connect} from 'react-redux';
import {TaskList} from './TaskList';

const _Dashboard = ({groups}) => (
	<div>
		<h2>DashBoard</h2>
		{groups.map(group =>
			<TaskList key={group.id} id={group.id} name={group.name}/>
		)}
	</div>
);

const mapStateToProps = (state) => {
	return {
		groups: state.groups
	}
};

export const Dashboard = connect(mapStateToProps)(_Dashboard);
