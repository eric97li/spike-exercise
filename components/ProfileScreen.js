import React, { Component } from 'react';
import {
	TouchableOpacity,
	TextInput,
	Text,
	StyleSheet,
	View,
	Image,
} from 'react-native';

export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			password: '',
			phonenumber: '',
			address: '',
			preferredPayment: '',
		};
		this.updateProfile = this.updateProfile.bind(this);
	}

	componentDidMount() {}
	updateProfile() {}
	render() {
		return (
			<React.Fragment>
				<View
					style={{
						width: '95%',
						height: '95%',
						justifyContent: 'center',
						alignSelf: 'center',
						alignContent: 'center',
						alignItems: 'center',
					}}>
					<Text style={{ fontWeight: '700', fontSize: 40 }}>
						Profile Screen
					</Text>
					<Text style={{ fontSize: 20 }}>Update Your Account Info Below</Text>
					<View style={{ height: 50 }}></View>

					<Text>First Name</Text>
					<TextInput
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ firstName: text })}
						placeholder={'Titus'}
					/>

					<Text>Last Name</Text>
					<TextInput
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ lastName: text })}
						placeholder={'Smith'}
					/>

					<Text>Phone Number</Text>
					<TextInput
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ phonenumber: text })}
						placeholder={'555-5555'}
					/>

					<Text>Address</Text>
					<TextInput
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ address: text })}
						placeholder={'1800 Pennslyvania Avenue'}
					/>

					<Text>Preferred Payment</Text>
					<TextInput
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ preferredPayment: text })}
						placeholder={'Apple Pay'}
					/>

					{/* Can't modify role */}

					<View style={{ flexDirection: 'row', marginTop: 10 }}>
						<TouchableOpacity
							style={styles.button}
							title='Save Information'
							// onPress={this.updateProfile}
							onPress={() => alert('Functionality not implemented')}>
							<Text> Confirm </Text>
						</TouchableOpacity>
					</View>
				</View>
			</React.Fragment>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'blue'
	},
	spaceHorizontal: {
		// display: "flex",
		width: 50,
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
	timeinput: {
		width: 300,
		padding: 10,
		margin: 5,
		height: 100,
		borderColor: '#5EA9F4',
		borderWidth: 1,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#5EA9F4',
		padding: 10,
	},
});
