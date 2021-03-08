import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './reducers/userReducers';
import {
	articleListReducer,
	articleDetailsReducer,
	articleDeleteReducer,
	articleCreateReducer,
	articleUpdateReducer,
	articleReviewCreateReducer,
	articleListMyReducer,
} from './reducers/articleReducers';

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	articleList: articleListReducer,
	articleDetails: articleDetailsReducer,
	articleDelete: articleDeleteReducer,
	articleCreate: articleCreateReducer,
	articleUpdate: articleUpdateReducer,
	articleReviewCreate: articleReviewCreateReducer,
	articleListMy: articleListMyReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
