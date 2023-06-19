import React from 'react';
import './LoginForm.css';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../TextInput/TextInput';
import userControllers from '../../controllers/user';

const initialValues = {
	chatid: '',
	password: '',
};

const validationSchema = yup.object({
	chatid: yup.string()
		.max(10, 'The Chat ID is too long.')
		.required('Required'),
	password: yup.string()
		.min(6, 'The password should not be less than 6 characters.')
		.max(16, 'The password should not exceed 16 characters.')
		.required('Required.'),
});

const handleSubmit = async (values) => {
	await userControllers.login(values);
	console.log(values);
};

const LoginForm = () => {
	return (
		<div>
			<h1>Login</h1>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				<Form>
					<TextInput label='Chat ID' id='chatid' name='chatid' type='text' />
					<TextInput label='Password' id='password' name='password' type='password' />
					<button type='submit'>Login</button>
				</Form>
			</Formik>
		</div>
	);
};

export default LoginForm;