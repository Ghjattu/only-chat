import React from 'react';
import { useField } from 'formik';
import './TextInput.css';

const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div className='text-input-wrapper'>
			<div className='text-input-label'>
				<label htmlFor={props.id}>{label}</label>
			</div>
			<input className='text-input' autoComplete='on' {...field} {...props} />
			<div className='text-input-notification'>
				{meta.touched && meta.error ? 
					<p>{meta.error}</p> : <p></p>}
			</div>
		</div>
	);
};

export default TextInput;