import {defaultState} from './defaultState';
import {MongoClient} from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/organizer';
let db = null;

export async function connectDB() {
	if(db) return db;
	let client = await MongoClient.connect(url, {useUnifiedTopology: true});
	db = client.db();
	return db;
}

/* This code initializes the database with sample users.
 Note, it does not drop the database - this can be done manually. Having code in your application that could drop your whole DB is a fairly risky choice.*/
export async function initializeDB() {
	try {
		let db = await connectDB();
		let user = await db.collection('users').findOne({id: 'U1'});
		if(!user) {
			for(let collectionName in defaultState) {
				let collection = db.collection(collectionName);
				await collection.insertMany(defaultState[collectionName]);
			}
		}
	} catch(e) {
		console.error(e);
	}

}
