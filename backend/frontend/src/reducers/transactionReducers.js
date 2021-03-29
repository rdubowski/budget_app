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

export const transactionsListReducer = (state = { loading: true, transactions: [] }, action) => {
	switch (action.type) {
		case TRANSACTION_LIST_REQUEST:
			return {
				loading: true
			};
		case TRANSACTION_LIST_SUCCESS:
			return {
				loading: false,
				transactions: action.payload
			};
		case TRANSACTION_LIST_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};
export const transactionDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case TRANSACTION_DELETE_REQUEST:
			return { loading: true };
		case TRANSACTION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case TRANSACTION_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const transactionAddReducer = (state = { transaction: {} }, action) => {
	switch (action.type) {
		case TRANSACTION_ADD_REQUEST:
			return { loading: true };
		case TRANSACTION_ADD_SUCCESS:
			return { loading: false, success: true, transaction: action.payload };
		case TRANSACTION_ADD_FAIL:
			return { loading: false, error: action.payload };
		case TRANSACTION_ADD_RESET:
			return {
				transaction: {}
			};
		default:
			return state;
	}
};
