let socket;

const connect = (id, chatid, username) => {
	// console.log(id, chatid, username);
	socket = new WebSocket(`ws://localhost:8080/ws/${id}/${chatid}/${username}`);

	socket.onopen = () => {
		console.log('connected successfully');
	};

	socket.onmessage = (msg) => {
		console.log(msg);
	};

	socket.onclose = () => {
		console.log('connection closed');
	};
};

const sendMsg = (msg) => {
	socket.send(msg);
};

const websocket = { connect, sendMsg };
export default websocket;