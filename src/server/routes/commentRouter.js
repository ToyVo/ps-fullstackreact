import {addNewComment} from '../util';
import express from 'express';

export const commentRouter = () => {
	const router = express.Router();
	router.post('/new', async(req, res) => {
		let comment = req.body.comment;
		await addNewComment(comment);
		res.status(200).send();
	});
	return router;
};
