import axios from 'axios';
import websocket from './ws';
import messageTypes from './constants.js';

const baseUrl = 'http://localhost:8080/api/v1';

const getMessagesByUserID = async (user_id, friend_id) => {
	try {
		const res = await axios.get(`${baseUrl}/messages/${user_id}/${friend_id}`);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const sendPrivateMessage = (sender_id, sender_username, receiver_id, timestamp, content) => {
	const msg = {
		msg_type: messageTypes.PRIVATE_MESSAGE,
		sender_id: sender_id,
		sender_username: sender_username,
		receiver_id: receiver_id,
		timestamp: timestamp.toISOString(),
		content: content
	};
	websocket.sendMsg(JSON.stringify(msg));

	return msg;
};

const getAllNotifications = async (receiver_id) => {
	try {
		const res = await axios.get(`${baseUrl}/notifications/${receiver_id}`);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const messageControllers = {
	getMessagesByUserID,
	sendPrivateMessage,
	getAllNotifications,
};

export default messageControllers;