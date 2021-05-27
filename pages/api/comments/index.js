import { connectDatabase, getDocuments } from '../../../helpers/db-utils';

async function handler(req, res) {
	if (req.method === 'GET') {
		//get all events
		let client;
		try {
			client = await connectDatabase();
		} catch (error) {
			res.status(500).json({ message: error });
			return;
		}
		try {
			const data = await getDocuments(client, 'events', { id: -1 });
			return data;
		} catch (error) {
			res.status(500).json({ message: error });
			return;
		}
	}
}
export default handler;
