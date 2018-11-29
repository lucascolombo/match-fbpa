import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class MapSetLocationPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount(nextProps, props) {
		if (this.props.user === null)
			this.props.navigation.replace('Login');
	}

	render() {
		const { match } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					region={{
						latitude: match.latitude,
						longitude: match.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
					showsUserLocation={true}
					followUserLocation={true}
					>
					<Marker
			          coordinate={{
			            latitude: match.latitude,
			            longitude: match.longitude,
			          }}
			        />
				</MapView>
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
});