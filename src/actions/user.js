import firebase from 'firebase';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const login = user => ({
	type: LOGIN,
	user
})
const logout = () => ({
	type: LOGOUT,
})

export const doLogin = ({ mail, password }) => dispatch => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(mail, password)
		.then(user => {
			dispatch(login(user));
		})
}

export const register = ({ mail, password }) => dispatch => {
	return firebase
		.auth()
		.createUserWithEmailAndPassword(mail, password)
		.then(user => {
			dispatch(login(user));
		})
}