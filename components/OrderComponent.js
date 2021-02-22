import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import Dialog from 'react-native-dialog';

export default class OrderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { modalvisible: false, car: '', pickuptime: '' };
	}
	compilePDF() {
		console.log('Compile PDF Functionality Yet to be Implemented');
	}
	render() {
		//replace with props.order eventually
		let order = {
			'CarDescription': '',
			'CreatedTime': '2021-02-05 20:28:54',
			'OrderID': 'JunyuTest2021-02-05',
			'Status': 'Incomplete',
			'TimetoPickUp': 'Sun Feb 21 2021 12:16:35 GMT-0500 (EST)',
			'UserName': 'JunyuTest',
			'FoodItems': ['dish1', 'dish2'],
			'TotalCost': '$13.44',
		};
		// order.map((foodItem) => {
		// 	console.log(foodItem[2]);
		// });
		var d = new Date();
		let pickupInfo;
		if (order.Status === 'Incomplete') {
			pickupInfo = (
				<TextInput
					placeholderTextColor='#5EA9F4'
					style={styles.input}
					onChangeText={(text) => this.setState({ car: text })}
					placeholder={'Update Car Description'}
				/>
			);
		}
		// let modal = (
		// 	<View>
		// 		<Dialog.Container visible={this.state.modalvisible}>
		// 			<Dialog.Title>Account delete</Dialog.Title>
		// 			<Dialog.Description>
		// 				Do you want to delete this account? You cannot undo this action.
		// 			</Dialog.Description>
		// 			<Dialog.Input></Dialog.Input>
		// 			<Dialog.Button label='Cancel' />
		// 			<Dialog.Button label='Delete' />
		// 		</Dialog.Container>
		// 	</View>
		// );
		return (
			<View style={styles.mealcard}>
				<View style={styles.row}>
					<Text style={{ fontWeight: '500', fontSize: 20 }}>
						Status: {order.Status}
					</Text>

					<TouchableOpacity
						style={styles.button}
						title='Compile Receipt'
						onPress={() => alert('Receipt functionality not implemented')}>
						<Text>View Full Receipt </Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					{/* {' '} */}
					<Text>Completed: {moment(d).calendar()}</Text>
					{/* {pickupInfo} */}
				</View>

				<Text>Cost: {order.TotalCost}</Text>
				<View style={styles.spaceVertical}></View>

				<Text style={{ fontWeight: '500', fontSize: 16 }}>
					Some of the items on this meal were:
				</Text>
				<View style={styles.row}>
					{order.FoodItems.map((foodItem, index) => {
						////Only print first few items
						if (index > 2) return <></>;
						let returnString = foodItem;
						if (
							//Deliminter by comma
							index != order.FoodItems.length - 1 ||
							(order.FoodItems.length > 2 && index != 2)
						) {
							returnString += ', ';
						}
						return <Text key={index}>{returnString}</Text>;
					})}
				</View>
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
		// alignItems: 'center',
		backgroundColor: '#5EA9F4',
		padding: 5,
		position: 'absolute',
		right: 0,
	},
	row: {
		flexDirection: 'row',
	},
	spaceVertical: {
		height: 15,
	},
	input: {
		width: 200,
		padding: 10,
		margin: 5,
		height: 40,
		borderColor: '#5EA9F4',
		borderWidth: 1,
	},
});
