import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import FormRow from '../components/FormRow';
import { setField, saveMatch } from '../actions';

const API_KEY = 'AIzaSyCT5aNAFhLOdPIb50hyWXOIiAYeG4SnqGg';

class MatchFormPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		}

		this.getSetLocationButton = this.getSetLocationButton.bind(this);
		this.getDatePicker = this.getDatePicker.bind(this);
		this.renderSaveButton = this.renderSaveButton.bind(this);
		this.validate = this.validate.bind(this);
		this.save = this.save.bind(this);
	}

	componentWillMount() {
		if (this.props.user === null)
			this.props.navigation.replace('Login');
	}

	getSetLocationButton() {
		let { address, latitude, longitude } = this.props.match;

		let label = `Selecionar${"\n"}Localização`;
		let labelClass = [ styles.selectAddressText ];
		let iconColor = '#cccccc';

		if (address !== "" && latitude !== 0 && longitude !== 0) {
			label = address;
			labelClass.push( styles.selectedAddressText );
			iconColor = '#9ccc65';
		}

		return(
			<TouchableOpacity
				style={styles.selectAddress}
				onPress={
					() => {
						this.props.navigation.navigate('MapSetLocation');
					}
				}
				>
				<Text style={labelClass}>
					{label}
				</Text>
				<Icon
					name='location-pin'
					type='entypo'
					color={iconColor}
					iconStyle={{
						fontSize: 50,
					}}
					containerStyle={{
						flex: 1,
						right: 0,
						padding: 5,
						position: 'absolute'
					}} />
			</TouchableOpacity>
		);
	}

	getDatePicker() {
		let { datetime } = this.props.match;

		return (
			<DatePicker
				style={ { width: 250 } }
				date={ datetime }
				mode="datetime"
				format="DD/MM/YYYY HH:mm"
				minDate={ moment().format('DD/MM/YYYY HH:mm') }
				confirmBtnText="Confirmar"
				cancelBtnText="Cancelar"
				customStyles={{
					dateInput: {
						borderWidth: 0,
						margin: 0,
						padding: 0,
						alignItems: 'flex-start',
					},
					dateTouchBody: {
    					paddingTop: 20,
					},
				}}
				showIcon={false}
				onDateChange={
					(date) => {
						this.props.setField('datetime', date);
					}
				}
				/>
		);
	}

	validate() {
		let { address, latitude, longitude } = this.props.match;

		if (address === "" || latitude === 0 || longitude === 0)
			return false;
		else
			return true;
	}

	save() {
		this.setState( { loading: true } );

		let newMatch = {
			...this.props.match,
			owner: this.props.user.user.uid,
			confirmedPlayers: [ this.props.user.user.uid ]
		};

		this.props.saveMatch( newMatch )
		.then(() => {
			this.props.navigation.goBack();
		})
		.catch( () => {
			this.setState( { loading: false } );
			Alert.alert('Erro','Não foi possível realizar o cadastro.');
		});
	}

	getCounterPlayers() {
		let { players } = this.props.match;

		return (
			<View style={styles.counterContent}>
				<TouchableOpacity
					style={styles.btnCounter}
					onPress={ () => { if (players > 0) this.props.setField('players', players - 1); } }
					>
					<Icon
						name='minus'
						type='entypo'
						color='#000000'/>
				</TouchableOpacity>
				<Text style={styles.countPlayers}>
					{ players }
				</Text>
				<TouchableOpacity
					style={styles.btnCounter}
					onPress={ () => { this.props.setField('players', players + 1); } }
					>
					<Icon
						name='plus'
						type='entypo'
						color='#000000'/>
				</TouchableOpacity>
			</View>
		);
	}

	renderSaveButton() {
		if (this.state.loading) {
			return (<ActivityIndicator />);
		}

		return (
			<TouchableOpacity
				style={styles.button}
				onPress={ () => {
						if (this.validate()) {
							this.save();
						}
						else {
							Alert.alert('Erro na Localização','Antes de prosseguir selecione a localização do seu jogo.');
						}
					}
				}
				>
				<Text style={styles.buttonText}>Salvar</Text>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.line}>
					{ this.getSetLocationButton() }
				</View>
				<View style={[ styles.line, styles.customContent]}>
					<Text style={styles.fieldLabel}>
						Quando?
					</Text>
					{ this.getDatePicker() }
					<Icon
						name='calendar'
						type='entypo'
						iconStyle={{
							fontSize: 30,
						}}
						color='#cccccc'
						containerStyle={{
							flex: 1,
							right: 0,
							padding: 5,
							marginRight: 9,
							marginTop: 8,
							position: 'absolute'
						}} />
				</View>
				<View style={[ styles.line, styles.customContent]}>
					<Text style={styles.fieldLabel}>
						Quanto?
					</Text>
					<TextInput
						style={styles.input}
						value={this.props.match.price.toString()}
						onChangeText={ value => { this.props.setField('price', value); } }
						keyboardType="decimal-pad" />
					<Icon
						name='attach-money'
						type='MaterialIcons'
						iconStyle={{
							fontSize: 30,
						}}
						color='#cccccc'
						containerStyle={{
							flex: 1,
							right: 0,
							padding: 5,
							paddingRight: 4,
							marginRight: 9,
							marginTop: 8,
							position: 'absolute'
						}} />
				</View>
				<View>
					<Text style={styles.countLabel}>
						Quantos jogadores faltam?
					</Text>
					{ this.getCounterPlayers() }
					<Text style={styles.countPS}>
						Este número já exclui você da contagem.
					</Text>
				</View>

				{ this.renderSaveButton() }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	line: {
		borderBottomWidth: 2,
		borderBottomColor: '#cccccc',
	},
	selectAddress: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 70,
		flexDirection: 'row',
		height: 70,
	},
	selectAddressText: {
		color: '#999999',
		flex: 1,
		fontSize: 18,
	},
	selectedAddressText: {
		color: '#00796b',
		fontSize: 12,
	},
	customContent: {
		flexDirection: 'row',
		height: 60,
	},
	fieldLabel: {
		color: '#999999',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
	},
	counterContent: {
		flexDirection: 'row',
		paddingTop: 20,
		paddingBottom: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	countLabel: {
		paddingTop: 20,
		textAlign: 'center',
		color: '#999999',
		paddingBottom: 10,
	},
	countPlayers: {
		fontSize: 22,
		color: '#00796b',
		height: 50,
		paddingTop: 9,
		paddingRight: 20,
		paddingLeft: 20,
		marginRight: 15,
		marginLeft: 15,
	},
	btnCounter: {
		fontSize: 22,
		color: '#00796b',
		backgroundColor: '#9ccc65',
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: 'center',
    	alignItems: 'center',
	},
	countPS: {
		paddingTop: 5,
		paddingBottom: 10,
		textAlign: 'center',
		fontSize: 10,
		color: '#bbbbbb'
	},
	button: {
		backgroundColor: '#00796b',
		borderRadius: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		margin: 10,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		textAlign: 'center',
	},
	input: {
		backgroundColor: 'transparent',
		color: '#333333',
		flex: 1,
		paddingLeft: 5,
	}
});

const mapStateToProps = (state) => {
	return {
		match: state.match,
		user: state.user
	}
}

const mapDispatchToProps = {
	setField,
	saveMatch
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchFormPage)