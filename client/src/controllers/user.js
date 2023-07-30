import axios from 'axios';
import messageTypes from './constants.js';
import websocket from './ws.js';

const baseUrl = 'http://localhost:8080/api/v1';

const register = async (user) => {
	try {
		const res = await axios.post(`${baseUrl}/register`, user);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const login = async (user) => {
	try {
		const res = await axios.post(`${baseUrl}/login`, user);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const getUsersByKey = async (key) => {
	try {
		const res = await axios.get(`${baseUrl}/users/${key}`);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const sendFriendRequest = (senderID, receiverID) => {
	const msg = {
		msg_type: messageTypes.FRIEND_REQUEST,
		sender_id: senderID,
		receiver_id: receiverID,
		timestamp: (new Date()).toISOString(),
		content: '',
	};

	websocket.sendMsg(JSON.stringify(msg));
};

const userControllers = {
	login,
	register,
	getUsersByKey,
	sendFriendRequest,
};

export default userControllers;