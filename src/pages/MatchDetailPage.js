import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';

class MatchDetailPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			match: null,
			confirmedPlayers: [],
			loading: false,
			URConfirmed: false,
		}

		this.renderPlayers = this.renderPlayers.bind(this);
		this.renderButton = this.renderButton.bind(this);
		this.openLocation = this.openLocation.bind(this);
		this.removeMe = this.removeMe.bind(this);
		this.confirmMe = this.confirmMe.bind(this);
		this.loadPlayers = this.loadPlayers.bind(this);
	}

	loadPlayers(confirmedPlayers) {
		this.setState({ URConfirmed: false });
		let newConfirmedPlayers = [];

		confirmedPlayers.forEach((player) => {
			if (player !== this.props.user.user.uid)
				firebase
				.database()
				.ref('/users/' + player)
				.once('value')
				.then((snapshot) => {
					newConfirmedPlayers.push( (snapshot.val() && snapshot.val().name) || 'Jogador' );

					setTimeout(() => {
						this.setState({ confirmedPlayers: newConfirmedPlayers })
					}, 200);
				});
			else {
				newConfirmedPlayers.push( 'Você' );

				setTimeout(() => {
					this.setState({ confirmedPlayers: newConfirmedPlayers, URConfirmed: true })
				}, 200);
			}
		});
	}

	componentWillMount() {
		const { match } = this.props.navigation.state.params;

		if (this.props.user === null)
			this.props.navigation.replace('Login');

		this.setState({ match: match });
		this.loadPlayers(match.confirmedPlayers);
	}

	renderPlayers(match) {
		let count = 0;

		return this.state.confirmedPlayers.map((username) => {
			count++;

			let colorIcon = username === 'Você' ? '#00796b' : '#cccccc';
			let sizeIcon = username === 'Você' ? 22 : 18;
			username = username === 'Jogador' ? ( username + ' ' + count ) : username;

			return (<View style={styles.singleMatchRow} key={count}>
				<Icon
					name='user'
					type='entypo'
					color={colorIcon}
					iconStyle={{
						fontSize: sizeIcon,
					}} />

				<Text style={styles.singlePlayerName}>{username}</Text>

				<Icon
					name='check'
					type='entypo'
					color='#9ccc65'
					iconStyle={{
						fontSize: 22,
					}} />
			</View>);
		});
	}

	updateMatch(newMatch, confirmedPlayers) {
		firebase
		.database()
		.ref('/matchs/' + newMatch.id)
		.set(newMatch)
		.then(() => {
			this.loadPlayers(confirmedPlayers);
			setTimeout(() => {
				this.setState({ match: newMatch, loading: false });
			}, 1000)
		});
	}

	removeMe(match) {
		this.setState({ loading: true });

		let confirmedPlayers = [];

		match.confirmedPlayers.forEach((player) => {
			if (player !== this.props.user.user.uid)
				confirmedPlayers.push(player);
		});

		let newMatch = {
			...match,
			confirmedPlayers
		}

		this.updateMatch(newMatch, confirmedPlayers);
	}

	confirmMe(match) {
		this.setState({ loading: true });

		let confirmedPlayers = match.confirmedPlayers;

		confirmedPlayers.push(this.props.user.user.uid);

		let newMatch = {
			...match,
			confirmedPlayers
		}

		this.updateMatch(newMatch, confirmedPlayers);
	}

	renderButton(match) {
		let button = null;
		let URConfirmed = this.state.URConfirmed;

		if (match.owner !== this.props.user.user.uid) {
			let text = URConfirmed ? 'Desconfirmar ' : 'Confirmar ';
			let background = { backgroundColor: URConfirmed ? '#d50000' : '#00796b' }

			button = this.state.loading ?
				(<ActivityIndicator />)	:
				(
					<TouchableOpacity
						style={[styles.confirmButton, background]}
						onPress={ () => {
							if (URConfirmed)
								this.removeMe(match);
							else
								this.confirmMe(match);
						}}
						>
						<Text style={styles.confirmButtonText}>{text}</Text>
						<Icon
							name='check'
							type='material-community'
	  						color='#ffffff'/>
					</TouchableOpacity>
				);

			button = (<View style={styles.confirmButtonView}>{button}</View>);
		}

		return button;
	}

	openLocation() {
		const { match } = this.props.navigation.state.params;

		this.props.navigation.navigate('LocationMap', { match });
	}

	render() {
		const match = this.state.match;

		if (match !== null)
			return(
				<View style={styles.container}>
					<View style={styles.singleMatchRow}>
						<Text style={styles.singleMatchTitle}>
							{ match.address }
						</Text>
						<TouchableOpacity
							style={styles.seeMap}
							onPress={ () => { this.openLocation(); } }>
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

					<ScrollView style={styles.containerList}>
						{ this.renderPlayers(match) }
					</ScrollView>

					{ this.renderButton(match) }
				</View>
			);
		else return null;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerList: {
		flex: 1,
		marginBottom: 70,
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
	},
	singlePlayerName: {
		color: '#00796b',
		fontSize: 20,
		flex: 1,
		paddingLeft: 15,
	},
	confirmButton: {
		color: '#ffffff',
		padding: 7,
		flex: 1,
		color: '#ffffff',
		flexDirection: 'row',
    	borderRadius: 5,
    	justifyContent: 'center',
    	alignItems: 'center',
    	width: '95%',
    	borderTopWidth: 0,
	},
	confirmButtonText: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 20,
		flex: 1,
	},
	confirmButtonView: {
		justifyContent: 'center',
    	alignItems: 'center',
    	padding: 10,
    	position: 'absolute',
    	elevation: 1,
    	width: '100%',
    	justifyContent: 'center',
    	alignItems: 'center',
    	bottom: 0,
	}
});

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, null)(MatchDetailPage)