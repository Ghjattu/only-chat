import React, { useEffect, useState } from 'react';
import './ChatTab.css';
import PropTypes from 'prop-types';
import ChatList from './ChatList/ChatList.js';
import TabTitle from '../TabTitle/TabTitle.js';
import SearchBar from '../SearchBar/SearchBar.js';
import ChatHistory from './ChatHistory/ChatHistory.js';

const ChatTab = (props) => {
	const [filteredChatList, setFilteredChatList] = useState([]);
	const [currentShow, setCurrentShow] = useState(null);

	useEffect(() => {
		setFilteredChatList(props.chatList);
	}, [props.chatList]);

	const handleListItemClick = (chat) => {
		setCurrentShow(chat);
	};

	const handleSearch = (key) => {
		const filteredList = props.chatList.filter(chat => {
			return chat.friend_username.toLowerCase().includes(key.toLowerCase());
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
				{currentShow !== null &&
                    <p className='username'>{currentShow.friend_username}</p>}
			</div>

			<div className='chat-tab-list'>
				<ChatList chatList={filteredChatList} handleClick={handleListItemClick} />
			</div>

			<div className='chat-tab-history'>
				{currentShow !== null &&
                    <ChatHistory chat={currentShow} />}
			</div>

			<div className="chat-tab-input">
				<input type="text" />
			</div>
		</div>
	);
};

ChatTab.propTypes = {
	chatList: PropTypes.arrayOf(PropTypes.shape({
		ID: PropTypes.number.isRequired,
		friend_id: PropTypes.number.isRequired,
		friend_username: PropTypes.string.isRequired,
		last_msg: PropTypes.string.isRequired,
		unread_count: PropTypes.number.isRequired,
	})).isRequired,
};

export default ChatTab;