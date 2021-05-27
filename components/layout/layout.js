import { Fragment, useContext } from 'react';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';
import MainNavigationTailwind from '../layout/main-navigation-tailwind';

function Layout(props) {
	const ctx = useContext(NotificationContext);
	const { notification } = ctx;
	return (
		<Fragment>
			<MainNavigationTailwind />
			<main>{props.children}</main>
			{notification && (
				<Notification
					title={notification.title}
					status={notification.status}
					message={notification.message}
				/>
			)}
		</Fragment>
	);
}

export default Layout;
