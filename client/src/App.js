import React from 'react';
import './App.css';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';

const App = () => {
	return (
		<div className='chatroom-container'>
			<div className='chatroom'>
				<RegisterForm/>
				<LoginForm/>   
			</div>
		</div>
	);
};

export default App;