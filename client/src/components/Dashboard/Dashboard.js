import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

const Dashboard = () => {
	const [tabPanelIndex, setTabPanelIndex] = useState(0);

	const handleTabPanelChange = (index) => { 
		setTabPanelIndex(index);
	};

	return (
		<div className='dashboard'>
			<Sidebar handleTabPanelChange={handleTabPanelChange} />
			<Main tabPanelIndex={tabPanelIndex} />
		</div>
	);
};

export default Dashboard;