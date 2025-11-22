import React, { useEffect } from 'react';
import { logout } from '../utils/auth';

export default function Logout({ onLoggedOut }) {
	useEffect(() => {
		logout();
		if (onLoggedOut) onLoggedOut();
		else window.location.reload();
	}, [onLoggedOut]);

	return (
		<div style={{ padding: 20 }}>
			<h2>Logging out…</h2>
			<p>If you are not redirected, <button onClick={() => { logout(); if (onLoggedOut) onLoggedOut(); else window.location.reload(); }}>click here</button>.</p>
		</div>
	);
}
