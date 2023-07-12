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
    
	const [tabPanelIndex, setTabPanelIndex] = useState(0);

	const handleTabPanelChange = (index) => { 
		setTabPanelIndex(index);
	};

	return (
		<div className='dashboard'>
			<div className='dashboard-profile sidebar'>
				<Profile/>
			</div>

			<div className='dashboard-menu sidebar'>
				<Menu handleTabPanelChange={handleTabPanelChange} />
			</div>

			<div className='dashboard-main'>
				<div className='main-wrapper'>
					<StatusBar/>
            
					{tabPanelIndex == 0 && <ChatTab/>}
					{tabPanelIndex == 1 && <FriendTab id={user.id} />}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;