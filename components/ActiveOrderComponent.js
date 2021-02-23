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
	}
	compilePDF() {
		console.log('Compile PDF Functionality Yet to be Implemented');
	}
	markComplete() {
		console.log('MARK COMPLETE CALLED');
		console.log(
			JSON.stringify({ OrderID: this.props.orderID, Status: 'Complete' })
		);
		alert('Waiting API for functionality');
		return;
		fetch('https://ripple506.herokuapp.com/UpdateOrder', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ OrderID: this.props.orderID, Status: 'Complete' }),
		})
			// .then((response) => response.json())
			.then((response) => response.json())

			.then(async (json) => {
				console.log(json);
				// this.setState({ order: json });
				// console.log(json);
				if (json.Status) {
					alert('Order marked Complete');
				}
			});
	}
	prioritizeOrder() {
		alert('Functionality not implemented');
	}

	componentDidMount() {
		// this._unsubscribe = this.props.navigation.addListener('focus', () => {
		this.fetchData();
		// });
	}
	// componentWillUnmount() {
	// 	this._unsubscribe();
	// }
	// orderCallback() {
	// 	this.fetchData();
	// }

	//Get Receipt data
	fetchData() {
		fetch('https://ripple506.herokuapp.com/GetReceipt', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ OrderID: this.props.orderID }),
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
		// console.log(order);
		// console.log(this.state.order);
		let pickuptime = '';
		let createdtime = '';
		if (order.TimetoPickUp !== '') {
			// console.log(order.TimetoPickUp);
			pickuptime = moment(order.TimetoPickUp).calendar();
			// console.log(moment(order.TimetoPickUp).calendar());
		}
		if (order.CreatedTime !== '') {
			// console.log(order.CreatedTime);

			createdtime = moment(order.CreatedTime).calendar();
			// console.log(moment(order.CreatedTime).calendar());
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
		return (
			<View style={styles.mealcard}>
				{carmodal}
				<View style={styles.row}>
					<Text style={{ fontWeight: '500', fontSize: 20 }}>
						Created at: {createdtime}
					</Text>
					<TouchableOpacity
						style={styles.buttonright}
						title='Priority'
						onPress={this.prioritizeOrder}>
						<Text>Prioritize Order </Text>
					</TouchableOpacity>
				</View>
				<Text style={{ fontWeight: '400', fontSize: 16 }}>
					Pick up Time: {pickuptime}
				</Text>

				<View style={styles.row}>
					<Text>Car Type Picking Up: {order.CarDescription}</Text>
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
		backgroundColor: '#5EA9F4',
		padding: 5,
	},
	buttonleft: {
		backgroundColor: '#5EA9F4',
		padding: 5,
		alignItems: 'center', // Centered horizontally
		justifyContent: 'center', //Centered vertically
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
		borderColor: '#5EA9F4',
		borderWidth: 1,
	},
});
