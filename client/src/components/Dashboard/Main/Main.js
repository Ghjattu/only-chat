import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import StatusBar from './StatusBar/StatusBar';
import ChatTab from './ChatTab/ChatTab';
import FriendTab from './FriendTab/FriendTab';
import { UserContext } from '../../../contexts/userContext';

const Main = (props) => {
	const tabPanelIndex = props.tabPanelIndex;
	const user = useContext(UserContext);

	return (
		<div className='main-wrapper'>
			<StatusBar/>
            
			{tabPanelIndex == 0 && <ChatTab/>}
			{tabPanelIndex == 1 && <FriendTab id={user.id} />}
		</div>
	);
};

Main.propTypes = {
	tabPanelIndex: PropTypes.number.isRequired,
};

export default Main;