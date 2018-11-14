import { combineReducers } from 'redux';

import user from './user';
import match from './match';
import matchList from './matchList';

export default combineReducers({
	user,
	match,
	matchList
});