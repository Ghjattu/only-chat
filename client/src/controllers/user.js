import axios from 'axios';

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

const userControllers = { register, login };

export default userControllers;