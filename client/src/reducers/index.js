import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
	auth: authReducer,
	// we are required to use the key name as form
	// changed from reducer to formReducer to avoid confusion
	form: formReducer,
	streams: streamReducer,
});
