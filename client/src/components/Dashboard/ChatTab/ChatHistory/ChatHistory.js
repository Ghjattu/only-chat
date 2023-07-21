import React, { useContext, useEffect } from 'react';
import './ChatHistory.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../../../contexts/userContext';
import messageControllers from '../../../../controllers/message';
import { useImmer } from 'use-immer';

const ChatHistory = (props) => {
	const user = useContext(UserContext);

	const [history, setHistory] = useImmer([]);

	useEffect(() => {
		(async () => {
			const res = await messageControllers.getMessagesByUserID(user.user_id, props.chat.friend_id);
			if (res.code === 200) {
				setHistory(res.data);
			}
		})();
	}, [props.chat]);

	const messageList = history.map(message => <p key={message.ID}>{message.content}</p>);

	return (
		<div>
			{messageList}
		</div>
	);
};

ChatHistory.propTypes = {
	chat: PropTypes.shape({
		ID: PropTypes.number.isRequired,
		friend_id: PropTypes.number.isRequired,
		friend_username: PropTypes.string.isRequired,
		last_msg: PropTypes.string.isRequired,
		unread_count: PropTypes.number.isRequired,
	})
};

export default ChatHistory;