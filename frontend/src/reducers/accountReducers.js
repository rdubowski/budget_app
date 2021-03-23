import { ACCOUNT_LIST_REQUEST, ACCOUNT_LIST_SUCCESS, ACCOUNT_LIST_FAIL } from '../constants/accountConstants';

export const accountReducer = (state = { accounts: [] }, action) => {
	switch (action.type) {
		case ACCOUNT_LIST_REQUEST:
			return { loading: true, accounts: [] };
		case ACCOUNT_LIST_SUCCESS:
			return { loading: false, accounts: action.payload };
		case ACCOUNT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
