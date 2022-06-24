import React from 'react';
import { connect} from 'react-redux';
import {requestTaskCreation} from '../store/mutations';

export const TaskList = ({tasks, name, id, createNewTask}) => (
	<div>
		<h3>{name}</h3>
		<div>
			{tasks.map(task =>
				<div key={task.id}>{task.name}</div>
			)}
		</div>
		<button onClick={()=>createNewTask(id)}>New Task</button>
	</div>
);

const mapStateToProps = (state, ownProps) => {
	return {
		name: ownProps.name,
		id: ownProps.id,
		tasks: state.tasks.filter(task => task.group === ownProps.id)
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		createNewTask(id){
			console.log(`creating new task... ${id}`);
			dispatch(requestTaskCreation(id));
		}
	}
};

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);
