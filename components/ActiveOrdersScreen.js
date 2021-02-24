import React, { Component } from 'react';
import {
	TouchableOpacity,
	TextInput,
	View,
	Text,
	ScrollView,
	StyleSheet,
} from 'react-native';
import ActiveOrderComponent from './ActiveOrderComponent';
export default class ActiveOrdersScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { orders: [], activemode: true };
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
		// console.log('FETCHING DATA CALLED');
		fetch('https://ripple506.herokuapp.com/PrintOrderByPriority', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		})
			// .then((response) => response.json())
			.then((response) => response.json())

			.then(async (json) => {
				// console.log(json);
				this.setState({ orders: json });
			});
	}
	// refreshOrders(){
	// 	this.fetchData();
	// }
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
					order={orders[i]}
					activemode={this.state.activemode}
					// refreshOrders={() => this.refreshOrders()}
				/>
			);
		}
		if (orders.length === 0) {
			return <Text>There are no active orders. Congrats!</Text>;
		}
		return orderComponents;
	}
	render() {
		// console.log('ACTIVE MODE: ' + this.state.activemode);
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
						style={{ fontWeight: '700', fontSize: 30, paddingBottom: '5%' }}>
						Active Orders!
					</Text>
					<TouchableOpacity
						title='Set Active Order'
						style={styles.button}
						onPress={() =>
							this.setState({ activemode: !this.state.activemode })
						}>
						<Text style={{ fontWeight: '700', fontSize: 20 }}>
							Toggle Active Mode from: {this.state.activemode.toString()}{' '}
						</Text>
					</TouchableOpacity>

					{this.getOrderItems()}

					{/* <OrderItem key={1} /> */}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center', // Centered horizontally
		justifyContent: 'center', //Centered vertically
		backgroundColor: 'orange',
		padding: 5,

		marginBottom: '5%',
	},
});
