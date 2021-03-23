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
	ACCOUNT_ADD_RESET,
	ACCOUNT_DETAILS_REQUEST,
	ACCOUNT_DETAILS_SUCCESS,
	ACCOUNT_DETAILS_FAIL
} from '../constants/accountConstants';

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

export const accountDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ACCOUNT_DELETE_REQUEST:
			return { loading: true };
		case ACCOUNT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ACCOUNT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const accountAddReducer = (state = { account: {} }, action) => {
	switch (action.type) {
		case ACCOUNT_ADD_REQUEST:
			return { loading: true };
		case ACCOUNT_ADD_SUCCESS:
			return { loading: false, success: true, account: action.payload };
		case ACCOUNT_ADD_FAIL:
			return { loading: false, error: action.payload };
		case ACCOUNT_ADD_RESET:
			return {};
		default:
			return state;
	}
};

export const accountDetailsReducer = (state = { loading: true, account: {} }, action) => {
	switch (action.type) {
		case ACCOUNT_DETAILS_REQUEST:
			return {
				loading: true
			};
		case ACCOUNT_DETAILS_SUCCESS:
			return {
				loading: false,
				account: action.payload
			};
		case ACCOUNT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};
