import React from 'react';
import PropTypes from 'prop-types';
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
	friendList: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		chatid: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	})).isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default FriendList;