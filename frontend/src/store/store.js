import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer
} from '../reducers/userReducers';
import { accountAddReducer, accountReducer, accountDeleteReducer } from '../reducers/accountReducers';

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	accountList: accountReducer,
	accountAdd: accountAddReducer,
	accountDelete: accountDeleteReducer
});

const userInfofromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
	userLogin: { userInfo: userInfofromStorage }
};

const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
