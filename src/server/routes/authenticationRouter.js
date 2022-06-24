import uuid from 'uuid';
import md5 from 'md5';
import {connectDB} from '../db';
import {assembleUserState} from '../util';
import express from 'express'

const authenticationTokens = [];

export const authenticationRouter = () => {
	const router = express.Router();
	router.post('/', async(req, res) => {
		let {username, password} = req.body;
		let db = await connectDB();
		let collection = db.collection('users');
		let user = await collection.findOne({name: username});

		if(!user) {
			return res.status(500).send('user not found');
		}

		let hash = md5(password);
		let passwordCorrect = hash === user.passwordHash;

		if(!passwordCorrect) {
			return res.status(500).send('password incorrect');
		}

		let token = uuid();
		authenticationTokens.push({
			token, userID: user.id
		});

		let state = await assembleUserState(user);
		res.send({token, state});
	});
	return router;
};
