import { useState, useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const notificationCtx = useContext(NotificationContext);
	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const createUser = async (email, password) => {
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const data = response.json();
		if (!response.ok) {
			// show error status
			notificationCtx.showNotification({
				title: 'Error!',
				status: 'error',
				message: 'Something went wrong when create users!',
			});
		}
		return data;
	};
	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(isLogin);
		if (isLogin) {
		} else {
			console.log('sssss');
			console.log('email', email);
			console.log('password', password);
			try {
				await createUser(email, password);
			} catch (error) {
				console.log(`Error when create user ${error}`);
			}
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<img
						className="mx-auto h-12 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
						alt="Workflow"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label
								htmlFor="email-address"
								className="block text-lg font-medium text-gray-900 py-2"
							>
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								ref={emailRef}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-lg font-medium text-gray-900 py-2"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								ref={passwordRef}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{isLogin ? 'Create new account' : 'Sign in'}
						</button>
						<div className="my-3 inline-flex rounded-md shadow">
							<button
								onClick={switchAuthModeHandler}
								type="submit"
								className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
							>
								{!isLogin ? 'Create new account' : 'Sign in'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default AuthForm;
