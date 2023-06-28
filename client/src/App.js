import React, { useEffect, useState } from 'react';
import './App.css';
import WelcomeTabs from './components/WelcomeTabs/WelcomeTabs';
import websocket from './controllers/ws';

const App = () => {
	const [user, setUser] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [token, setToken] = useState('');

	useEffect(() => {
		const stringifyUser = window.localStorage.getItem('user');
		const token = window.localStorage.getItem('token');
        
		if (stringifyUser) {
			setUser(JSON.parse(stringifyUser));
			setToken(token);
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
			<div className='app'>
				{user ? <div>Hello</div> : <WelcomeTabs handleLogin={handleLogin}/>}
			</div>
		</div>
	);
};

export default App;