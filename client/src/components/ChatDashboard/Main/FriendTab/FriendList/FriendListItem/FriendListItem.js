import React from 'react';
import './FriendListItem.css';

const FriendListItem = (props) => {
	return (
		<div className='friend-list-item-wrapper'>
			<li className='friend-list-item'>{props.friend.username}</li>
		</div>
	);
};

export default FriendListItem;