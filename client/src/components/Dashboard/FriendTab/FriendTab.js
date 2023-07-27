import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './FriendTab.css';
import TabTitle from '../TabTitle/TabTitle.js';
import FriendList from './FriendList/FriendList.js';
import FriendInfo from './FriendInfo/FriendInfo.js';
import SearchBar from '../SearchBar/SearchBar.js';

const FriendTab = (props) => {
	const [filteredFriendList, setFilteredFriendList] = useState([]);
	const [currentShow, setCurrentShow] = useState(null);

	useEffect(() => {
		setFilteredFriendList(props.friendList);
	}, [props.friendList]);

	const handleListItemClick = (friend) => {
		setCurrentShow(friend);
	};

	const handleSearch = (key) => {
		const filteredList = props.friendList.filter(friend => {
			return friend.username.toLowerCase().includes(key.toLowerCase());
		});

		setFilteredFriendList(filteredList);
	};

	return (
		<div className='tab friend-tab'>
			<div className='friend-tab-title'>
				<TabTitle title='friend' />
			</div>

			<div className='friend-tab-search-bar'>
				<SearchBar handleSearch={handleSearch} placeholder='Search' />
			</div>

			<div className='friend-tab-friend-list'>
				<FriendList friendList={filteredFriendList} handleClick={handleListItemClick} />
			</div>

			<div className='friend-tab-friend-info'>
				{currentShow !== null &&
					<FriendInfo
						friend={currentShow}
						handleTabChange={props.handleTabChange}
						handleToChatClick={props.handleToChatClick} />}
			</div>
		</div>
	);
};

FriendTab.propTypes = {
	friendList: PropTypes.arrayOf(PropTypes.shape({
		user_id: PropTypes.number.isRequired,
		chatid: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	})).isRequired,
	handleTabChange: PropTypes.func.isRequired,
	handleToChatClick: PropTypes.func.isRequired,
};

export default FriendTab;