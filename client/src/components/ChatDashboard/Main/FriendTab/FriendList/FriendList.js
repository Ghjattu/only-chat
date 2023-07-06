import React from 'react';
import './FriendList.css';
import FriendListItem from './FriendListItem/FriendListItem';

const FriendList = (props) => {
	const friendList = props.friendList.map(friend => 
		<FriendListItem key={friend.id} friend={friend}/>
	);

	return (
		<div className='friend-list-wrapper'>
			<ul className='friend-list'>{friendList}</ul>
		</div>
	);
};

export default FriendList;