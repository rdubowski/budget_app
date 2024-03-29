import React, { useEffect, useState } from 'react';
import { Form, Button, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen({ history }) {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ message, setMessage ] = useState('');

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { error, loading, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login');
			} else {
				if (!user || !user.name || success || userInfo.id !== user._id) {
					dispatch({ type: USER_UPDATE_PROFILE_RESET });
					setPassword('');
					setConfirmPassword('');
					dispatch(getUserDetails());
				} else {
					setName(user.name);
					setEmail(user.email);
				}
			}
		},
		[ history, userInfo, user, success, dispatch ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(
				updateUserProfile({
					name: name,
					email: email,
					password: password
				})
			);
			setMessage('Success');
		}
	};

	return (
		<FormContainer>
			<h2>User Profile</h2>
			{message && <Message variant="primary">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						required
						type="name"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email Adress</Form.Label>
					<Form.Control
						required
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="passwordConfirm">
					<Form.Label>Confirm password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm passowrd"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Update
				</Button>
			</Form>
		</FormContainer>
	);
}
export default ProfileScreen;
