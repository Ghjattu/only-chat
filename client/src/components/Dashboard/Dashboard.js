import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

const Dashboard = ({ user }) => {
	return (
		<div className='dashboard'>
			<Sidebar user={user}/>
			<Main/>
		</div>
	);
};

export default Dashboard;