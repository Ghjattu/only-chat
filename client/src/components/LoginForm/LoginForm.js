import React from 'react';
import './LoginForm.css';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../TextInput/TextInput';
import userControllers from '../../controllers/user';

const initialValues = {
	username: '',
	password: '',
};

const validationSchema = yup.object({
	username: yup.string()
		.max(30, 'The username should not exceed 30 characters.')
		.required('Required'),
	password: yup.string()
		.min(6, 'The password should not be less than 6 characters.')
		.max(16, 'The password should not exceed 16 characters.')
		.required('Required.'),
});

const handleSubmit = async (values) => {
	await userControllers.login(values);
	// console.log(res);
};

const LoginForm = () => {
	return (
		<div>
			<h1>Login</h1>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				<Form>
					<TextInput label='Username' id='username' name='username' type='text' />
					<TextInput label='Password' id='password' name='password' type='password' />
					<button type='submit'>Login</button>
				</Form>
			</Formik>
		</div>
	);
};

export default LoginForm;