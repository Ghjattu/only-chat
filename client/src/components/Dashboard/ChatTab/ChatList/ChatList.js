import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item/Item.js';
import List from '../../../List/List.js';

const ChatList = (props) => {
	const chatList = props.chatList.map(chat => 
		<Item key={chat.id} chat={chat}/>
	);

	return (
		<List>{chatList}</List>
	);
};

ChatList.propTypes = {
	chatList: PropTypes.array.isRequired,
};

export default ChatList;