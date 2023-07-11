import React from 'react';
import PropTypes from 'prop-types';
import './FriendListItem.css';
import Avatar from 'boring-avatars';
import Card from '../../../../../Card/Card.js';

const FriendListItem = (props) => {
	const handleClick = (friend) => { 
		props.handleClick(friend);
	};

	return (
		<Card>
			<li className='friend-list-item' onClick={() => handleClick(props.friend)}>
				<Avatar
					size={40}
					name={props.friend.username}
					variant="beam"
					colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
				/>
				<div className='list-item-friend-info'>
					<p className='list-item-info-username'>
						{props.friend.username}
					</p>
				</div>
			</li>
		</Card>
	);
};

FriendListItem.propTypes = {
	friend: PropTypes.shape({
		username: PropTypes.string.isRequired,
	}),
	handleClick: PropTypes.func.isRequired,
};

export default FriendListItem;