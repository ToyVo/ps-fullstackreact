import {put, take} from 'redux-saga/effects';
import * as mutations from './mutations';
import uuid from 'uuid';
import axios from 'axios';
import {history} from './history';

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8888';

export function* taskCreationSaga() {
	while(true) {
		const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
		const ownerID = 'U1';
		const taskID = uuid();
		let mutation = mutations.createTask(taskID, groupID, ownerID);
		yield axios.post(`${url}/task/new`, {
			task: {
				id: taskID,
				group: groupID,
				owner: ownerID,
				isComplete: false,
				name: 'New task'
			}
		});
		yield put(mutation);
	}
}

export function* commentCreationSaga() {
	while(true) {
		const {taskID, content} = yield take(mutations.REQUEST_COMMENT_CREATION);
		const ownerID = 'U1';
		const commentID = uuid();
		let mutation = mutations.createComment(commentID, taskID, ownerID, content);
		yield axios.post(`${url}/comment/new`, {
			comment: {
				id: commentID,
				owner: ownerID,
				task: taskID,
				content
			}
		});
		yield put(mutation);
	}
}

export function* taskModificationSaga() {
	while(true) {
		const task = yield take([
			mutations.SET_TASK_NAME,
			mutations.SET_TASK_GROUP,
			mutations.SET_TASK_COMPLETE
		]);
		yield axios.post(`${url}/task/update`, {
			task: {
				id: task.taskID,
				group: task.groupID,
				owner: task.ownerID,
				isComplete: task.isComplete,
				name: task.name
			}
		});
	}
}

export function* userAuthenticationSaga() {
	while(true) {
		const {username, password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
		try {
			const {data} = yield axios.post(`${url}/authenticate`, {username, password});
			if(!data) {
				throw new Error();
			}
			console.log('Authenticated', data);
			yield put(mutations.setState(data.state))
			yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED))
			history.push('/dashboard')
		} catch(e) {
			console.log(`can't authenticate`);
			yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
		}
	}
}
