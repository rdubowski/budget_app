import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listAccounts, deleteAccount } from '../actions/accountActions';

function AccountListScreen({ history }) {
	const dispatch = useDispatch();

	const accountDelete = useSelector((state) => state.accountDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = accountDelete;

	const accountsList = useSelector((state) => state.accountList);
	const { loading, error, accounts } = accountsList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login');
			} else {
				dispatch(listAccounts());
			}
		},
		[ dispatch, history, userInfo, successDelete ]
	);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure that you want to delete this account?')) {
			dispatch(deleteAccount(id));
		}
	};
	const addAccountHandler = (account) => {
		console.log('addAccount()');
	};
	return (
		<div>
			<Row className="align-items-center">
				<Col>
					<h1>You Accounts</h1>
				</Col>
				<Col className="text-right">
					<LinkContainer to={`/accounts/add/`}>
						<Button className="my-3">
							<i className="fas fa-plus" /> Add New Account
						</Button>
					</LinkContainer>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<div>
					<Table bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>NAME</th>
								<th>DESCRIPTION</th>
								<th>INITIAL BALANCE</th>
								<th>BALANCE</th>
								<th>NUMBER OF TRANSACTIONS</th>
								<th>CREATED AT</th>
								<th>TRACK YOU TRANSACTIONS</th>
								<th>DELETE</th>
							</tr>
						</thead>
						<tbody>
							{accounts.map((account) => (
								<tr key={account.id}>
									<td>{account.name}</td>
									<td>{account.description ? `${account.description.substring(0, 15)}...` : ''}</td>
									<td>${account.init_balance}</td>
									<td>${account.actual_balance}</td>
									<td>{account.transactions.length}</td>
									<td>{account.created_at ? account.created_at.substring(0, 10) : ''}</td>
									<td className="text-center">
										<LinkContainer to={`/admin/book/${account.id}/edit`}>
											<Button size="lg" block variant="secondary" className="btn-sm">
												ENTER
											</Button>
										</LinkContainer>
									</td>
									<td className="text-center">
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(account.id)}
										>
											<i className="fas fa-trash" />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
		</div>
	);
}
export default AccountListScreen;
