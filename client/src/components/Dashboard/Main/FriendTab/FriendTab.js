import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './FriendTab.css';
import TabTitle from '../TabTitle/TabTitle';
import FriendList from './FriendList/FriendList';
import friendControllers from '../../../../controllers/friend';
import FriendInfo from './FriendInfo/FriendInfo';
import SearchBar from '../SearchBar/SearchBar';

const FriendTab = ({ user }) => {
	const [friendList, setFriendList] = useState([]);
	const [currentShow, setCurrentShow] = useState(null);

	useEffect(() => {
		(async () => {
			const res = await friendControllers.getAllFriends(user.id);
			if (res.code == 200) {
				setFriendList(res.data);
			}
		})();
	}, []);

	const handleListItemClick = (friend) => { 
		setCurrentShow(friend);
	};

	return (
		<div className='tab friend-tab'>
			<div className='friend-tab-title'>
				<TabTitle title='friend'/>
			</div>
			<div className='friend-tab-search-bar'>
				<SearchBar/>
			</div>
			<div className='friend-tab-friend-list'>
				<FriendList friendList={friendList} handleClick={handleListItemClick}/>
			</div>
			<div className='friend-tab-friend-info'>
				{currentShow !== null && <FriendInfo friend={currentShow}/>}
			</div>
		</div>
	);
};

FriendTab.propTypes = {
	user: PropTypes.object.isRequired,
};

export default FriendTab;