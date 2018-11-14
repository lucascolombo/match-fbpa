import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
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
				<View style={styles.singleMatchTouchableContent}>
					<View style={styles.singleMatchRow}>
						<Icon
							name='location-pin'
							type='entypo'
							color='#9ccc65'
							iconStyle={{
								fontSize: 16,
								flex: 1,
							}} />
						<Text style={styles.singleMatchTitle}>
							{ match.address }
						</Text>
					</View>
					<View style={styles.singleMatchRow}>
						<Icon
							name='calendar'
							type='entypo'
							color='#cccccc'
							iconStyle={{
								fontSize: 12,
								flex: 1,
							}} />
						<Text style={styles.singleMatchDate}>
							{ match.datetime }
						</Text>
					</View>
				</View>
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
				<ScrollView>
					{ this.renderMatchList() }
				</ScrollView>
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
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc',
		flexDirection: 'row',
	},
	singleMatchTitle: {
		fontSize: 14,
		color: '#666666',
		marginBottom: 7,
		paddingLeft: 5,
	},
	singleMatchDate: {
		color: '#999999',
		fontSize: 11,
		paddingLeft: 10,
	},
	singleMatchTouchableContent: {
		padding: 10,
		width: '90%'
	},
	singleMatchRow: {
		flexDirection: 'row',
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