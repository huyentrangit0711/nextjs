import { Fragment } from 'react';
import Head from 'next/head';
import mongoose from 'mongoose';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';
import { connectDatabase, findDocument } from '../../helpers/db-utils';

function EventDetailPage(props) {
	const event = props.selectedEvent[0];

	if (!event) {
		return (
			<div className="center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name="description" content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event._id} />
		</Fragment>
	);
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	const client = await connectDatabase();
	const eventDetail = await findDocument(client, 'events', {
		_id: mongoose.mongo.ObjectID(eventId),
	});

	return {
		props: {
			selectedEvent: JSON.parse(JSON.stringify(eventDetail)),
		},
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const client = await connectDatabase();
	const events = await findDocument(client, 'events', {
		isFeatured: true,
	});
	client.close();
	const paths = events.map((event) => ({
		params: { eventId: event._id.toString() },
	}));

	return {
		paths: paths,
		fallback: 'blocking',
	};
}

export default EventDetailPage;
