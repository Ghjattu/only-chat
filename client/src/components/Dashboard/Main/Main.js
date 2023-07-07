import React from 'react';
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

export default Main;