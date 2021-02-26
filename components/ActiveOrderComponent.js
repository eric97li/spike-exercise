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

export default class OrderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			carmodal: false,
			order: {},
		};
		this.fetchData = this.fetchData.bind(this);
		this.increasePriority = this.increasePriority.bind(this);
		this.decreasePriority = this.decreasePriority.bind(this);
	}
	compilePDF() {
		console.log('Compile PDF Functionality Yet to be Implemented');
	}
	markComplete() {
		fetch('https://ripple506.herokuapp.com/UpdateOrder', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				OrderID: this.props.order.OrderID,
				Status: 'Complete',
			}),
		})
			// .then((response) => response.json())
			.then((response) => response.json())

			.then((json) => {
				console.log(json);
				// this.setState({ order: json });
				// console.log(json);
				if (json.Status) {
					this.props.orderCallback();
				} else {
					alert('Error: Server down!');
				}
			});
	}
	increasePriority() {
		if (this.props.order.Priority === '1') {
			alert('Order is at max Priority!');
			return;
		}

		fetch('https://ripple506.herokuapp.com/UpdateOrderPriority', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				OrderID: this.props.order.OrderID,
				Priority: (parseInt(this.props.order.Priority) - 1).toString(),
			}),
		})
			.then((response) => response.json())

			.then(async (json) => {
				// console.log(json);
				// alert(json.Reason);
				if (json.Status) {
					this.props.orderCallback();
					// this.fetchData();
				}
			});
	}
	decreasePriority() {
		if (this.props.order.Priority === '9') {
			alert('Order is at min Priority!');
			return;
		}

		fetch('https://ripple506.herokuapp.com/UpdateOrderPriority', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				OrderID: this.props.order.OrderID,
				Priority: (parseInt(this.props.order.Priority) + 1).toString(),
			}),
		})
			.then((response) => response.json())

			.then(async (json) => {
				// alert(json.Reason);
				if (json.Status) {
					this.props.orderCallback();
					// this.fetchData();
				}
			});
	}

	componentDidMount() {
		this.fetchData();
	}

	//Get Receipt data
	fetchData() {
		fetch('https://ripple506.herokuapp.com/GetReceipt', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ OrderID: this.props.order.OrderID }),
		})
			.then((response) => response.json())

			.then(async (json) => {
				this.setState({ order: json[0] });
				// console.log(json);
				if (json.Status) {
				}
			});
	}
	render() {
		//replace with props.order eventually

		//DEBUG HERE
		const { order } = this.state;

		let pickuptime = '';
		let createdtime = '';
		if (
			order.TimetoPickUp === undefined ||
			order.TimeToPickup === '' ||
			!order.TimetoPickUp.toString().length
		) {
			// console.log('IF' + order.TimetoPickUp);
			pickuptime = 'Not Scheduled!';
		} else if (order.TimetoPickUp !== '') {
			// console.log(order.TimetoPickUp);
			pickuptime = moment(order.TimetoPickUp).calendar();
			if (pickuptime === 'Invalid date') {
				pickuptime = 'Not Scheduled!';
			}
		}
		if (order.CreatedTime !== '') {
			createdtime = moment(order.CreatedTime).calendar();
		}

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

		// console.log(new Date());
		// console.log(order.TimetoPickUp);
		// console.log('Active mode' + this.props.activemode);
		// console.log(Date.parse(order.TimetoPickUp) > new Date());
		// console.log(Date.parse(order.TimetoPickUp) < new Date());
		//If we aren't in active mode and the pickup time is not scheduled yet
		//or after today, don't display

		if (
			(pickuptime === 'Not Scheduled!' ||
				this.props.order.Status === 'Incomplete' ||
				Date.parse(order.TimetoPickUp) > new Date()) &&
			!this.props.activemode
		) {
			// console.log('if' + order.TimetoPickUp);

			return <></>;
		}
		//If we are in active mode and the time to pickup is before, don't display
		else if (
			this.props.order.Status === 'Complete' &&
			Date.parse(order.TimetoPickUp) < new Date() &&
			this.props.activemode
		) {
			// console.log('else ' + order.TimetoPickUp);
			return <></>;
		}
		// else {
		// 	console.log('ELSE:');
		// 	console.log(this.props.order.Status);
		// 	console.log(Date.parse(order.TimetoPickUp) > new Date());
		// 	console.log(this.props.activemode);
		// }
		let carDescription = 'No Car Description';
		if (order.CarDescription !== '') {
			carDescription = order.CarDescription;
		}
		return (
			<View style={styles.mealcard}>
				{carmodal}
				<View style={styles.row}>
					<Text style={{ fontWeight: '500', fontSize: 16 }}>
						Order #{this.props.order.OrderID}
					</Text>
				</View>
				<View style={styles.row}>
					<View style={styles.row}>
						<Text style={{ fontWeight: '500', fontSize: 36 }}>Priority:</Text>
						<Text style={{ fontWeight: '600', fontSize: 36 }}>
							{this.props.order.Priority}
						</Text>
					</View>

					<TouchableOpacity
						style={styles.increaseButton}
						onPress={this.increasePriority}>
						<Text>Increase Priority! </Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<View style={styles.row}>
						<Text style={{ fontWeight: '400', fontSize: 20 }}>Status:</Text>
						<Text style={{ fontWeight: '600', fontSize: 20 }}>
							{this.props.order.Status}
						</Text>
					</View>
					<TouchableOpacity
						style={styles.decreaseButton}
						title='Priority'
						onPress={this.decreasePriority}>
						<Text>Decrease Priority! </Text>
					</TouchableOpacity>
				</View>

				<View style={{ flexDirection: 'row', paddingBottom: 6, marginTop: 20 }}>
					<Text style={{ fontWeight: '400', fontSize: 20 }}>Pickup Time:</Text>
					<Text style={{ fontWeight: '600', fontSize: 20 }}>{pickuptime}</Text>
				</View>
				<View style={styles.row}>
					<Text style={{ fontWeight: '400', fontSize: 20 }}>Car:</Text>
					<Text style={{ fontWeight: '600', fontSize: 20 }}>
						{carDescription}
					</Text>
				</View>
				<View style={styles.row}>
					<Text style={{ fontWeight: '400', fontSize: 20 }}>
						Created at: {createdtime}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.button}
					title='Mark Complete'
					onPress={this.markComplete.bind(this)}>
					<Text>Mark Complete </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	increaseButton: {
		borderWidth: 1,
		height: 42,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
		backgroundColor: '#5EA9F4',
		alignSelf: 'center',
		textAlign: 'center',
		right: 0,
		position: 'absolute',
		padding: 5,
		paddingLeft: 12, //align with decrease button
	},
	decreaseButton: {
		borderWidth: 1,
		height: 42,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
		backgroundColor: '#fa6243',
		alignSelf: 'center',
		textAlign: 'center',
		right: 0,
		position: 'absolute',
		padding: 5,
	},
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
		paddingBottom: 6,
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
});
