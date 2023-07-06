import React from 'react';
import './Main.css';
import StatusBar from './StatusBar/StatusBar';
import ChatTab from './ChatTab/ChatTab';
import FriendTab from './FriendTab/FriendTab';

const Main = () => {
	return (
		<div className='main-wrapper'>
			<StatusBar/>
            
			<ChatTab/>
			<FriendTab/>
		</div>
	);
};

export default Main;