import React from 'react';
import './FriendInfo.css';
import Avatar from 'boring-avatars';

const FriendInfo = (props) => {
	return (
		<div>
			<Avatar
				size={40}
				name={props.friend.username}
				variant="beam"
				colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
			/>
			{props.friend.username}
		</div>
	);
};

export default FriendInfo;