import React from 'react';
import PropTypes from 'prop-types';
import './FriendList.css';
import FriendListItem from './FriendListItem/FriendListItem';

const FriendList = (props) => {
	const friendList = props.friendList.map(friend => 
		<FriendListItem key={friend.id} friend={friend} handleClick={props.handleClick}/>
	);

	return (
		<div className='friend-list-wrapper'>
			<ul className='friend-list'>{friendList}</ul>
		</div>
	);
};

FriendList.propTypes = {
	friendList: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default FriendList;