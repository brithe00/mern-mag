import {
	ARTICLE_LIST_REQUEST,
	ARTICLE_LIST_SUCCESS,
	ARTICLE_LIST_FAIL,
	ARTICLE_DETAILS_REQUEST,
	ARTICLE_DETAILS_SUCCESS,
	ARTICLE_DETAILS_FAIL,
	ARTICLE_DELETE_REQUEST,
	ARTICLE_DELETE_SUCCESS,
	ARTICLE_DELETE_FAIL,
	ARTICLE_CREATE_REQUEST,
	ARTICLE_CREATE_SUCCESS,
	ARTICLE_CREATE_FAIL,
	ARTICLE_CREATE_RESET,
	ARTICLE_UPDATE_REQUEST,
	ARTICLE_UPDATE_SUCCESS,
	ARTICLE_UPDATE_FAIL,
	ARTICLE_UPDATE_RESET,
	ARTICLE_CREATE_REVIEW_REQUEST,
	ARTICLE_CREATE_REVIEW_SUCCESS,
	ARTICLE_CREATE_REVIEW_FAIL,
	ARTICLE_CREATE_REVIEW_RESET,
	ARTICLE_LIST_MY_REQUEST,
	ARTICLE_LIST_MY_SUCCESS,
	ARTICLE_LIST_MY_FAIL,
	ARTICLE_LIST_MY_RESET,
} from '../constants/articleConstant';

export const articleListReducer = (state = { articles: [] }, action) => {
	switch (action.type) {
		case ARTICLE_LIST_REQUEST:
			return { loading: true, articles: [] };
		case ARTICLE_LIST_SUCCESS:
			return {
				loading: false,
				articles: action.payload.articles,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case ARTICLE_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const articleDetailsReducer = (
	state = {
		article: {
			comments: [],
		},
	},
	action
) => {
	switch (action.type) {
		case ARTICLE_DETAILS_REQUEST:
			return { loading: true, ...state };
		case ARTICLE_DETAILS_SUCCESS:
			return { loading: false, article: action.payload };
		case ARTICLE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const articleDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ARTICLE_DELETE_REQUEST:
			return { loading: true };
		case ARTICLE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ARTICLE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const articleCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ARTICLE_CREATE_REQUEST:
			return { loading: true };
		case ARTICLE_CREATE_SUCCESS:
			return { loading: false, success: true, article: action.payload };
		case ARTICLE_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case ARTICLE_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const articleUpdateReducer = (state = { article: {} }, action) => {
	switch (action.type) {
		case ARTICLE_UPDATE_REQUEST:
			return { loading: true };
		case ARTICLE_UPDATE_SUCCESS:
			return { loading: false, success: true, article: action.payload };
		case ARTICLE_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case ARTICLE_UPDATE_RESET:
			return { article: {} };
		default:
			return state;
	}
};

export const articleReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ARTICLE_CREATE_REVIEW_REQUEST:
			return { loading: true };
		case ARTICLE_CREATE_REVIEW_SUCCESS:
			return { loading: false, success: true };
		case ARTICLE_CREATE_REVIEW_FAIL:
			return { loading: false, error: action.payload };
		case ARTICLE_CREATE_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};

export const articleListMyReducer = (state = { articles: [] }, action) => {
	switch (action.type) {
		case ARTICLE_LIST_MY_REQUEST:
			return { loading: true };
		case ARTICLE_LIST_MY_SUCCESS:
			return { loading: false, articles: action.payload };
		case ARTICLE_LIST_MY_FAIL:
			return { loading: false, error: action.payload };
		case ARTICLE_LIST_MY_RESET:
			return { articles: [] };
		default:
			return state;
	}
};
