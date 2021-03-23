import {
	ACCOUNT_LIST_REQUEST,
	ACCOUNT_LIST_SUCCESS,
	ACCOUNT_LIST_FAIL,
	ACCOUNT_DELETE_REQUEST,
	ACCOUNT_DELETE_SUCCESS,
	ACCOUNT_DELETE_FAIL,
	ACCOUNT_ADD_REQUEST,
	ACCOUNT_ADD_SUCCESS,
	ACCOUNT_ADD_FAIL,
	ACCOUNT_ADD_RESET
} from '../constants/accountConstants';

import axios from 'axios';

export const listAccounts = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ACCOUNT_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${userInfo.token}`
			}
		};
		const { data } = await axios.get('api/accounts/', config);

		dispatch({
			type: ACCOUNT_LIST_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ACCOUNT_LIST_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};

export const deleteAccount = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ACCOUNT_DELETE_REQUEST
		});

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${userInfo.token}`
			}
		};

		const { data } = await axios.delete(`/api/accounts/${id}/`, config);

		dispatch({
			type: ACCOUNT_DELETE_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: ACCOUNT_DELETE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};

export const addAccount = (account) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ACCOUNT_ADD_REQUEST
		});

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${userInfo.token}`
			}
		};

		const { data } = await axios.post(`/api/accounts/`, account, config);

		dispatch({
			type: ACCOUNT_ADD_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ACCOUNT_ADD_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
		});
	}
};
