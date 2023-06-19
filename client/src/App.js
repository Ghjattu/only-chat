import React from 'react';
import './App.css';
import BasicTabs from './components/BasicTabs/BasicTabs';

const App = () => {
	return (
		<div className='chatroom-container'>
			<div className='chatroom'>
				<BasicTabs/>
			</div>
		</div>
	);
};

export default App;