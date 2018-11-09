import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const FormRow = props => {
	const { children, label } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{ label }</Text>

			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 3,
		marginBottom: 3,
	},
	label: {
		color: '#cccccc',
		fontSize: 12,
		marginBottom: 3
	},
});

export default FormRow;