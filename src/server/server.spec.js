import {addNewTask, updateTask} from './server';

(async function testServer() {
	await addNewTask({
		name: 'My Task',
		id: '123456'
	});

	await updateTask({
		id: '123456',
		isComplete: false,
		group: 'U1',
		name: 'Updated Task'
	});
})();



