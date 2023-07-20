import React, { useEffect, useState } from 'react';
import './App.css';
import WelcomeTabs from './components/WelcomeTabs/WelcomeTabs';
import websocket from './controllers/ws';
import Dashboard from './components/Dashboard/Dashboard';
import { UserContext } from './contexts/userContext';

const App = () => {
	let hasConnected = false;

	const [user, setUser] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [token, setToken] = useState('');

	useEffect(() => {
		const stringifyUser = window.localStorage.getItem('user');
		const token = window.localStorage.getItem('token');

		if (stringifyUser) {
			const user = JSON.parse(stringifyUser);
			setUser(user);
			setToken(token);

			if (!hasConnected) {
				hasConnected = true;
				websocket.connect(user.id, user.chatid, user.username);
			}
		}
	}, []);

	const handleLogin = ({ user, token }) => {
		setUser(user);
		setToken(token);

		window.localStorage.setItem('user', JSON.stringify(user));
		window.localStorage.setItem('token', token);

		websocket.connect(user.id, user.chatid, user.username);
	};

	return (
		<div className='app-wrapper'>
			<UserContext.Provider value={user}>
				<div className='app'>
					{user !== null ? <Dashboard/> : <WelcomeTabs handleLogin={handleLogin}/>}
				</div>
			</UserContext.Provider>
		</div>
	);
};

export default App;