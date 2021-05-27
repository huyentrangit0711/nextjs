import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getDocuments, connectDatabase } from '../../helpers/db-utils';
function AllEventsPage(props) {
	const router = useRouter();
	const { events } = props;

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	}

	return (
		<Fragment>
			<Head>
				<title>All my events</title>
			</Head>
			<Head>
				<title>All Events</title>
				<meta
					name="description"
					content="Find a lot of great events that allow you to evolve..."
				/>
			</Head>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
}

export async function getStaticProps({ req }) {
	const client = await connectDatabase();
	const events = await getDocuments(client, 'events', {
		id: -1,
	});

	return {
		props: {
			events: JSON.parse(JSON.stringify(events)),
		},
		revalidate: 60,
	};
}

export default AllEventsPage;
