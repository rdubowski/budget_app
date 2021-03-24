import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { detailsAccount } from '../actions/accountActions';
import { listTransactions } from '../actions/transactionActions';
function Tracker({ match, history }) {
	const accountId = match.params.id;
	const [ name, setName ] = useState('');
	const [ amount, setAmount ] = useState(0);
	const [ typeOfTransaction, setTypeOfTransaction ] = useState('');
	const dispatch = useDispatch();

	const accountDetails = useSelector((state) => state.accountDetails);
	const { error, loading, account } = accountDetails;

	const transactionList = useSelector((state) => state.transactionList);
	const { error: errorTransaction, loading: loadingTransaction, transactions } = transactionList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const submitHandler = () => console.log('submit');

	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login');
			} else {
				dispatch(detailsAccount(accountId));
				dispatch(listTransactions(accountId));
			}
		},
		[ dispatch, history, userInfo ]
	);
	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={4}>
						<FormContainer>
							<h2 className="text-center">Add Transaction</h2>
							<Form onSubmit={submitHandler}>
								<Form.Group controlId="name">
									<Form.Label>Name of Transaction</Form.Label>
									<Form.Control
										required
										type="name"
										placeholder="Enter name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Form.Group>
								<Form.Group controlId="amount">
									<Form.Label>Amount of transaction</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter amount"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label className="text-center" as="legend">
										Select type of transaction
									</Form.Label>
									<Col>
										<Form.Check
											type="radio"
											label="withdraw"
											id="withdraw"
											value="W"
											name="transactionType"
											checked={typeOfTransaction === 'W'}
											onChange={(e) => setTypeOfTransaction(e.target.value)}
										/>
										<Form.Check
											type="radio"
											label="deposit"
											value="D"
											id="transaction"
											name="transactionType"
											checked={typeOfTransaction === 'D'}
											onChange={(e) => setTypeOfTransaction(e.target.value)}
										/>
									</Col>
								</Form.Group>
								<Button block type="submit" variant="primary">
									{typeOfTransaction}
									Add Transaction
								</Button>
							</Form>
							<Row className="py-3">
								<Col>
									Back to <Link to="/accounts">Your Accounts</Link>
								</Col>
							</Row>
						</FormContainer>
					</Col>
					<Col md={8}>
						<Row>
							<Col className="text-center" md={12}>
								<h1>Your Actual Budget</h1>
								<h2>${account.actual_balance}</h2>
							</Col>
						</Row>
						<Row>
							<Col md={4} />
							<Col md={2} className="text-center">
								<h2>Your expenses</h2>
								<h2>${account.withdraw_sum}</h2>
							</Col>
							<Col md={2} className="text-center">
								<h2>Your deposit</h2>
								<h2>${account.deposit_sum}</h2>
							</Col>
							<Col md={4} />
						</Row>
						<Row>
							<Col md={12}>
								<h2 className="text-center">Your Transactions</h2>
							</Col>
						</Row>
						{loadingTransaction ? (
							<Loader />
						) : errorTransaction ? (
							<Message variant="danger">{error}</Message>
						) : (
							<Row>
								<Col md={12}>
									<Card>
										<ListGroup>
											<ListGroup.Item>
												<Row>
													<Col md={6}>Title of transaction</Col>
													<Col md={1} />
													<Col className="text-center" md={2}>
														Amount
													</Col>
													<Col className="text-center" md={2}>
														Delete
													</Col>
													<Col md={1} />
												</Row>
											</ListGroup.Item>
											{transactions.map((transaction) => (
												<ListGroup.Item
													style={
														transaction.transaction_type === 'W' ? (
															{ color: 'white', background: 'red' }
														) : (
															{ color: 'white', background: 'green' }
														)
													}
													key={transaction.id}
												>
													<Row>
														<Col md={6}>{transaction.name}</Col>
														<Col md={1} />
														<Col className="text-center" md={2}>
															{transaction.amount}
														</Col>
														<Col className="text-center" md={2}>
															Delete
														</Col>
														<Col md={1} />
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									</Card>
								</Col>
							</Row>
						)}
					</Col>
				</Row>
			)}
		</div>
	);
}

export default Tracker;
