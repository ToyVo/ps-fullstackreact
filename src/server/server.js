import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {initializeDB} from './db';
import {authenticationRouter} from './routes/authenticationRouter';
import path from 'path';
import {tasksRouter} from './routes/tasksRouter';
import {commentRouter} from './routes/commentRouter';

(async function f() {
	await initializeDB();
	let port = process.env.PORT || 8888;
	let app = express();

	app.use(cors(), bodyParser.urlencoded({extended: true}), bodyParser.json());
	app.use('/authenticate', authenticationRouter());
	app.use('/task', tasksRouter());
	app.use('/comment', commentRouter());

	if(process.env.NODE_ENV === 'production') {
		app.use(express.static(path.resolve(__dirname, '../../dist')));
		app.get('/*', (req, res) => {
			res.sendFile(path.resolve('index.html'));
		});
	}

	app.listen(port, () => {
		console.log(`listening on port ${port}`);
	});
})();
