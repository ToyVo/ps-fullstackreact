import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as mutations from '../store/mutations';
import {Username} from './Username';

const _TaskDetail = ({id, comments, task, isComplete, groups, setTaskCompletion, setTaskGroup, setTaskName, createNewComment}) => (
	<div className='card p-3 col-6'>
		<div>
			<input className='form-control form-control-lg' onChange={setTaskName} value={task.name}/>
		</div>
		<div>
			<button className='mt-2 btn btn-primary'
					onClick={() => setTaskCompletion(id, !isComplete)}>{isComplete ? 'Reopen' : 'Complete'}</button>
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

		<div className='card mt-2'>
			<div className="card-header">
				Comments
			</div>
			<ul className="list-group list-group-flush">
				{comments.map(comment => (
					<li className='list-group-item' value={comment.id}
						key={comment.id}>{comment.content} - <Username id={comment.owner}/></li>
				))}
			</ul>
			<form onSubmit={createNewComment}>
				<input className='form-control' type="text" placeholder='New Comment' name='comment'/>
				<button className='form-control mt-2 btn btn-primary' type='submit'>Add Comment</button>
			</form>
		</div>

	</div>
);

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const task = state.tasks.find(task => task.id === id);
	const groups = state.groups;
	const comments = state.comments.filter(comment => comment.task === task.id);

	return {
		id,
		task,
		groups,
		isComplete: task.isComplete,
		comments
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
		},
		createNewComment(e) {
			e.preventDefault();
			let comment = e.target['comment'].value;
			e.target['comment'].value = '';
			dispatch(mutations.requestCommentCreation(id, comment));
		}
	};
};

export const TaskDetail = connect(mapStateToProps, mapDispatchToProps)(_TaskDetail);
