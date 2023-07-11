import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';
import Profile from './Profile/Profile';
import Menu from './Menu/Menu';

const Sidebar = (props) => {
	return (
		<div className='sidebar-wrapper'>
			<Profile/>
			<Menu handleTabPanelChange={props.handleTabPanelChange} />
		</div>
	);
};

Sidebar.propTypes = {
	handleTabPanelChange: PropTypes.func.isRequired,
};

export default Sidebar;