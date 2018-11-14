import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';
export const CLEAR = 'CLEAR';

const clear = () => ({
	type: CLEAR,
})

export const setField = (field, value) => {
	return {
		type: SET_FIELD,
		field,
		value
	}
}

export const saveMatch = (match) => dispatch => {
	return firebase
		.database()
		.ref(`/matchs`)
		.push(match)
		.then(() => {
			dispatch(clear());
		})
}
