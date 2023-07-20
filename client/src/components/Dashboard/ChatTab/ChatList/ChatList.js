import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item/Item.js';
import List from '../../../List/List.js';

const ChatList = (props) => {
	const chatList = props.chatList.map(chat =>
		<Item key={chat.ID} chat={chat} handleClick={props.handleClick} />
	);

	return (
		<List>{chatList}</List>
	);
};

ChatList.propTypes = {
	chatList: PropTypes.arrayOf(PropTypes.shape({
		ID: PropTypes.number.isRequired,
		friend_username: PropTypes.string.isRequired,
		last_msg: PropTypes.string.isRequired,
		unread_count: PropTypes.number.isRequired,
	})).isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default ChatList;