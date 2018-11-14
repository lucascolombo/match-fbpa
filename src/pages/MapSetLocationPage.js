import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { setField } from '../actions';

const API_KEY = 'AIzaSyCT5aNAFhLOdPIb50hyWXOIiAYeG4SnqGg';

class MapSetLocationPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
	      latitude: -30.0381232,
	      longitude: -51.2175319,
	      marker: null,
	      address: '',
	    };

	    this.setLocation = this.setLocation.bind(this);
	}

	componentWillMount(nextProps, props) {
		if (this.props.user === null)
			this.props.navigation.replace('Login');

		if ( this.props.address !== '' && this.props.latitude !== 0 && this.props.longitude !== 0 ) {
			this.onChangeAddress(
				this.props.address,
				{
					lat: this.props.latitude,
					lng: this.props.longitude
				}
			);
		}
	}

	onChangeAddress(address, location) {
		let { lat, lng } = location;

		let newMarker = (
			<Marker
	          coordinate={{
	            latitude: lat,
	            longitude: lng,
	          }}
	        />
		);

		this.setState({ address: address, latitude: lat, longitude: lng, marker: newMarker });
	}

	setLocation() {
		if (this.state.marker) {
			this.props.setField('address', this.state.address);
			this.props.setField('latitude', this.state.latitude);
			this.props.setField('longitude', this.state.longitude);

			this.props.navigation.goBack();
		}
		else {
			Alert.alert('Erro na Localização','Antes de prosseguir selecione a localização do seu jogo.');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					region={{
						latitude: this.state.latitude,
						longitude: this.state.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
					showsUserLocation={true}
					followUserLocation={true}
					>
					{ this.state.marker }
				</MapView>

				<View style={styles.form}>
					<GooglePlacesAutocomplete
						placeholder='Local ou Endereço'
						minLength={2}
						autoFocus={false}
						returnKeyType={'search'}
						fetchDetails={true}
						query={{
							key: API_KEY,
							language: 'pt'
						}}
						onPress={(data, details = null) => {
							this.onChangeAddress(data.description, details.geometry.location);
						}}
						styles={{
							container: {
								backgroundColor: '#ffffff',
								paddingLeft: 5,
								paddingRight: 5,
								paddingTop: 2,
								paddingBottom: 2,
								borderBottomWidth: 1,
								borderBottomColor: '#6b9b37',
							},
							textInputContainer: {
								backgroundColor: '#ffffff',
								borderTopWidth: 0,
								borderBottomWidth: 0,
							},
							textInput: styles.input,
							description: {
								fontWeight: 'bold',
								margin: 0,
								padding: 0,
							},
							predefinedPlacesDescription: {
								color: '#1faadb',
							}
						}}
						nearbyPlacesAPI='GooglePlacesSearch'
						listViewDisplayed={ false }
				    />
				</View>

				<TouchableOpacity
					style={styles.fab}
					onPress={ () => { this.setLocation(); } }
					>
					<Icon
						name='check'
						type='material-community'
  						color='#000000' />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
    	...StyleSheet.absoluteFillObject,
  	},
  	form: {
		padding: 15,
		position: 'absolute',
		left: 0,
		top: 0,
		flex: 1,
		elevation: 1,
		width: '99%',
  	},
	input: {
		borderWidth: 0,
		backgroundColor: '#ffffff',
		fontSize: 18,
	},
	fab: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#9ccc65',
		position: 'absolute',
		bottom: 15,
		right: 15,
		justifyContent: 'center',
    	alignItems: 'center',
    	elevation: 1,
	}
});

const mapStateToProps = (state) => {
	return {
		user: state.user,
		address: state.match.address,
		latitude: state.match.latitude,
		longitude: state.match.longitude
	}
}

const mapDispatchToProps = {
	setField
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSetLocationPage)