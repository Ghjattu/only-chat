import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';

const getChatList = async (id) => {
	try {
		const res = await axios.get(`${baseUrl}/chat/${id}`);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const createNewChatRel = async (chat) => {
	try {
		const res = await axios.post(`${baseUrl}/chat`, chat);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const chatControllers = { getChatList, createNewChatRel };

export default chatControllers;