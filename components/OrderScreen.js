import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';

export default class OrderScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<View
				style={{
					width: '50%',
					height: '95%',
					justifyContent: 'center',
					alignSelf: 'center',
					alignContent: 'center',
					alignItems: 'center',
				}}>
				<Text>This is the orders screen of the user.</Text>
			</View>
		);
	}
}
