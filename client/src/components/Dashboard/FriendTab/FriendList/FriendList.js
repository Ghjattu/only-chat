import React from 'react';
import PropTypes from 'prop-types';
import './FriendList.css';
import Item from './Item/Item';
import List from '../../../List/List';

const FriendList = (props) => {
	const friendList = props.friendList.map(friend => 
		<Item key={friend.id} friend={friend} handleClick={props.handleClick}/>
	);

	return (
		<List>{friendList}</List>
	);
};

FriendList.propTypes = {
	friendList: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default FriendList;