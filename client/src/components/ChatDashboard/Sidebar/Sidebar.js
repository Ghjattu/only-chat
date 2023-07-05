import React from 'react';
import './Sidebar.css';
import Profile from './Profile/Profile';
import Menu from './Menu/Menu';

const Sidebar = ({ user }) => {
	return (
		<div className='sidebar-wrapper'>
			<Profile user={user}/>
			<Menu/>
		</div>
	);
};

export default Sidebar;