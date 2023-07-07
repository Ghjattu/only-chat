import React from 'react';
import './ChatDashboard.css';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

const ChatDashboard = ({ user }) => {
	return (
		<div className='chat-dashboard'>
			<Sidebar user={user}/>
			<Main/>
		</div>
	);
};

export default ChatDashboard;