import { ACCOUNT_LIST_REQUEST, ACCOUNT_LIST_SUCCESS, ACCOUNT_LIST_FAIL } from '../constants/accountConstants';
import axios from 'axios';
export const listAccounts = () => async (dispatch) => {
	try {
		dispatch({ type: ACCOUNT_LIST_REQUEST });
		const { data } = await axios.get('api/accounts/');
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
