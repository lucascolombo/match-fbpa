import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	Image
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import FormRow from '../components/FormRow';
import TextLink from '../components/TextLink';

import { doLogin, register } from '../actions';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mail: '',
			password: '',
			loading: false,
			response: null,
			loginForm: true
		}
	}

	componentWillMount() {
		const config = {
			apiKey: "AIzaSyCT5aNAFhLOdPIb50hyWXOIiAYeG4SnqGg",
		    authDomain: "match-fbpa.firebaseapp.com",
		    databaseURL: "https://match-fbpa.firebaseio.com",
		    projectId: "match-fbpa",
		    storageBucket: "match-fbpa.appspot.com",
		    messagingSenderId: "573131318892"
		};

		firebase.initializeApp(config);
	}

	onChangeText(field, value) {
		this.setState({ [field]: value, response: null  });
	}

	handleFrom(val) {
		this.setState({ loginForm: val, response: null });
	}

	redirectLogin() {
		this.props.navigation.replace('Main');
	}

	validate() {
		let validate = true;
		let errors = [];
		const { mail, password } = this.state;
		const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (mail.trim() === "" || !regexMail.test(mail))
			errors.push("usuário");

		if (password.trim() === "")
			errors.push("senha");

		// if (!this.state.loginForm) {
		// no futuro cadastrar telefone ?
		// validar outros campos
		// }

		if (errors.length > 0) {
			validate = false;
			this.setState( { response: `Preencha os campos corretamente: ${errors.join(', ')}` } );
		}

		return validate;
	}

	doLogin() {
		this.setState( { loading: true, response: null } );
		const { mail, password } = this.state;

		this.props.doLogin({ mail, password })
		.then(() => {
			this.redirectLogin();
		})
		.catch(error => {
			this.setState( { response: "Usuário ou senha inválida!", loading: false } );
		})
	}

	doRegister() {
		const { mail, password } = this.state;
		this.setState( { loading: true, response: null } );

		this.props.register({ mail, password })
		.then(() => {
			this.redirectLogin();
		})
		.catch(error => {
			this.setState( { response: "Não foi possível realizar o cadastro!", loading: false } );
		})
	}

	renderLoginButton() {
		if (this.state.loading) {
			return (<ActivityIndicator />);
		}

		let label = this.state.loginForm ? 'Acessar' : 'Registrar';

		return (
			<TouchableOpacity
				style={styles.button}
				onPress={
					() => {
						if (this.validate()) {
							if (this.state.loginForm)
								this.doLogin()
							else
								this.doRegister()
						}
					}
				}
				>
				<Text style={styles.buttonText}>{label}</Text>
			</TouchableOpacity>
		);
	}

	renderResponse() {
		if (this.state.response === null) return null;
		else {
			return (
				<Text style={styles.error}>
					{ this.state.response }
				</Text>
			);
		}
	}

	getTabStyles(closed) {
		let newStyles = [ styles.tab ];

		if (closed) newStyles.push(styles.closedTab);

		return newStyles;
	}

	getTabTextStyles(closed) {
		let newStyles = [ styles.tabText ];

		if (closed) newStyles.push(styles.closedTabText);

		return newStyles;
	}

	render() {
		return(
			<View style={styles.wrapper}>
				<View style={styles.logo}>
					<Image
						source={ require('../../assets/logotipo.png') }
						/>
				</View>

				<View style={styles.tabs}>
					<TextLink
						style={this.getTabStyles(!this.state.loginForm)}
						styleLabel={this.getTabTextStyles(!this.state.loginForm)}
						label="Login"
						onPress={
							() => { this.handleFrom(true) }
						}/>

					<TextLink
						style={this.getTabStyles(this.state.loginForm)}
						styleLabel={this.getTabTextStyles(this.state.loginForm)}
						label="Cadastro"
						onPress={
							() => { this.handleFrom(false) }
						}/>
				</View>

				{ this.renderResponse() }

				<View style={styles.container}>
					<FormRow label="Usuário">
						<TextInput
							style={styles.input}
							placeholder="seu.nome@email.com"
							value={this.state.email}
							onChangeText={ value => { this.onChangeText('mail', value) } } />
					</FormRow>

					<FormRow label="Senha">
						<TextInput
							style={styles.input}
							placeholder="*****************"
							secureTextEntry={true}
							value={this.state.password}
							onChangeText={ value => { this.onChangeText('password', value) } } />
					</FormRow>

					<FormRow>
						{ this.renderLoginButton() }
					</FormRow>
				</View>
			</View>
		);
	}
}

/*
	Primary: 9ccc65
	- Light: cfff95
	- Dark: 6b9b37

	Secondary: 007769 | ffffff
	- Light: 48a697
	- Dark: 00796b | ffffff

	Fonts Gray: 212121

	Alerts:
	Red d50000 | fffffff
	Blue 40c4ff | 000000
	Green b2ff59 | 000000
	Yellow eeff41 | 000000
*/

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	},
	container: {
		paddingLeft: 25,
		paddingRight: 25,
		paddingBottom: 15,
		backgroundColor: '#ffffff',
		marginBottom: 25,
		marginLeft: 25,
		marginRight: 25,
		borderBottomLeftRadius:15,
		borderBottomRightRadius:15,
	},
	title: {
		fontSize: 32,
		textAlign: 'center',
		fontWeight: '900',
		color: '#00796b'
	},
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		backgroundColor: '#ffffff',
		borderBottomWidth: 1,
		borderBottomColor: '#6b9b37',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 18
	},
	button: {
		backgroundColor: '#00796b',
		borderRadius: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		textAlign: 'center',
	},
	error: {
		color: '#FFFFFF',
		fontSize: 12,
		textAlign: 'center',
		padding: 7,
		backgroundColor: '#d50000',
		marginLeft: 25,
		marginRight: 25,
	},
	tabs: {
		flexDirection: 'row',
		marginLeft: 25,
		marginRight: 25,
		marginTop: 20,
		backgroundColor: '#ffffff',
		borderTopLeftRadius:15,
		borderTopRightRadius:15,
	    marginBottom: 0,
	    paddingBottom: 0,
	    height: 60,
	},
	tab: {
		flex: 1,
	},
	tabText: {
		textAlign: 'center',
		padding: 15,
		fontSize: 16,
		color: '#00796b',
	},
	closedTab: {
		backgroundColor: '#e0e0e0',
	},
	closedTabText: {
		color: '#cccccc'
	}
});

export default connect(null, { doLogin, register })(LoginPage)