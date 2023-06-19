import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const WelcomeTabs = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<div>
				<Tabs value={value} onChange={handleChange}>
					<Tab label='Login'/>
					<Tab label='Register'/>
				</Tabs>
			</div>
			<TabPanel value={value} index={0}>
				<LoginForm/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<RegisterForm/>
			</TabPanel>
		</div>
	);
};

export default WelcomeTabs;

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div hidden={value !== index} {...other}>
			{value === index && <div>{children}</div>}
		</div>
	);
};