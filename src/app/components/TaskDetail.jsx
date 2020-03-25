import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as mutations from '../store/mutations';

const _TaskDetail = ({
						 id,
						 comments,
						 task,
						 isComplete,
						 groups,
						 setTaskCompletion,
						 setTaskGroup,
						 setTaskName
					 }) => (
	<div className='card p-3 col-6'>
		<div>
			<input className='form-control form-control-lg' onChange={setTaskName} value={task.name}/>
		</div>
		<div>
			<button className='mt-2 btn btn-primary' onClick={() => setTaskCompletion(id, !isComplete)}>{isComplete ? 'Reopen' : 'Complete'}</button>
		</div>
		<div className='mt-3'>
			<select className='form-control' onChange={setTaskGroup} value={task.group}>
				{groups.map(group => (
					<option value={group.id} key={group.id}>{group.name}</option>
				))}
			</select>
		</div>
		<div>
			<Link to='/dashboard'>
				<button className='mt-2 btn btn-primary'>Done</button>
			</Link>
		</div>
	</div>
);

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const task = state.tasks.find(task => task.id === id);
	const groups = state.groups;

	return {
		id,
		task,
		groups,
		isComplete: task.isComplete
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const id = ownProps.match.params.id;

	return {
		setTaskCompletion(id, isComplete) {
			dispatch(mutations.setTaskCompletion(id, isComplete));
		},
		setTaskGroup(e) {
			dispatch(mutations.setTaskGroup(id, e.target.value));
		},
		setTaskName(e) {
			dispatch(mutations.setTaskName(id, e.target.value));
		}
	};
};

export const TaskDetail = connect(mapStateToProps, mapDispatchToProps)(_TaskDetail);
