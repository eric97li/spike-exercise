import React, { Component } from 'react';
import {
	TouchableOpacity,
	TextInput,
	View,
	Text,
	StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

export default class UsageReports extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: '',
			month: '',
			day: 'Choose a day',
			daymodal: false,
			filtermode: '',
			filteritem: '',
			mealname: '',
			usage: '',
		};
		this.getDataMessage = this.getDataMessage.bind(this);
		this.filterPressed = this.filterPressed.bind(this);
	}

	componentDidMount() {}

	changeDay(date) {
		let month = date.getMonth();
		month++;
		if (month < 10) {
			month = '0' + month;
		}
		let year = date.getYear() + 1900;
		let day = date.getDate();
		// alert(day);
		this.setState({
			day: day.toString(),
			year: year.toString(),
			month: month.toString(),
			daymodal: false,
		});
		// alert(year);
		// alert(month);
		// console.log(day);
	}
	filterPressed(mode) {
		this.setState({ filtermode: mode });
		if (mode === '') {
			// alert('Select fields to filter by!');
			return <></>;
		} else {
			let jsonBody;
			if (mode === 'day') {
				if (this.state.day === 'Choose a day') {
					alert('Please enter a date!');
					return;
				}
				jsonBody = JSON.stringify({
					Day: this.state.day,
					Month: this.state.month,
					Year: this.state.year,
				});
				this.setState({ filteritem: this.state.day });
			} else if (mode === 'month') {
				if (this.state.month === '') {
					alert('Please enter a date!');
					return;
				}
				jsonBody = JSON.stringify({
					Month: this.state.month,
					Year: this.state.year,
				});
				this.setState({ filteritem: this.state.month });
			} else if (mode === 'year') {
				if (this.state.year === '') {
					alert('Please enter a date!');
					return;
				}
				jsonBody = JSON.stringify({ Year: this.state.year });
				this.setState({ filteritem: this.state.year });
			} else {
				if (this.state.mealname === '') {
					alert('Please enter a food of interest!');
					return;
				}
				jsonBody = JSON.stringify({ MealName: this.state.mealname });
				this.setState({ filteritem: this.state.mealname });
			}
			alert(jsonBody);
			fetch('https://ripple506.herokuapp.com/PrintUsageReport', {
				method: 'POST',
				headers: {
					'Accept': '*/*',
					'Connection': 'Keep-Alive',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 'Year': '2021', 'Month': '02', 'Day': '05' }),
			})
				// .then((response) => response.json())
				.then((response) => response.json())

				.then((json) => {
					// console.log(json);
					if (!json.Status) {
						alert('Error updating!');
					} else {
						// alert('Usage' + json.Usage);
						this.setState({ usage: json.Usage });
					}
				});
		}
	}
	getDataMessage() {
		if (this.state.usage === '') return '';

		return (
			this.state.usage +
			' items for ' +
			this.state.filtermode +
			' ' +
			this.state.filteritem
		);
	}

	render() {
		return (
			<View
				style={{
					width: '90%',
					height: '95%',
					justifyContent: 'center',
					alignSelf: 'center',
					alignContent: 'center',
					alignItems: 'center',
				}}>
				<Text
					style={{
						fontWeight: '700',
						fontSize: 40,
						textAlign: 'center',
					}}>
					View Usage Reports!{' '}
				</Text>
				<View style={styles.spaceVertical}></View>

				<Text style={{ fontSize: 20, textAlign: 'center' }}>
					Search by Day, Month, Year or Food Name
				</Text>

				<View style={styles.spaceVertical}></View>
				<DateTimePickerModal
					isVisible={this.state.daymodal}
					mode='date'
					headerTextIOS='Choose a day to select statistics for'
					onConfirm={(date) => this.changeDay(date)}
					onCancel={() => this.setState({ daymodal: false })}
				/>

				<TouchableOpacity
					title='Update Day'
					style={styles.button}
					onPress={() => this.setState({ daymodal: true })}>
					<Text>
						{this.state.month} {this.state.day} {this.state.year}
					</Text>
				</TouchableOpacity>

				<TextInput
					ref={this.passInput}
					// secureTextEntry={true}
					placeholderTextColor='#5EA9F4'
					style={styles.input}
					placeholder='Enter a food of interest'
					onChangeText={(mealname) => this.setState({ mealname: mealname })}
				/>
				<View style={styles.spaceVertical}></View>

				<View style={styles.row}>
					<TouchableOpacity
						title='By Day'
						style={styles.submitbutton}
						onPress={() => this.filterPressed('day')}>
						<Text>By Day</Text>
					</TouchableOpacity>
					<TouchableOpacity
						title='By Month'
						style={styles.submitbutton}
						onPress={() => this.filterPressed('month')}>
						<Text>By Month</Text>
					</TouchableOpacity>
					<TouchableOpacity
						title='By Year'
						style={styles.submitbutton}
						onPress={() => this.filterPressed('year')}>
						<Text>By Year</Text>
					</TouchableOpacity>
					<TouchableOpacity
						title='By Food'
						style={styles.submitbutton}
						onPress={() => this.filterPressed('mealname')}>
						<Text>By Food</Text>
					</TouchableOpacity>
				</View>

				<Text style={{ fontSize: 20, textAlign: 'center' }}>
					{this.getDataMessage()}
				</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	onePicker: {
		width: 200,
		height: 44,
		margin: 5,

		backgroundColor: '#FFF0E0',
		borderColor: 'black',
		borderWidth: 1,
	},
	spaceVertical: {
		height: 15,
	},
	onePickerItem: {
		height: 44,
		color: 'red',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center', // Centered horizontally
		justifyContent: 'center', //Centered vertically
		height: 44,
		width: 200,
		margin: 5,
		backgroundColor: '#5EA9F4',
		padding: 5,
	},
	submitbutton: {
		justifyContent: 'center',
		alignItems: 'center', // Centered horizontally
		justifyContent: 'center', //Centered vertically
		height: 44,
		width: '24%',
		margin: 5,
		backgroundColor: 'limegreen',
		padding: 5,
	},
	input: {
		width: 200,
		padding: 10,
		margin: 5,
		height: 40,
		borderColor: '#5EA9F4',
		borderWidth: 1,
	},
	row: {
		flexDirection: 'row',
		paddingBottom: 10,
	},
});
