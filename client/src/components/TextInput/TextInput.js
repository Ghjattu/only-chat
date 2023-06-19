import React from 'react';
import { useField } from 'formik';
import './TextInput.css';

const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div>
			<label htmlFor={props.id}>{label}</label>
			<input className='' autoComplete='on' {...field} {...props} />
			{meta.touched && meta.error && <p>{meta.error}</p>}
		</div>
	);
};

export default TextInput;