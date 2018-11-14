import { SET_MATCHS } from '../actions';

export default function matchList(state = null, action) {
	switch(action.type) {
		case SET_MATCHS:
			return action.matchList;
		default:
			return state;
	}
}