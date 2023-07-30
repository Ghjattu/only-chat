import React, { useContext, useEffect, useRef, useState } from 'react';
import './ChatHistory.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../../../contexts/userContext';
import messageControllers from '../../../../controllers/message';
import { useImmer } from 'use-immer';
import TextField from '@mui/material/TextField';

const ChatHistory = (props) => {
	const user = useContext(UserContext);

	const MsgListContainerRef = useRef(null);

	const [chatHistory, setChatHistory] = useImmer([]);
	const [inputMsg, setInputMsg] = useState('');

	useEffect(() => {
		(async () => {
			const res = await messageControllers.getMessagesByUserID(user.user_id, props.chat.friend_id);
			if (res.code === 200) {
				setChatHistory(res.data);
			}
		})();
	}, [props.chat.friend_id]);

	// Scroll to bottom when chat history changes.
	useEffect(() => {
		const container = MsgListContainerRef.current;
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	}, [chatHistory]);

	const handleInputChange = (event) => {
		setInputMsg(event.target.value);
	};

	const handleInputKeyDown = (event) => {
		if (event.key === 'Enter') {
			const currentTimestamp = new Date();
			const msg = messageControllers.sendPrivateMessage(
				user.user_id,
				props.chat.friend_id,
				currentTimestamp,
				inputMsg
			);

			msg.timestamp = currentTimestamp.toString();
			props.UpdateLastMsg(msg);
			setChatHistory(draft => {
				draft.push(msg);
			});
			setInputMsg('');
		}
	};

	const messageList = chatHistory.map(message => {
		let className = 'history-message ';
		if (message.sender_id == user.user_id) {
			className += 'right';
		}

		return (
			// TODO:
			<div key={message.timestamp} className={className}>{message.content}</div>
		);
	});

	return (
		<div className='chat-history-wrapper'>
			<div className='history-message-list' ref={MsgListContainerRef}>
				{messageList}
			</div>
			<div className="chat-input">
				<TextField id='content' name='content' label='Type a message...'
					variant='filled' fullWidth size='small' value={inputMsg}
					onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
			</div>
		</div>
	);
};

ChatHistory.propTypes = {
	chat: PropTypes.shape({
		friend_id: PropTypes.number.isRequired,
		friend_username: PropTypes.string.isRequired,
	}),
	UpdateLastMsg: PropTypes.func.isRequired,
};

export default ChatHistory;