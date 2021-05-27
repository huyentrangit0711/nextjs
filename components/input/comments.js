import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
	const [showComments, setShowComments] = useState(false);
	const [listComments, setListComments] = useState([]);
	const [isFetchingComment, setIsFetchingComment] = useState(false);
	const notificationCtx = useContext(NotificationContext);
	const { eventId } = props;
	useEffect(() => {
		if (showComments) {
			setIsFetchingComment(true);
			fetch('/api/comments/' + eventId)
				.then((response) => {
					console.log('response', response);
					if (!response.ok) {
						// throw new Error('Something went wrong!');
					}
					// return response.json().then((data) => {
					// 	throw new Error(data.message || 'Something went wrong!');
					// });
					return response.json();
				})
				.then((data) => {
					setIsFetchingComment(false);
					console.log(data);
					// data.comment ? setListComments(data.comment) : setListComments([]);
				});
		}
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	function addCommentHandler(commentData) {
		const sentData = {
			...commentData,
			eventId,
		};
		fetch('/api/comments/' + eventId, {
			method: 'POST',
			body: JSON.stringify(sentData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}

				return response.json().then((data) => {
					throw new Error(data.message || 'Something went wrong!');
				});
			})
			.then((data) => {
				notificationCtx.showNotification({
					title: 'Success!',
					message: 'Your comment was saved!',
					status: 'success',
				});
			})
			.catch((error) => {
				// show error status
				notificationCtx.showNotification({
					title: 'Error!',
					status: 'error',
					message: error.message | 'Something went wrong!',
				});
			});
		// send data to API
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{isFetchingComment && <p>Loading...</p>}
			{showComments && !isFetchingComment && listComments.length > 0 && (
				<CommentList comments={listComments} />
			)}
		</section>
	);
}

export default Comments;
