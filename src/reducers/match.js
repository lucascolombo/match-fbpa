import { SET_FIELD, CLEAR } from '../actions';
import moment from 'moment';

const defaultState = {
	address: '',
	latitude: 0,
	longitude: 0,
	datetime: moment().format('DD/MM/YYYY HH:mm'),
	players: 9,
};

export default function match(state = defaultState, action) {
	switch(action.type) {
		case SET_FIELD:
			const newState = {...state}
			newState[action.field] = action.value;
			return newState;
		case CLEAR:
			return defaultState;
		default:
			return state;
	}
}