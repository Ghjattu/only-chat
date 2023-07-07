import React from 'react';
import './Sidebar.css';
import Profile from './Profile/Profile';
import Menu from './Menu/Menu';

const Sidebar = (props) => {
	return (
		<div className='sidebar-wrapper'>
			<Profile user={props.user}/>
			<Menu handleTabPanelChange={props.handleTabPanelChange} />
		</div>
	);
};

export default Sidebar;