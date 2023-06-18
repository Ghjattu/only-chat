import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import TextInput from '../TextInput/TextInput';
import userControllers from '../../controllers/user';
import './RegisterForm.css';

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
	await userControllers.register(values);
	// console.log(res);
};

const RegisterForm = () => {
	return (
		<div>
			<h1>Register</h1>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				<Form>
					<TextInput label='Username' id='username' name='username' type='text' />
					<TextInput label='Password' id='password' name='password' type='password' />
					<button type='submit'>Submit</button>
				</Form>
			</Formik>
		</div>
	);
};

export default RegisterForm;