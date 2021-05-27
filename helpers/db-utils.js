import { MongoClient } from 'mongodb';
const DATABASE_URL =
	'mongodb+srv://TTHT0711janet:9K0MMnp7QThTafpY@cluster0.hkhoh.mongodb.net/events?retryWrites=true&w=majority';

export async function connectDatabase() {
	const client = await MongoClient.connect(DATABASE_URL);
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
