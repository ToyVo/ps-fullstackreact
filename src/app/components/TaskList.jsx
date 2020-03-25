import React from 'react';
import { connect} from 'react-redux';

export const TaskList = ({tasks, name, id}) => (
	<div>
		<h3>{name}</h3>
		{tasks.map(task =>
			<div key={task.id}>{task.name}</div>
		)}
	</div>
);

const mapStateToProps = (state, ownProps) => {
	return {
		name: ownProps.name,
		id: ownProps.id,
		tasks: state.tasks.filter(task => task.group === ownProps.id)
	}
};

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);
