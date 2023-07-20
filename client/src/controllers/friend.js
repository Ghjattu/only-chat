import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';

const getAllFriends = async (id) => {
	try {
		const res = await axios.get(`${baseUrl}/friends/${id}`);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const friendControllers = { getAllFriends };

export default friendControllers;