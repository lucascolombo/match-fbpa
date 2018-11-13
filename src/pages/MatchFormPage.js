import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';

import FormRow from '../components/FormRow';
import { setField } from '../actions';

const API_KEY = 'AIzaSyCT5aNAFhLOdPIb50hyWXOIiAYeG4SnqGg';

class MatchFormPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log(this.props.match);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.match);
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					onPress={
						() => {
							this.props.navigation.navigate('MapSetLocation');
						}
					}
					>
					<Text>Selecionar Localização</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const mapStateToProps = (state) => {
	return {
		match: state.match
	}
}

const mapDispatchToProps = {
	setField
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchFormPage)