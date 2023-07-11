import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './FriendTab.css';
import TabTitle from '../TabTitle/TabTitle';
import FriendList from './FriendList/FriendList';
import friendControllers from '../../../../controllers/friend';
import FriendInfo from './FriendInfo/FriendInfo';
import SearchBar from '../SearchBar/SearchBar';

const FriendTab = (props) => {
	const [friendList, setFriendList] = useState([]);
	const [filteredFriendList, setFilteredFriendList] = useState([]);
	const [currentShow, setCurrentShow] = useState(null);

	useEffect(() => {
		(async () => {
			const res = await friendControllers.getAllFriends(props.id);
			if (res.code == 200) {
				setFriendList(res.data);
				setFilteredFriendList(res.data);
			}
		})();
	}, []);

	const handleListItemClick = (friend) => { 
		setCurrentShow(friend);
	};

	const handleSearch = (key) => {
		const filteredList = friendList.filter(friend => {
			return friend.username.toLowerCase().includes(key);
		});

		setFilteredFriendList(filteredList);
	};

	return (
		<div className='tab friend-tab'>
			<div className='friend-tab-title'>
				<TabTitle title='friend'/>
			</div>
			<div className='friend-tab-search-bar'>
				<SearchBar handleSearch={handleSearch} />
			</div>
			<div className='friend-tab-friend-list'>
				<FriendList friendList={filteredFriendList} handleClick={handleListItemClick}/>
			</div>
			<div className='friend-tab-friend-info'>
				{currentShow !== null && <FriendInfo friend={currentShow}/>}
			</div>
		</div>
	);
};

FriendTab.propTypes = {
	id: PropTypes.number.isRequired,
};

export default FriendTab;