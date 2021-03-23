import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
function Tracker() {
	const [ name, setName ] = useState('');
	const [ amount, setAmount ] = useState(0);
	const [ typeOfTransaction, setTypeOfTransaction ] = useState('');
	const submitHandler = () => console.log('submit');
	return (
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
									label="Withdraw"
									id="withdraw"
									name="transactionType"
									onChange={(e) => setTypeOfTransaction(e.target.value)}
								/>
								<Form.Check
									type="radio"
									label="Deposit"
									id="transaction"
									name="transactionType"
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
			</Col>
			<Col md={8}>
				<Row>
					<Col className="text-center" md={12}>
						<h1>Your Actual Budget</h1>
						<h2>$550</h2>
					</Col>
				</Row>
				<Row>
					<Col md={4} />
					<Col md={2} className="text-center">
						<h2>Your expenses</h2>
						<h2>$200</h2>
					</Col>
					<Col md={2} className="text-center">
						<h2>Your income</h2>
						<h2>$1000</h2>
					</Col>
					<Col md={4} />
				</Row>
				<Row>
					<Col md={12}>
						<Card>
							<ListGroup>
								<ListGroup.Item>
									<Row>
										<Col md={6}>Tresc naszej transakcji</Col>
										<Col md={1} />
										<Col className="text-center" md={2}>
											delete
										</Col>
										<Col className="text-center" md={2}>
											100$
										</Col>
										<Col md={1} />
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
								<ListGroup.Item>Vestibulum at eros</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default Tracker;
