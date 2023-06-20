import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import userControllers from '../../controllers/user';
import './RegisterForm.css';

const initialValues = {
	username: '',
	password: '',
};

const validationSchema = yup.object({
	username: yup.string()
		.max(30, 'Should not exceed 30 characters.')
		.required('Required'),
	password: yup.string()
		.min(6, 'Should not be less than 6 characters.')
		.max(16, 'Should not exceed 16 characters.')
		.required('Required.'),
});

const handleSubmit = async (values) => {
	await userControllers.register(values);
	// console.log(res);
};

const RegisterForm = () => {
	return (
		<div className='register-form-wrapper'>
			<h1 className='register-form-title'>Hello <span>New</span></h1>
			<p className='register-form-subtitle'>Let&apos;s started to make account</p>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				<Form>
					<TextInput label='Username' id='username' name='username' type='text' placeholder='No more than 30 characters'/>
					<TextInput label='Password' id='password' name='password' type='password' placeholder='6 to 16 characters'/>
					<Button label='Get Started'/>
				</Form>
			</Formik>
		</div>
	);
};

export default RegisterForm;