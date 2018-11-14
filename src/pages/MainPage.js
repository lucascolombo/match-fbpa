import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { watchMatchList } from '../actions';

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		}

		this.renderMatchList = this.renderMatchList.bind(this);
	}

	componentWillMount() {
		if (this.props.user === null)
			this.props.navigation.replace('Login');

		this.props.watchMatchList();

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

	renderCard(match) {
		return (
			<View style={styles.singleMatch} key={match.id}>
				<Text style={styles.singleMatchTitle}>
					{ match.address }
				</Text>
				<Text style={styles.singleMatchDate}>
					{ match.datetime }
				</Text>
			</View>
		);
	}

	renderMatchList() {
		return this.props.matchList.map( match => { return this.renderCard(match) } );
	}

	render() {
		if (this.props.matchList === null)
			return (<View style={styles.loader}><ActivityIndicator /></View>);

		return (
			<View style={styles.container}>
				<TouchableOpacity
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
				</TouchableOpacity>

				{ this.renderMatchList() }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loader: {
		padding: 25,
	},
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
	},
	singleMatch: {
		padding: 20,
		borderBottomWidth: 2,
		borderBottomColor: '#cccccc',
	},
	singleMatchTitle: {
		fontSize: 16,
		color: '#666666',
		marginBottom: 7,
	},
	singleMatchDate: {
		color: '#999999',
		fontSize: 14,
	}
});

const mapStateToProps = (state) => {
	const matchList = state.matchList;
	let matchListWithId = null;

	if (matchList !== null) {
		const keys = Object.keys(matchList);

		matchListWithId = keys.map(id => {
			return { ...matchList[id], id }
		});
	}

	return {
		user: state.user,
		matchList: matchListWithId
	}
}

export default connect(mapStateToProps, { watchMatchList })(MainPage)