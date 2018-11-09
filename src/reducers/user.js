import { LOGIN, LOGOUT } from '../actions';

export default function user(state = null, action) {
	switch(action.type) {
		case LOGIN:
			return action.user;
		case LOGOUT:
			return null;
		default:
			return state;
	}
}