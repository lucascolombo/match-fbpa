import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class MainPage extends Component {
	componentWillMount() {
		// -- PEGAR GEOLOCALIZAÇÃO DO USER
		// navigator.geolocation.getCurrentPosition(
		// 	position => {
		// 		this.setState({
		//           latitude: position.coords.latitude,
		//           longitude: position.coords.longitude,
		//           error: null,
		//         });
		// 	},
		// 	error => {
		// 		this.setState({ error: error.message })
		// 	},
		// 	{
		// 		enableHighAccuracy: true,
		// 		timeout: 20000,
		// 		maximumAge: 1000
		// 	}
		// );
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					style={styles.fab}
					onPress={
						() => {
							this.props.navigation.navigate('MatchForm');
						}
					}
					>
					<Icon
						name='plus'
						type='material-community'
  						color='#000000' />
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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