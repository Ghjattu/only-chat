import React, { useEffect, useState } from 'react';
import './ChatTab.css';
import PropTypes from 'prop-types';
import ChatList from './ChatList/ChatList.js';
import TabTitle from '../TabTitle/TabTitle.js';
import SearchBar from '../SearchBar/SearchBar.js';
import ChatHistory from './ChatHistory/ChatHistory.js';
import { useImmer } from 'use-immer';

const ChatTab = (props) => {
	const [filteredChatList, setFilteredChatList] = useImmer([]);
	const [currentChat, setCurrentChat] = useState(null);

	useEffect(() => {
		setFilteredChatList(props.chatList);
	}, [props.chatList]);

	const handleListItemClick = (chat) => {
		setCurrentChat(chat);
	};

	const handleSearch = (key) => {
		const filteredList = props.chatList.filter(chat => {
			return chat.friend_username.toLowerCase().includes(key.toLowerCase());
		});

		setFilteredChatList(filteredList);
	};

	const UpdateLastMsg = (msg) => {
		setFilteredChatList(draft => {
			const index = draft.findIndex(chat => chat.friend_id === msg.to_id);
			draft[index].last_msg = msg.content;
			draft[index].last_msg_date = msg.timestamp;
		});
	};

	return (
		<div className='tab chat-tab'>
			<div className='chat-tab-title'>
				<TabTitle title='chat'/>
			</div>

			<div className='chat-tab-search-bar'>
				<SearchBar handleSearch={handleSearch} placeholder='Search' />
			</div>

			<div className='chat-tab-name'>
				{currentChat !== null &&
                    <p className='username'>{currentChat.friend_username}</p>}
			</div>

			<div className='chat-tab-list'>
				<ChatList chatList={filteredChatList} handleListItemClick={handleListItemClick} />
			</div>

			<div className='chat-tab-history'>
				{currentChat !== null &&
                    <ChatHistory chat={currentChat} UpdateLastMsg={UpdateLastMsg} />}
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
		last_msg_date: PropTypes.string.isRequired,
		unread_count: PropTypes.number.isRequired,
	})).isRequired,
};

export default ChatTab;