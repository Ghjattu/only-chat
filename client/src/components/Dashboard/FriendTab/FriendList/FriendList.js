import React from 'react';
import PropTypes from 'prop-types';
import List from '../../../List/List';
import ListItem from '../../../ListItem/ListItem.js';

const FriendList = (props) => {
	const friendList = props.friendList.map(friend =>
		<ListItem key={friend.user_id}
			avatar={friend.username}
			primaryText={friend.username}
			handleListItemClick={() => props.handleListItemClick(friend)}>
		</ListItem>
	);

	return (
		<List>{friendList}</List>
	);
};

FriendList.propTypes = {
	friendList: PropTypes.arrayOf(PropTypes.shape({
		user_id: PropTypes.number.isRequired,
		chatid: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	})).isRequired,
	handleListItemClick: PropTypes.func.isRequired,
};

export default FriendList;