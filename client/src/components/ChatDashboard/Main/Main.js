import React from 'react';
import './Main.css';
import StatusBar from './StatusBar/StatusBar';
import ChatTab from './ChatTab/ChatTab';

const Main = () => {
	return (
		<div className='main-wrapper'>
			<StatusBar/>
			<ChatTab/>
		</div>
	);
};

export default Main;