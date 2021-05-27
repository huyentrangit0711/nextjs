import { hashedPassword } from '../../../helpers/auth-utils';
import { connectDatabase } from '../../../helpers/db-utils';
async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body; // email password
		console.log(data);
		const { email, password } = data;
		if (
			!email ||
			!password ||
			!email.includes('@') ||
			password.trim().length < 7
		) {
			res.status(422).json({
				message:
					'Invalid input - password should also be at least 7 characters long.',
			});
			return;
		}
		const client = await connectDatabase();
		const db = client.db();
		const hashedPassword = hashedPassword(password);
		// check exist email
		const existUser = await db.collection('users').findOne({ email });
		if (existUser) {
			res.status(422).json({
				message: 'User is exists on system',
			});
			client.close();
			return;
		}
		/// add new user
		try {
			await db.collection('users').insertOne({
				email,
				password: hashedPassword,
			});
			res.status(201).json({ message: 'Created user successful' });
		} catch (error) {
			res.status(422).json({ message: `Error in insert new user ${error}` });
		}
		client.close();
	} else {
		res.status(422).json({ message: 'Un-authorize' });
	}
}
export default handler;
