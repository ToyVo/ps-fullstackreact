import {addNewTask, updateTask} from '../util';
import express from 'express';

export const tasksRouter = () => {
	const router = express.Router();
	router.post('/new', async(req, res) => {
		let task = req.body.task;
		await addNewTask(task);
		res.status(200).send();
	});

	router.post('/update', async(req, res) => {
		let task = req.body.task;
		await updateTask(task);
		res.status(200).send();
	});
	return router;
};
