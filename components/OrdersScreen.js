import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';
import OrderComponent from './OrderComponent';
export default class OrdersScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	getOrderItems() {
		let props = ['DUMMYDATA'];
		let orders = [];
		for (let i = 0; i < props.length; i++) {
			orders.push(<OrderComponent key={i} />);
		}
		return orders;
	}
	render() {
		return (
			<View
				style={{
					width: '95%',
					height: '95%',
					justifyContent: 'center',
					alignSelf: 'center',
					alignContent: 'center',
					alignItems: 'center',
				}}>
				<Text style={{ fontWeight: '700', fontSize: 30 }}>
					Your Previous Orders
				</Text>

				{this.getOrderItems()}

				{/* <OrderItem key={1} /> */}
			</View>
		);
	}
}
