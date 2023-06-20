import React from 'react';
import './App.css';
import WelcomeTabs from './components/WelcomeTabs/WelcomeTabs';

const App = () => {
	return (
		<div className='app-wrapper'>
			<div className='app'>
				<WelcomeTabs/>
			</div>
		</div>
	);
};

export default App;