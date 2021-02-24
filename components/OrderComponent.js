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
		const html = `<h1> Your Meal Receipt </h1>`;
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
			console.log(moment(order.TimetoPickUp).calendar());
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
		return (
			<View style={styles.mealcard}>
				{carmodal}
				{timemodal}
				<View style={styles.row}>
					<Text style={{ fontWeight: '500', fontSize: 20 }}>
						Status: {order.Status}
					</Text>
					<TouchableOpacity
						title='Update Pickup Time'
						style={styles.buttonright}
						onPress={() => this.setState({ timemodal: true })}>
						<Text>Update Pickup Time </Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<Text style={{ fontWeight: '400', fontSize: 16 }}>
						Pick up Time: {pickuptime}
					</Text>
				</View>

				<View style={styles.row}>
					<Text>Cost: {order.TotalCost}</Text>
				</View>
				<View style={styles.row}>
					<Text>Picking up in a: {order.CarDescription}</Text>
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
	buttonright: {
		// alignItems: 'center',
		backgroundColor: '#5EA9F4',
		padding: 5,
		position: 'absolute',
		alignItems: 'center', // Centered horizontally
		justifyContent: 'center', //Centered vertically

		right: 0,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center', // Centered horizontally
		justifyContent: 'center', //Centered vertically

		// alignItems: 'center',
		backgroundColor: '#5EA9F4',
		padding: 5,
	},
	buttonleft: {
		// alignItems: 'center',
		backgroundColor: '#5EA9F4',
		padding: 5,
		alignItems: 'center', // Centered horizontally
		justifyContent: 'center', //Centered vertically

		// position: 'absolute',
		// left: 0,
		width: '50%',
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
		// padding: 10,
		// margin: 5,
		// height: 100,
		borderColor: '#5EA9F4',
		borderWidth: 1,
	},
});
