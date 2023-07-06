import React from 'react';
import './ChatTab.css';
import ChatList from './ChatList/ChatList';
import TabTitle from '../TabTitle/TabTitle';

const ChatTab = () => {
	return (
		<div className='chat-tab-wrapper'>
			<TabTitle title='chat'/>
			<div className='chat-tab-content'>
				<ChatList/>
			</div>
		</div>
	);
};

export default ChatTab;