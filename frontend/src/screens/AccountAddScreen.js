import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { addAccount } from '../actions/accountActions';
import { ACCOUNT_ADD_RESET } from '../constants/accountConstants';
function AccountAddScreen({ history }) {
	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ initBalance, setInitBalance ] = useState(0);

	const dispatch = useDispatch();

	const accountAdd = useSelector((state) => state.accountAdd);
	const { error, loading, success } = accountAdd;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			if (!userInfo) {
				history.push('/');
			}
			if (success) {
				dispatch({ type: ACCOUNT_ADD_RESET });
				history.push('/accounts');
			}
		},
		[ history, userInfo, dispatch, success ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addAccount({
				name,
				description,
				init_balance: initBalance
			})
		);
	};
	return (
		<FormContainer>
			<h1 className="text-center">Add account</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name of Account</Form.Label>
					<Form.Control
						required
						type="name"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="initBalance">
					<Form.Label>Initital Balance of Account</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter Initial Balance"
						value={initBalance}
						onChange={(e) => setInitBalance(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Add Account
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Back to <Link to="/accounts">Your Accounts</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default AccountAddScreen;
