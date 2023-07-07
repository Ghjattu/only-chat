import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import StatusBar from './StatusBar/StatusBar';
import ChatTab from './ChatTab/ChatTab';
import FriendTab from './FriendTab/FriendTab';

const Main = (props) => {
	const tabPanelIndex = props.tabPanelIndex;

	return (
		<div className='main-wrapper'>
			<StatusBar/>
            
			{tabPanelIndex == 0 && <ChatTab/>}
			{tabPanelIndex == 1 && <FriendTab user={props.user}/>}
		</div>
	);
};

Main.propTypes = {
	user: PropTypes.object.isRequired,
	tabPanelIndex: PropTypes.number.isRequired,
};

export default Main;