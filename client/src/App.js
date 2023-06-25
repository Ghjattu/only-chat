import React, { useState } from 'react';
import './App.css';
import WelcomeTabs from './components/WelcomeTabs/WelcomeTabs';

const App = () => {
	const [user, setUser] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [token, setToken] = useState('');

	const handleLogin = (data) => { 
		setUser(data.user);
		setToken(data.token);
	};

	return (
		<div className='app-wrapper'>
			<div className='app'>
				{user ? <p>Hello</p> : <WelcomeTabs handleLogin={handleLogin}/>}
			</div>
		</div>
	);
};

export default App;