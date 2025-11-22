import React, { useState } from 'react';
import { login } from '../utils/auth';

export default function Login({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		try {
			login({ email, password });
			if (onLogin) onLogin();
			else window.location.reload();
		} catch (err) {
			setError(err.message || 'Login failed');
		}
	}

	return (
		<div className="auth-form">
			<h2>Log In</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Email
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>

				{error && <div className="error">{error}</div>}

				<div>
					<button type="submit">Log In</button>
				</div>
			</form>
		</div>
	);
}
