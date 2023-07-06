import React, { useEffect, useState } from 'react';
import './FriendTab.css';
import TabTitle from '../TabTitle/TabTitle';
import FriendList from './FriendList/FriendList';
import friendControllers from '../../../../controllers/friend';

const FriendTab = (props) => {
	const [friendList, setFriendList] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await friendControllers.getAllFriend(props.id);
			if (res.code == 200) {
				setFriendList(res.data);
			}
		})();
	}, []);

	return (
		<div className='tab friend-tab-wrapper'>
			<TabTitle title='friend'/>
			<FriendList friendList={friendList}/>
		</div>
	);
};

export default FriendTab;