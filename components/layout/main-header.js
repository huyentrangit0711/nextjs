import Link from 'next/link';

import classes from './main-header.module.css';
import MainNavigationTailwind from './main-navigation-tailwind';

function MainHeader() {
	return (
		<header className={classes.header}>
			<MainNavigationTailwind />
			<div className={classes.logo}>
				<Link href="/">NextEvents</Link>
			</div>
			<nav className={classes.navigation}>
				<ul>
					<li>
						<Link href="/events">Browse All Events</Link>
					</li>
					<li>
						<Link href="/events">Browse All Events</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;
