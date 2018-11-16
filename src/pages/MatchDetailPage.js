import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class MatchDetailPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			match: null
		}
	}

	componentWillMount() {
		if (this.props.user === null)
			this.props.navigation.replace('Login');
	}

	renderPlayers() {
		const { match } = this.props.navigation.state.params;

		return match.confirmedPlayers.map((player) => {
			return (<View style={styles.singleMatchRow} key={player}>
				<Text>{player}</Text>
			</View>)
		});
	}

	render() {
		const { match } = this.props.navigation.state.params;

		return(
			<ScrollView style={styles.container}>

				<View style={styles.singleMatchRow}>
					<Text style={styles.singleMatchTitle}>
						{ match.address }
					</Text>
					<TouchableOpacity style={styles.seeMap}>
						<Icon
							name='location-pin'
							type='entypo'
							color='#ffffff'
							iconStyle={{
								fontSize: 22,
							}} />
							<Text style={styles.seeMapText}>Ver Mapa</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.singleMatchInformation}>
					<View style={styles.singleMatchRow}>
						<Icon
							name='calendar'
							type='entypo'
							color='#cccccc'
							iconStyle={styles.littleIcon} />
						<Text style={styles.singleMatchDate}>
							{ match.datetime }
						</Text>
					</View>

					<View style={styles.singleMatchRow}>
						<Icon
							name='attach-money'
							type='MaterialIcons'
							color='#cccccc'
							iconStyle={[styles.littleIcon, { paddingTop: 1, }]} />
						<Text style={styles.singleMatchPrice}>
							{ ( match.price === "" || parseFloat(match.price) === 0 ? 'Grátis' : match.price) }
						</Text>
					</View>
				</View>

				{ this.renderPlayers() }

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	singleMatchRow: {
		flexDirection: 'row',
		marginBottom: 2,
		padding: 10,
	},
	singleMatchTitle: {
		fontSize: 16,
		color: '#666666',
		paddingLeft: 5,
		paddingRight: 20,
		flex: 1,
	},
	seeMap: {
		width: 65,
		height: 65,
		borderRadius: 35,
		backgroundColor: '#9ccc65',
		justifyContent: 'center',
    	alignItems: 'center',
	},
	seeMapText: {
		fontSize: 11,
		color: '#ffffff',
	},
	singleMatchInformation: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderBottomColor: '#cccccc',
		borderTopColor: '#cccccc',
		paddingTop: 2,
		flexDirection: 'row',
	},
	singleMatchPrice: {
		color: '#00796b',
		fontSize: 12,
		paddingLeft: 5,
	},
	singleMatchDate: {
		color: '#999999',
		fontSize: 12,
		paddingLeft: 7,
	},
	littleIcon: {
		fontSize: 16,
		flex: 1,
		marginLeft: 3,
	}
});

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, null)(MatchDetailPage)