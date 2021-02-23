import React, { Component } from 'react';
import {
	TouchableOpacity,
	TextInput,
	View,
	Text,
	ScrollView,
} from 'react-native';
import ActiveOrderComponent from './ActiveOrderComponent';
export default class ActiveOrdersScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { orders: [] };
	}

	componentDidMount() {
		// this._unsubscribe = this.props.navigation.addListener('focus', () => {
		this.fetchData();
		// });
	}
	componentWillUnmount() {
		// this._unsubscribe();
	}
	// orderCallback() {
	// 	this.fetchData();
	// }
	fetchData() {
		fetch('https://ripple506.herokuapp.com/ViewActiveOrders', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ UserName: 'JunyuTest' }),
		})
			// .then((response) => response.json())
			.then((response) => response.json())

			.then(async (json) => {
				// console.log(json);
				this.setState({ orders: json });
			});
	}

	getOrderItems() {
		const { orders } = this.state;
		let orderComponents = [];
		for (let i = 0; i < orders.length; i++) {
			// console.log(i);
			// console.log(orders[i]);
			// console.log(orders[i]);
			orderComponents.push(
				<ActiveOrderComponent
					orderCallback={() => this.fetchData()}
					key={i}
					orderID={orders[i]}
				/>
			);
		}
		if (orders.length === 0) {
			return <Text>There are no active orders. Congrats!</Text>;
		}
		return orderComponents;
	}
	render() {
		return (
			<ScrollView>
				<View
					style={{
						width: '95%',
						height: '95%',
						justifyContent: 'center',
						paddingTop: '30%',
						alignSelf: 'center',
						alignContent: 'center',
						alignItems: 'center',
					}}>
					<Text
						style={{ fontWeight: '700', fontSize: 30, paddingBottom: '10%' }}>
						Active Orders!
					</Text>

					{this.getOrderItems()}

					{/* <OrderItem key={1} /> */}
				</View>
			</ScrollView>
		);
	}
}
