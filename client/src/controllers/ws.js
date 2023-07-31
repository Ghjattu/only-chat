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

	socket.onerror = (err) => {
		console.log(err);
	};
};

const sendMsg = (msg) => {
	socket.send(msg);
};

const getSocketState = () => {
	return socket.readyState;
};

const websocket = { connect, sendMsg, getSocketState };
export default websocket;