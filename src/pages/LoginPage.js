import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
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
			name: '',
			mail: '',
			password: '',
			loading: false,
			response: null,
			loginForm: true
		}

		this.renderNameField = this.renderNameField.bind(this);
	}

	componentWillMount() {
		const config = {
			apiKey: "AIzaSyA2Qwl2FLPUl66VNcsCilnqAOtsYih_UIM",
  			authDomain: "vollers-a7c79.firebaseapp.com",
  			databaseURL: "https://vollers-a7c79.firebaseio.com",
  			projectId: "vollers-a7c79",
  			storageBucket: "vollers-a7c79.appspot.com",
  			messagingSenderId: "507955927643",
		};

		firebase.initializeApp(config);

		// firebase.auth().signInWithEmailAndPassword("penaneto@gmail.com", "123123")
		// .then(user => {console.log("User auth: ", user)} )
		// .catch(error => {console.log("User error: ", error)} );
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
		const { name, mail, password } = this.state;
		const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (mail.trim() === "")
			errors.push("usuário");

		if (password.trim() === "")
			errors.push("senha");

		if (!this.state.loginForm) {
			if (name.trim() === "")
				errors.push("nome");
		}

		if (errors.length > 0) {
			this.setState( { response: `Preencha os campos: ${errors.join(', ')}!` } );

			return false;
		}

		if (!regexMail.test(mail)) {
			this.setState( { response: `Campo de usuário deve ser um e-mail!` } );

			return false;
		}

		if (password.trim().length < 6) {
			this.setState( { response: `Senha precisa ser de menos 6 caracteres!` } );

			return false;
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
		const { name, mail, password } = this.state;
		this.setState( { loading: true, response: null } );

		this.props.register({ name, mail, password })
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

		let label = this.state.loginForm ? 'Acessar' : 'Cadastrar';

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

	renderNameField() {
		if (this.state.loginForm)
			return null;

		return (
			<FormRow label="Usuário">
				<TextInput
					style={styles.input}
					placeholder="Seu Nome"
					value={this.state.name}
					onChangeText={ value => { this.onChangeText('name', value) } }/>
			</FormRow>
		);
	}

	render() {
		return(
			<ScrollView style={styles.wrapper}>
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
					{ this.renderNameField() }

					<FormRow label="Usuário">
						<TextInput
							style={styles.input}
							placeholder="seu.nome@email.com"
							value={this.state.email}
							onChangeText={ value => { this.onChangeText('mail', value) } }
							keyboardType="email-address"
							autoCapitalize = 'none' />
					</FormRow>

					<FormRow label="Senha">
						<TextInput
							style={styles.input}
							placeholder="*****************"
							secureTextEntry={true}
							value={this.state.password}
							onChangeText={ value => { this.onChangeText('password', value) } }
							autoCapitalize = 'none' />
					</FormRow>

					<FormRow>
						{ this.renderLoginButton() }
					</FormRow>
				</View>
			</ScrollView>
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
		flex: 1,
		paddingTop: 50,
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