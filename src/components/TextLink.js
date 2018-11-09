import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const TextLink = props => {
	const { style, styleLabel, onPress, label } = props;

	return (
		<TouchableOpacity style={style} onPress={onPress}>
			<Text style={styleLabel}>{label}</Text>
		</TouchableOpacity>
	);
}

export default TextLink;