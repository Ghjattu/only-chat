import React, { useEffect, useState } from 'react';
import './FriendTab.css';
import TabTitle from '../TabTitle/TabTitle';
import FriendList from './FriendList/FriendList';
import friendControllers from '../../../../controllers/friend';
import FriendInfo from './FriendInfo/FriendInfo';

const FriendTab = ({ user }) => {
	const [friendList, setFriendList] = useState([]);
	const [currentShow, setCurrentShow] = useState(null);

	useEffect(() => {
		(async () => {
			const res = await friendControllers.getAllFriend(user.id);
			if (res.code == 200) {
				setFriendList(res.data);
			}
		})();
	}, []);

	const handleListItemClick = (friend) => { 
		setCurrentShow(friend);
	};

	return (
		<div className='tab friend-tab-wrapper'>
			<TabTitle title='friend'/>
			<FriendList friendList={friendList} handleClick={handleListItemClick}/>
			{currentShow !== null && <FriendInfo friend={currentShow}/>}
		</div>
	);
};

export default FriendTab;