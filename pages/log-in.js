import Head from 'next/head';
import AuthForm from '../components/auth-form/auth-form';
// import { connectDatabase, findDocument } from '../helpers/db-utils';

function AuthPage(props) {
	return (
		<div>
			<Head>
				<title>Login Page</title>
				<meta
					name="description"
					content="Find a lot of great events that allow you to evolve..."
				/>
			</Head>
			<AuthForm />
		</div>
	);
}

// export async function getStaticProps() {
// 	const client = await connectDatabase();
// 	const featuredEvents = await findDocument(client, 'events', {
// 		isFeatured: true,
// 	});
// 	return {
// 		props: {
// 			events: JSON.parse(JSON.stringify(featuredEvents)),
// 		},
// 		revalidate: 1,
// 	};
// }

export default AuthPage;
