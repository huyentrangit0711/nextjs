import Link from 'next/link';
const MainNavigationTailwind = () => {
	return (
		<div>
			<nav className="bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Link href="/">
									<img
										className="h-8 w-8"
										src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
										alt="Workflow"
									/>
								</Link>
							</div>
							<div className="hidden md:block">
								<div className="ml-10 flex items-baseline space-x-4">
									<Link href="/events">
										<a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
											Browse All Events
										</a>
									</Link>
									<Link href="/log-in">
										<a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
											Login
										</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};
export default MainNavigationTailwind;
