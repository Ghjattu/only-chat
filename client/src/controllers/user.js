import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';

const register = async (user) => {
	const res = await axios.post(`${baseUrl}/register`, user);
	console.log(res);
};

const login = async (user) => {
	const res = await axios.post(`${baseUrl}/login`, user);
	console.log(res);
};

const userControllers = { register, login };

export default userControllers;