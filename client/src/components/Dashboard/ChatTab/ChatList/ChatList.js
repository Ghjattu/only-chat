import React from 'react';
import './ChatList.css';
import PropTypes from 'prop-types';
import List from '../../../List/List.js';
import ListItem from '../../../ListItem/ListItem.js';
import Badge from '../../../Badge/Badge.js';

const ChatList = (props) => {
	const formatLastMsgDate = (timestamp) => {
		const msgDate = new Date(timestamp);
		const now = new Date();

		if (msgDate.getDate() === now.getDate()) {  // if today
			const minutes = msgDate.getMinutes() < 10 ? '0' + msgDate.getMinutes() : msgDate.getMinutes();
			return msgDate.getHours() + ':' + minutes;
		} else if ((now - msgDate) <= 24 * 60 * 60 * 1000) {  // if yesterday
			return 'Yesterday';
		} else {  // if more than 2 days ago
			return msgDate.getMonth() + 1 + '/' + msgDate.getDate();
		}
	};

	const chatList = props.chatList.map(chat =>
		<ListItem key={chat.friend_id}
			avatar={chat.friend_username}
			primaryText={chat.friend_username}
			secondaryText={chat.last_msg}
			handleListItemClick={() => props.handleListItemClick(chat)}>

			<div className='last-msg-date'>
				<p>{formatLastMsgDate(chat.last_msg_date)}</p>
			</div>

			<div className='unread-count'>
				<Badge count={chat.unread_count} />
			</div>
		</ListItem>
	);

	return (
		<List>{chatList}</List>
	);
};

ChatList.propTypes = {
	chatList: PropTypes.arrayOf(PropTypes.shape({
		ID: PropTypes.number.isRequired,
		friend_id: PropTypes.number.isRequired,
		friend_username: PropTypes.string.isRequired,
		last_msg: PropTypes.string.isRequired,
		last_msg_date: PropTypes.string.isRequired,
		unread_count: PropTypes.number.isRequired,
	})).isRequired,
	handleListItemClick: PropTypes.func.isRequired,
};

export default ChatList;