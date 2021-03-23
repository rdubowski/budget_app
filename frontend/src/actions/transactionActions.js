import {
	TRANSACTION_LIST_REQUEST,
	TRANSACTION_LIST_SUCCESS,
	TRANSACTION_LIST_FAIL
} from '../constants/transactionConstants';
import axios from 'axios';

export const listTransactions = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: TRANSACTION_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${userInfo.token}`
			}
		};

		const { data } = await axios.get(`/api/accounts/${id}/transactions/`, config);

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
