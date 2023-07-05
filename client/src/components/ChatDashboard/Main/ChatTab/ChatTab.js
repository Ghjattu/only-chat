import React from 'react';
import './ChatTab.css';
import ChatList from './ChatList/ChatList';

const ChatTab = () => {
	return (
		<div className='chat-tab-wrapper'>
			<h1 className='chat-tab-title'>chat</h1>
			<div className='chat-tab-content'>
				<ChatList/>
			</div>
		</div>
	);
};

export default ChatTab;