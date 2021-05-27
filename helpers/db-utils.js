import { MongoClient } from 'mongodb';
const DATABASE_URL = `${process.env.MONGODB_URI}${process.env.MONGODB_DB}`;

export async function connectDatabase() {
	const client = await MongoClient.connect(DATABASE_URL, {
		useUnifiedTopology: true,
	});
	return client;
}

export async function insertDocument(client, collection, document) {
	const db = client.db();
	const result = await db.collection(collection).insertOne(document);
	return result;
}
export async function getDocuments(client, collection, sort) {
	const db = client.db();
	const result = await db.collection(collection).find().sort(sort).toArray();
	return result;
}
export async function findDocument(client, collection, filter) {
	const db = client.db();
	const result = await db.collection(collection).find(filter).toArray();
	return result;
}
