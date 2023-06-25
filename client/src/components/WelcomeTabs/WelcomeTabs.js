import React, { useState } from 'react';
import './WelcomeTabs.css';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';


const WelcomeTabs = (props) => { 
	const { handleLogin } = props;
	const [tabIndex, setTabIndex] = useState(0);

	const handleClick = (index) => { 
		setTabIndex(index);

		const attributes = document.querySelectorAll('.tabs-selector-attribute');
		for (let i = 0; i < attributes.length; i++) {
			attributes[i].classList.remove('active');
		}
		attributes[index].classList.add('active');
	};

	return (
		<div className='tabs-wrapper'>
			<div className='tabs-selector'>
				<span className='tabs-selector-attribute active' onClick={() => handleClick(0)}>Login</span>
				<span className='tabs-selector-attribute' onClick={() => handleClick(1)}>Sign Up</span>
			</div>
			<div className='tabs-panels'>
				<TabPanel tabIndex={tabIndex} index={0}>
					<LoginForm handleLogin={handleLogin}/>
				</TabPanel>
				<TabPanel tabIndex={tabIndex} index={1}>
					<RegisterForm/>
				</TabPanel>
			</div>
		</div>
	);
};

export default WelcomeTabs;

const TabPanel = (props) => {
	const { children, tabIndex, index, ...other } = props;

	return (
		<div hidden={tabIndex !== index} {...other}>
			{tabIndex === index && <div>{children}</div>}
		</div>
	);
};