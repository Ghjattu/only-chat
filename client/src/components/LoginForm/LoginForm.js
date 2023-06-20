import React from 'react';
import './LoginForm.css';
import { Form, Formik } from 'formik';
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

const handleSubmit = async (values) => {
	await userControllers.login(values);
};

const LoginForm = () => {
	return (
		<div className='login-form-wrapper'>
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

export default LoginForm;