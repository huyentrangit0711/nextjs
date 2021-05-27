import Head from 'next/head';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { connectDatabase, findDocument } from '../helpers/db-utils';

function HomePage(props) {
	return (
		<div>
			<Head>
				<title>NextJS Events</title>
				<meta
					name="description"
					content="Find a lot of great events that allow you to evolve..."
				/>
			</Head>
			<NewsletterRegistration />
			<EventList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const client = await connectDatabase();
	const featuredEvents = await findDocument(client, 'events', {
		isFeatured: true,
	});
	return {
		props: {
			events: JSON.parse(JSON.stringify(featuredEvents)),
		},
		revalidate: 1,
	};
}

export default HomePage;
