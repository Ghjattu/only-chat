import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';

const getMessagesByUserID = async (user_id, friend_id) => {
	try {
		const res = await axios.get(`${baseUrl}/messages/${user_id}/${friend_id}`);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const messageControllers = { getMessagesByUserID };

export default messageControllers;