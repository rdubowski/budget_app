import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { detailsAccount } from '../actions/accountActions';
import { listTransactions, addTransaction, deleteTransaction } from '../actions/transactionActions';
import { TRANSACTION_ADD_RESET } from '../constants/transactionConstants';
function Tracker({ match, history }) {
	const accountId = match.params.id;
	const [ name, setName ] = useState('');
	const [ amount, setAmount ] = useState(0);
	const [ typeOfTransaction, setTypeOfTransaction ] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const accountDetails = useSelector((state) => state.accountDetails);
	const { error, loading, account } = accountDetails;

	const transactionList = useSelector((state) => state.transactionList);
	const { error: errorListTransaction, loading: loadingListTransaction, transactions } = transactionList;

	const transactionAdd = useSelector((state) => state.transactionAdd);
	const { error: errorAddTransaction, loading: loadingAddTransaction, success } = transactionAdd;

	const transactionDelete = useSelector((state) => state.transactionDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = transactionDelete;

	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login');
			} else {
				dispatch({ type: TRANSACTION_ADD_RESET });
				setName('');
				setAmount('');
				setTypeOfTransaction('');
				dispatch(detailsAccount(accountId));
				dispatch(listTransactions(accountId));
			}
		},
		[ dispatch, history, userInfo, success, successDelete ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addTransaction(accountId, {
				name,
				amount,
				transaction_type: typeOfTransaction
			})
		);
	};
	const deleteHandler = (transactionId) => {
		if (window.confirm('Are you sure that you want to delete this account?')) {
			dispatch(deleteTransaction(transactionId));
		}
	};
	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={4}>
						{loadingAddTransaction ? (
							<Loader />
						) : (
							<FormContainer>
								{errorAddTransaction && <Message variant="danger">{errorAddTransaction}</Message>}
								<h2 className="text-center">Add Transaction</h2>
								<Form onSubmit={submitHandler}>
									<Form.Group controlId="name">
										<Form.Label className="text-center">Name of Transaction</Form.Label>
										<Form.Control
											required
											type="name"
											placeholder="Enter name"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</Form.Group>
									<Form.Group controlId="amount">
										<Form.Label className="text-center">Amount of transaction</Form.Label>
										<Form.Control
											type="number"
											placeholder="Enter amount"
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label className="text-center" as="legend">
											Type of transaction
										</Form.Label>
										<Col>
											<Form.Check
												type="radio"
												label="withdraw"
												id="withdraw"
												value="W"
												name="transactionType"
												required
												checked={typeOfTransaction === 'W'}
												onChange={(e) => setTypeOfTransaction(e.target.value)}
											/>
											<Form.Check
												type="radio"
												label="deposit"
												value="D"
												id="transaction"
												name="transactionType"
												required
												checked={typeOfTransaction === 'D'}
												onChange={(e) => setTypeOfTransaction(e.target.value)}
											/>
										</Col>
									</Form.Group>
									<Button block type="submit" variant="primary">
										Add Transaction
									</Button>
								</Form>
								<Row className="py-3">
									<Col>
										Back to <Link to="/accounts">Your Accounts</Link>
									</Col>
								</Row>
							</FormContainer>
						)}
					</Col>
					<Col md={8}>
						<Row>
							<Col className="text-center" md={12}>
								<h1 className="pb-0">Your Actual Budget</h1>
								<h1 className="py-0">${account.actual_balance}</h1>
								<p>
									Initial Budget
									<p>${parseFloat(account.init_balance)}</p>
								</p>
							</Col>
						</Row>
						<Row>
							<Col md={4} />
							<Col md={2} className="text-center">
								<h2 className="pb-0">Your expenses</h2>
								<h2 className="py-0">${account.withdraw_sum}</h2>
							</Col>
							<Col md={2} className="text-center">
								<h2 className="pb-0">Your deposit</h2>
								<h2 className="py-0">${account.deposit_sum}</h2>
							</Col>
							<Col md={4} />
						</Row>
						<Row>
							<Col md={12}>
								<h2 className="text-center py-3">Your Transactions</h2>
							</Col>
						</Row>
						{loadingListTransaction ? (
							<Loader />
						) : errorListTransaction ? (
							<Message variant="danger">{errorListTransaction}</Message>
						) : loadingDelete ? (
							<Loader />
						) : errorDelete ? (
							<Message variant="danger">{errorListTransaction}</Message>
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
															{transaction.transaction_type === 'D' ? (
																`$${transaction.amount}`
															) : (
																`-$${transaction.amount}`
															)}
														</Col>
														<Col className="text-center" md={2}>
															<Button
																style={
																	transaction.transaction_type === 'W' ? (
																		{ background: 'red', border: 'red' }
																	) : (
																		{ background: 'green', border: 'green' }
																	)
																}
																className="btn-sm"
																onClick={() => deleteHandler(transaction.id)}
															>
																<i className="fas fa-trash" />
															</Button>
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
