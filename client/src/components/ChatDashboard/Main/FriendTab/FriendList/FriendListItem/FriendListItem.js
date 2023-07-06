import React from 'react';
import './FriendListItem.css';
import Avatar from 'boring-avatars';

const FriendListItem = (props) => {
	const handleClick = (friend) => { 
		props.handleClick(friend);
	};

	return (
		<div className='friend-list-item-wrapper'>
			<li className='friend-list-item' onClick={() => handleClick(props.friend)}>
				<Avatar
					size={40}
					name={props.friend.username}
					variant="beam"
					colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
				/>
				{props.friend.username}
			</li>
		</div>
	);
};

export default FriendListItem;