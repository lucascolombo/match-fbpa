import firebase from 'firebase';

export const SET_MATCHS = 'SET_MATCHS';

const setMatchList = matchList => ({
	type: SET_MATCHS,
	matchList
})

export const watchMatchList = () => dispatch => {
	return firebase
		.database()
		.ref(`/matchs`)
		.on('value', snapshot => {
			dispatch(setMatchList(snapshot.val()));
		})
}