import React from 'react';
import { connect} from 'react-redux';
import {requestTaskCreation} from '../store/mutations';
import {Link} from 'react-router-dom';

const _TaskList = ({tasks, name, id, createNewTask}) => (
	<div>
		<h3>{name}</h3>
		<div>
			{tasks.map(task =>
				<Link to={`/task/${task.id}`} key={task.id}>
					<div>{task.name}</div>
				</Link>
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

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(_TaskList);
