import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';

const getAllFriend = async (id) => { 
	try {
		const res = await axios.get(`${baseUrl}/friends/${id}`);
		console.log(res);
		return res.data;
	} catch (error) {
		return error.response.data;
	}
};

const friendControllers = { getAllFriend };

export default friendControllers;