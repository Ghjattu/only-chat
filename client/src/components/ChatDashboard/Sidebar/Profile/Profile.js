import React from 'react';
import './Profile.css';
import Avatar from 'boring-avatars';

const Profile = ({ user }) => {
	return (
		<div className='profile'>
			<div className='profile-avatar'>
				<Avatar
					size={60}
					name={user.username}
					variant="beam"
					colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
				/>
			</div>
			<div className='profile-username'>
				<p>{user.username}</p>
			</div>
		</div>
	);
};

export default Profile;