export const SET_FIELD = 'SET_FIELD';
export const CLEAR = 'CLEAR';

export const setField = (field, value) => {
	return {
		type: SET_FIELD,
		field,
		value
	}
}

