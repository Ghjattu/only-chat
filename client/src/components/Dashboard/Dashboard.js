import React, { useState } from 'react';
import './Dashboard.css';
import Profile from './Profile/Profile.js';
import Menu from './Menu/Menu.js';
import Main from './Main/Main.js';

const Dashboard = () => {
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
				<Main tabPanelIndex={tabPanelIndex} />
			</div>
		</div>
	);
};

export default Dashboard;