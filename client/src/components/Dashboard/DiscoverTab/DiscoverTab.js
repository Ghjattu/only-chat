import React, { useContext } from 'react';
import './DiscoverTab.css';
import TabTitle from '../TabTitle/TabTitle';
import SearchBar from '../SearchBar/SearchBar';
import userControllers from '../../../controllers/user';
import { useImmer } from 'use-immer';
import ListItem from '../../ListItem/ListItem.js';
import { UserContext } from '../../../contexts/userContext';

const DiscoverTab = () => {
	const user = useContext(UserContext);

	const [searchResults, setSearchResults] = useImmer([]);

	const handleSearch = async (key) => {
		if (key === '') {  // if search bar is empty, clear the user list.
			setSearchResults(draft => {
				draft.splice(0, draft.length);
			});
		} else {  // otherwise, get the user list by key.
			const res  = await userControllers.getUsersByKey(key.toLowerCase());
			if (res.code === 200) {
				setSearchResults(res.data);
			}
		}
	};

	const handleButtonClick = (receiverID) => {
		userControllers.sendFriendRequest(user.user_id, user.username, receiverID);
	};

	const resultList = searchResults.map(user =>
		<ListItem key={user.user_id}
			avatar={user.username}
			primaryText={user.username}
			secondaryText={user.chatid}>

			<div className="request-button" onClick={() => handleButtonClick(user.user_id)}>ADD</div>
		</ListItem>
	);

	return (
		<div className="tab discover-tab">
			<div className="discover-tab-title">
				<TabTitle title="discover" />
			</div>

			<div className="discover-tab-search-bar">
				<SearchBar handleSearch={handleSearch} placeholder='Input a Chat ID' />
			</div>

			<div className="discover-tab-content">
				<div className='discover-tab-list'>
					{resultList}
				</div>
			</div>
		</div>
	);
};

export default DiscoverTab;