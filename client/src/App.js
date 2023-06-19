import React from 'react';
import './App.css';
import WelcomeTabs from './components/WelcomeTabs/WelcomeTabs';

const App = () => {
	return (
		<div className='chatroom-container'>
			<div className='chatroom'>
				<WelcomeTabs/>
			</div>
		</div>
	);
};

export default App;