import React from 'react';
import PropTypes from 'prop-types';
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

Sidebar.propTypes = {
	user: PropTypes.object.isRequired,
	handleTabPanelChange: PropTypes.func.isRequired,
};

export default Sidebar;