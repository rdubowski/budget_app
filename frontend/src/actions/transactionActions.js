import {
	TRANSACTION_LIST_REQUEST,
	TRANSACTION_LIST_SUCCESS,
	TRANSACTION_LIST_FAIL,
	TRANSACTION_ADD_REQUEST,
	TRANSACTION_ADD_SUCCESS,
	TRANSACTION_ADD_FAIL,
	TRANSACTION_ADD_RESET,
	TRANSACTION_DELETE_REQUEST,
	TRANSACTION_DELETE_SUCCESS,
	TRANSACTION_DELETE_FAIL
} from '../constants/transactionConstants';
import axios from 'axios';

export const listTransactions = (accountId) => async (dispatch, getState) => {
	try {
		dispatch({ type: TRANSACTION_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${userInfo.token}`
			}
		};

		const { data } = await axios.get(`/api/accounts/${accountId}/transactions/`, config);

		dispatch({
			type: TRANSACTION_LIST_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: TRANSACTION_LIST_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};

export const addTransaction = (accountId, transaction) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRANSACTION_ADD_RESET
		});

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${userInfo.token}`
			}
		};

		const { data } = await axios.post(`/api/accounts/${accountId}/transactions/`, transaction, config);

		dispatch({
			type: TRANSACTION_ADD_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: TRANSACTION_ADD_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};

export const deleteTransaction = (transactionId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRANSACTION_DELETE_REQUEST
		});

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${userInfo.token}`
			}
		};

		const { data } = await axios.delete(`/api/transactions/${transactionId}/delete/`, config);

		dispatch({
			type: TRANSACTION_DELETE_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: TRANSACTION_DELETE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};
