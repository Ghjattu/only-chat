import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';
import { Form, Formik } from 'formik';
import Alert from '@mui/material/Alert';
import * as yup from 'yup';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import userControllers from '../../controllers/user';

const initialValues = {
	chatid: '',
	password: '',
};

const validationSchema = yup.object({
	chatid: yup.string()
		.max(10, 'The Chat ID is too long.')
		.required('Required.'),
	password: yup.string()
		.min(6, 'Should not be less than 6 characters.')
		.max(16, 'Should not exceed 16 characters.')
		.required('Required.'),
});

const LoginForm = (props) => {
	const { handleLogin } = props;
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (values) => {
		const res = await userControllers.login(values);
		console.log(res);
		if (res.code === 401) {
			setErrorMessage('Password is incorrect');
			setTimeout(() => setErrorMessage(''), 3000);
		} else if (res.code == 500) {
			setErrorMessage('Some errors occurred, please try again');
		} else {
			handleLogin(res.data);
		}
	};

	return (
		<div className='login-form-wrapper'>
			{errorMessage && <Alert severity='error' variant='filled' className='error-message'>{errorMessage}</Alert>}
			<h1 className='login-form-title'>Welcome Back!</h1>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				<Form className='login-form'>
					<TextInput label='Chat ID' id='chatid' name='chatid' type='text' placeholder='Enter your Chat ID' />
					<TextInput label='Password' id='password' name='password' type='password' placeholder='6 to 16 characters' />
					<Button label='Login'/>
				</Form>
			</Formik>
		</div>
	);
};

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;