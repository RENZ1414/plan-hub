import React from 'react';
import { isAuthenticated, getUser } from '../utils/auth';

export default function Home() {
	const auth = isAuthenticated();
	const user = getUser();

	return (
		<div style={{ padding: 20 }}>
			<h2>Welcome to PlanHub</h2>
			{auth ? (
				<div>
					<p>Hi, {user?.email} — you're signed in.</p>
					<p>Use the navigation to manage schedules.</p>
				</div>
			) : (
				<div>
					<p>You are not signed in. Please log in to access your schedules.</p>
				</div>
			)}
		</div>
	);
}
