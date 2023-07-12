import React, { useContext, useState } from 'react';
import './Dashboard.css';
import Profile from './Profile/Profile.js';
import Menu from './Menu/Menu.js';
import StatusBar from './StatusBar/StatusBar.js';
import ChatTab from './ChatTab/ChatTab.js';
import FriendTab from './FriendTab/FriendTab.js';
import { UserContext } from '../../contexts/userContext';

const Dashboard = () => {
	const user = useContext(UserContext);
    
	const [tabIndex, setTabIndex] = useState(0);

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
            
					{tabIndex == 0 && <ChatTab/>}
					{tabIndex == 1 && <FriendTab id={user.id} handleTabChange={handleTabChange} />}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;