import React, { useContext, useState, useEffect } from 'react';
import './Dashboard.css';
import Profile from './Profile/Profile.js';
import Menu from './Menu/Menu.js';
import StatusBar from './StatusBar/StatusBar.js';
import ChatTab from './ChatTab/ChatTab.js';
import FriendTab from './FriendTab/FriendTab.js';
import { UserContext } from '../../contexts/userContext';
import chatControllers from '../../controllers/chat';
import friendControllers from '../../controllers/friend';

const Dashboard = () => {
	const user = useContext(UserContext);
    
	const [tabIndex, setTabIndex] = useState(0);
	const [chatList, setChatList] = useState([]);
	const [friendList, setFriendList] = useState([]);

	// Get chat list and friends list.
	useEffect(() => {
		(async () => {
			let res = await chatControllers.getChatList(user.id);
			if (res.code === 200) {
				setChatList(res.data);
			}

			res = await friendControllers.getAllFriends(user.id);
			if (res.code === 200) {
				setFriendList(res.data);                
			}
		})();
	}, []);

	const handleTabChange = (index) => { 
		setTabIndex(index);
	};

	return (
		<div className='dashboard'>
			<div className='dashboard-profile sidebar'>
				<Profile/>
			</div>

			<div className='dashboard-menu sidebar'>
				<Menu tabIndex={tabIndex} handleTabChange={handleTabChange} />
			</div>

			<div className='dashboard-main'>
				<div className='main-wrapper'>
					<StatusBar/>
            
					{tabIndex == 0 && <ChatTab chatList={chatList} />}
					{tabIndex == 1 && <FriendTab friendList={friendList} handleTabChange={handleTabChange} />}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;