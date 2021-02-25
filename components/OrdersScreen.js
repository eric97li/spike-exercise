import React, { Component } from 'react';
import {
	TouchableOpacity,
	TextInput,
	View,
	Text,
	ScrollView,
} from 'react-native';
import OrderComponent from './OrderComponent';
export default class OrdersScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { orders: [] };
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.fetchData();
		});
	}
	componentWillUnmount() {
		this._unsubscribe();
	}
	// orderCallback() {
	// 	this.fetchData();
	// }
	fetchData() {
		fetch('https://ripple506.herokuapp.com/GetOrderHistory', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			//NEED TO CHANGE THIS
			body: JSON.stringify({ UserName: 'JunyuTest' }),
		})
			.then((response) => response.json())

			.then(async (json) => {
				this.setState({ orders: json });
				// console.log(json);
				if (json.Status) {
				}
			});
	}

	getOrderItems() {
		const { orders } = this.state;
		let props = ['DUMMYDATA'];
		let orderComponents = [];
		for (let i = 0; i < orders.length; i++) {
			// console.log(i);
			// console.log(orders[i]);
			orderComponents.push(
				<OrderComponent
					orderCallback={() => this.fetchData()}
					key={i}
					dataKey={i}
					OrderID={orders[i].OrderID}
					TimetoPickUp={orders[i].TimetoPickUp}
					TotalCost={orders[i].TotalCost}
					Status={orders[i].Status}
					CarDescription={orders[i].CarDescription}
					CreatedTime={orders[i].CreatedTime}
					FoodItems={orders[i].FoodItems}
					Role={this.Role}
				/>
			);
		}
		if (orders.length === 0) {
			return <Text>You have no orders. Try our menu!</Text>;
		}
		return orderComponents;
	}
	render() {
		console.log('RENDER');
		// console.log(this.props);
		console.log(this.props.username);
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
						style={{
							fontWeight: '700',
							fontSize: 40,
							textAlign: 'center',
							paddingBottom: '10%',
						}}>
						{this.props.username}'s Previous Orders
					</Text>

					{this.getOrderItems()}

					{/* <OrderItem key={1} /> */}
				</View>
			</ScrollView>
		);
	}
}
