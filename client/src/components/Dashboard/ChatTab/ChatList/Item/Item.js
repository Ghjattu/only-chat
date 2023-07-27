import React from 'react';
import './Item.css';
import PropTypes from 'prop-types';
import Avatar from 'boring-avatars';
import Card from '../../../../Card/Card.js';
import Badge from '../../../../Badge/Badge.js';

const Item = (props) => {
	const handleClick = (chat) => {
		props.handleClick(chat);
	};

	const formatLastMsgTime = (timestamp) => {
		const date = new Date(timestamp);
		const now = new Date();
		if (date.getDate() === now.getDate()) {
			return date.getHours() + ':' + date.getMinutes();
		} else if ((now - date) <= 24 * 60 * 60 * 1000) {
			return 'Yesterday';
		} else {
			return date.getMonth() + 1 + '/' + date.getDate();
		}
	};

	return (
		<Card>
			<div className='chat-list-item' onClick={() => handleClick(props.chat)}>
				<div className='avatar'>
					<Avatar
						size={40}
						name={props.chat.friend_username}
						variant="beam"
						colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
					/>
				</div>

				<div className='username'>
					<p>{props.chat.friend_username}</p>
				</div>

				<div className='last-msg'>
					<p>{props.chat.last_msg}</p>
				</div>

				<div className='last-msg-time'>
					<p>{formatLastMsgTime(props.chat.last_msg_time)}</p>
				</div>

				<div className='unread-count'>
					<Badge count={props.chat.unread_count} />
				</div>
			</div>
		</Card>
	);
};

Item.propTypes = {
	chat: PropTypes.shape({
		ID: PropTypes.number.isRequired,
		friend_id: PropTypes.number.isRequired,
		friend_username: PropTypes.string.isRequired,
		last_msg: PropTypes.string.isRequired,
		last_msg_time: PropTypes.string.isRequired,
		unread_count: PropTypes.number.isRequired,
	}).isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default Item;