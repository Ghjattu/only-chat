import React from 'react';
import PropTypes from 'prop-types';
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

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export default TextInput;