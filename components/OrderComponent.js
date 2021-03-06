import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	Button,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import DialogInput from 'react-native-dialog-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default class OrderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			carmodal: false,
			timemodal: false,
			oldcar: '',
			newcar: '',
			TimetoPickUp: '',
		};
	}
	async compilePDF() {
		//PDF needs to include everything. Try to format it like an actual receipt
		//Center, receipt. Include costs and food items.
		//Everything can be access by this.props.blank
		//this.props.order.OrderID
		//this.props.order.FoodItems
		//this.props.order. you get the idea
		const order = this.props;
		if (order.Status === 'Incomplete') {
			alert('Order is not complete yet!');
			return;
		}
		// console.log(this.props);
		// console.log(this.props.order.FoodItems);
		// console.log(order.FoodItems);
		const foodString = order.FoodItems.map((foodItem, index) => {
			////Only print first few items
			// console.log(index);
			if (index === order.FoodItems.length - 1) {
				return ' and ' + foodItem + '.';
			} else {
				return ' ' + foodItem;
			}
		});
		const html =
			'<h1 style = "text-align: center; font-size: 50px"> Badger Bytes! </h1><h1 style = "text-align: center"> Your Meal Receipt! </h1>' +
			'<h2 style = "text-align: center"> Date: ' +
			moment(order.CreatedTime).calendar() +
			' </h2>' +
			'<h3 style = "text-align: center"> Cost: $' +
			order.TotalCost +
			' </h3><h2 style = "text-align: center; margin-bottom: 50px">' +
			foodString +
			'</h2><h4 style = "text-align: center">Pick up Car: ' +
			order.CarDescription +
			'<br/>Pick up Time: ' +
			moment(order.TimetoPickUp).calendar() +
			' </h4><h2 style = "text-align: center; margin-top: 200px">Order ID: <br/>' +
			order.OrderID +
			'</h2>';
		const { uri } = await Print.printToFileAsync({ html });
		Sharing.shareAsync(uri);
	}
	changeTimetoPickUp(time) {
		// console.log(time);
		if (time < new Date()) {
			alert('Invalid Date. Pick a time after today.');
		} else if (this.props.Status === 'Incomplete') {
			alert("Order is not completed yet. Can't pickup order yet.");
		} else {
			this.setState({ TimetoPickUp: time, timemodal: false });
			console.log(
				JSON.stringify({ OrderID: this.props.OrderID, TimetoPickUp: time })
			);
			//Make fetch call
			fetch('https://ripple506.herokuapp.com/AddPickUpInfo', {
				method: 'POST',
				headers: {
					'Accept': '*/*',
					'Connection': 'Keep-Alive',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					OrderID: this.props.OrderID,
					TimetoPickUp: time,
				}),
			})
				.then((response) => response.json())
				.then(async (json) => {
					if (json.Status) {
						alert('Successfully Updated Pickup Time');
						this.props.orderCallback();
					}
				});
		}
	}
	changeCar(car) {
		if (car === undefined) {
			alert('No Car Description.');
			return;
		} else {
			this.setState({ carmodal: false, car: car });
		}
		console.log(
			JSON.stringify({ OrderID: this.props.OrderID, CarDescription: car })
		);
		//Make fetch call
		fetch('https://ripple506.herokuapp.com/AddPickUpInfo', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				OrderID: this.props.OrderID,
				CarDescription: car,
			}),
		})
			.then((response) => response.json())
			.then(async (json) => {
				if (json.Status) {
					alert('Successfully Updated Car Description Time');
					this.props.orderCallback();
				}
			});
	}
	render() {
		//replace with props.order eventually

		const order = this.props;

		let pickuptime = '';
		if (order.TimetoPickUp !== '') {
			pickuptime = moment(order.TimetoPickUp).calendar();
			// console.log(moment(order.TimetoPickUp).calendar());
		}

		let timemodal = (
			<DateTimePickerModal
				isVisible={this.state.timemodal}
				mode='time'
				headerTextIOS='Choose a pickup time'
				onConfirm={(time) => this.changeTimetoPickUp(time)}
				onCancel={() => this.setState({ timemodal: false })}
			/>
		);
		let carmodal = (
			<DialogInput
				isDialogVisible={this.state.carmodal}
				title={'Enter Car Description'}
				message={'Help us identify you for picking up food'}
				hintInput={order.CarDescription}
				submitInput={(inputText) => {
					this.changeCar(inputText);
				}}
				closeDialog={() => this.setState({ carmodal: false })}></DialogInput>
		);
		if (order.Status === 'Complete' && order.TimetoPickUp === '') {
			pickuptime = 'Need to schedule!';
		} else if (order.Status === 'Incomplete') {
			pickuptime = 'Not ready yet!';
		}

		return (
			<View style={styles.mealcard}>
				{carmodal}
				{timemodal}
				<View style={styles.row}>
					<Text style={{ fontWeight: '500', fontSize: 40 }}>
						Status: {order.Status}
					</Text>
				</View>
				{/* <View style={styles.row}>
					<Text style={{ fontWeight: '400', fontSize: 16 }}>
						Pick up Time: {pickuptime}
					</Text>
				</View> */}
				<View style={styles.row}>
					<Text style={{ fontWeight: '400', fontSize: 20 }}>Pickup:</Text>
					<Text style={{ fontWeight: '600', fontSize: 20 }}>{pickuptime}</Text>
				</View>
				<View style={styles.row}>
					<Text style={{ fontWeight: '400', fontSize: 20 }}>Cost:</Text>
					<Text style={{ fontWeight: '600', fontSize: 20 }}>
						{order.TotalCost}
					</Text>
				</View>
				{/* <Text>Your Car: {order.CarDescription}</Text> */}
				<View style={styles.row}>
					<Text style={{ fontWeight: '400', fontSize: 20 }}>Your Car:</Text>
					<Text style={{ fontWeight: '600', fontSize: 20 }}>
						{order.CarDescription}
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						paddingBottom: 10,
						marginTop: 10,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<TouchableOpacity
						title='Update Pickup Time'
						style={styles.buttonright}
						onPress={() => this.setState({ timemodal: true })}>
						<Text>Update Pickup Time </Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonright}
						title='Change Car'
						onPress={() => this.setState({ carmodal: true })}>
						<Text>Change Car </Text>
					</TouchableOpacity>
				</View>

				<View style={styles.spaceVertical}></View>
				<Text style={{ fontWeight: '500', fontSize: 16 }}>
					Some of the items on this meal were:
				</Text>
				<View style={styles.row}>
					<Text>
						{order.FoodItems.map((foodItem, index) => {
							////Only print first few items
							if (index > 2) return '';
							let returnString = foodItem;
							if (
								//Deliminter by comma
								index != 2 &&
								index != order.FoodItems.length - 1
							) {
								returnString += ', ';
							}
							return returnString + ' ';
						})}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.button}
					title='Compile Receipt'
					onPress={() => this.compilePDF()}>
					<Text>View Full Receipt </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	foodcard: {
		alignItems: 'center',
		marginBottom: 7,
		marginTop: 7,
		marginLeft: 5,
		borderColor: '#5EA9F4',
		borderWidth: 1,
		width: 150,
	},
	mealtitle: {
		textAlign: 'left',
		marginRight: 10,
	},
	mealcard: {
		width: '100%',
		marginBottom: 7,
		marginTop: 7,
		borderColor: '#5EA9F4',
		borderWidth: 2,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center', // Centered horizontally
		justifyContent: 'center', //Centered vertically
		backgroundColor: 'limegreen',
		padding: 5,
	},
	row: {
		flexDirection: 'row',
		paddingBottom: 10,
	},
	spaceVertical: {
		height: 15,
	},
	input: {
		width: 200,
		padding: 10,
		margin: 5,
		height: 40,
	},
	timeinput: {
		width: '50%',
		borderColor: '#5EA9F4',
		borderWidth: 1,
	},
	buttonright: {
		borderWidth: 1,
		height: 42,
		marginLeft: 20,
		marginRight: 20,
		// width: '40%',
		justifyContent: 'center',
		borderRadius: 40,
		backgroundColor: 'orange',
		padding: 4,
		// marginLeft: 10,
	},
});
