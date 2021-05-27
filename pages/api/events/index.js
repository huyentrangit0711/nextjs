import { connectDatabase, getDocuments } from '../../../helpers/db-utils';

async function handler(req, res) {
	console.log('api/events called');
	if (req.method === 'GET') {
		let client;
		try {
			client = await connectDatabase();
		} catch (error) {
			res.status(500).json({ message: error });
			return;
		}
		const result = await getDocuments(client, 'events', {
			id: -1,
		});
		res.status(202).json({ result });
	}
}
export default handler;
