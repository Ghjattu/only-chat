import React, { useEffect, useState } from 'react';
import './ChatTab.css';
import PropTypes from 'prop-types';
import ChatList from './ChatList/ChatList.js';
import TabTitle from '../TabTitle/TabTitle.js';
import chatControllers from '../../../controllers/chat';
import SearchBar from '../SearchBar/SearchBar.js';
import ChatHistory from './ChatHistory/ChatHistory.js';

const ChatTab = (props) => {
	const [chatList, setChatList] = useState([]);
	const [filteredChatList, setFilteredChatList] = useState([]);
	const [currentShow, setCurrentShow] = useState(null);
    
	useEffect(() => {
		(async () => {
			const res = await chatControllers.getChatList(props.id);
			if (res.code === 200) {
				setChatList(res.data);
				setFilteredChatList(res.data);
			}
		})();
	}, []);

	const handleListItemClick = (chat) => { 
		setCurrentShow(chat);   
	};

	const handleSearch = (key) => {
		const filteredList = chatList.filter(chat => {
			return chat.username.toLowerCase().includes(key.toLowerCase());
		});

		setFilteredChatList(filteredList);
	};

	return (
		<div className='tab chat-tab'>
			<div className='chat-tab-title'>
				<TabTitle title='chat'/>
			</div>

			<div className='chat-tab-search-bar'>
				<SearchBar handleSearch={handleSearch} />
			</div>

			<div className='chat-tab-name'>
				{currentShow !== null && <p className='username'>{currentShow.username}</p>}
			</div>

			<div className='chat-tab-list'>
				<ChatList chatList={filteredChatList} handleClick={handleListItemClick} />
			</div>

			<div className='chat-tab-history'>
				{currentShow !== null && 
                    <ChatHistory chat={currentShow} />}
			</div>
		</div>
	);
};

ChatTab.propTypes = {
	id: PropTypes.number.isRequired,
};

export default ChatTab;