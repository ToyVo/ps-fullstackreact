import React from 'react';
import { connect} from 'react-redux';
import {requestTaskCreation} from '../store/mutations';
import {Link} from 'react-router-dom';

const _TaskList = ({tasks, name, id, createNewTask}) => (
	<div className='card p-2 m-2'>
		<h3>{name}</h3>
		<div>
			{tasks.map(task =>
				<Link to={`/task/${task.id}`} key={task.id}>
					<div className='card p-2 mt-2'>{task.name}</div>
				</Link>
			)}
		</div>
		<button className='btn btn-primary btn-block mt-2' onClick={()=>createNewTask(id)}>New Task</button>
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
			console.log('creating new task...',id);
			dispatch(requestTaskCreation(id));
		}
	}
};

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(_TaskList);
