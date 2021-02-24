import React, { Component } from 'react';
import {
	TouchableOpacity,
	TextInput,
	StyleSheet,
	View,
	Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			role: 'Customer',
			phonenumber: '',
			address: '',
			preferredPayment: '',
		};
	}
	goToLogin() {
		// this.props.navigation.pop();

		this.props.navigation.replace('Login');
	}
	signup_field = () => {
		const {
			username,
			password,
			role,
			phonenumber,
			address,
			preferredPayment,
		} = this.state;
		if (
			role === '0' ||
			!phonenumber.length ||
			!address ||
			!preferredPayment ||
			!username ||
			!password
		) {
			alert('Invalid input');
			return;
		} else if (password.length < 5) {
			alert('Field password must be 5 characters or longer.');
			return false;
		}

		const data = {
			UserName: username,
			PassWord: password,
			Role: role,
			Phone: phonenumber,
			Address: address,
			PaymentType: preferredPayment,
		};
		console.log(JSON.stringify(data));
		fetch('https://ripple506.herokuapp.com/CreateAccount', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then(async (json) => {
				console.log(json);
				if (json.Status) {
					alert('Profile created');
					//Navigate to login page
					await this.props.navigation.replace('Login');

					this.props.setUsernameCallBack(username);
					this.props.setPasswordCallBack(password);
					this.props.navigation.navigate('Badger Bytes');
				} else {
					alert('Invalid username. Try another one.');
				}
			});
	};

	render() {
		return (
			<View
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignSelf: 'center',
					alignContent: 'center',
					alignItems: 'center',
				}}>
				<TextInput
					autoCapitalize='none'
					placeholder={'Username'}
					onChangeText={(value) => this.setState({ username: value })}
					style={{ height: 42, width: '80%', borderBottomWidth: 1 }}
				/>
				<TextInput
					autoCapitalize='none'
					placeholder={'Password'}
					secureTextEntry={true}
					onChangeText={(value) => this.setState({ password: value })}
					style={{
						height: 42,
						width: '80%',
						borderBottomWidth: 1,
						marginTop: '5%',
					}}
				/>
				<TextInput
					autoCapitalize='none'
					placeholder={'555-5555'}
					onChangeText={(value) => this.setState({ phonenumber: value })}
					style={{
						height: 42,
						width: '80%',
						borderBottomWidth: 1,
						marginTop: '5%',
					}}
				/>
				<TextInput
					autoCapitalize='none'
					placeholder={'10 First Avenue'}
					onChangeText={(value) => this.setState({ address: value })}
					style={{
						height: 42,
						width: '80%',
						borderBottomWidth: 1,
						marginTop: '5%',
					}}
				/>
				<TextInput
					autoCapitalize='none'
					placeholder={'Apple Pay'}
					onChangeText={(value) => this.setState({ preferredPayment: value })}
					style={{
						height: 42,
						width: '80%',
						borderBottomWidth: 1,
						marginTop: '5%',
					}}
				/>
				{/* 

				<TextInput
					placeholderTextColor='#5EA9F4'
					style={styles.input}
					onChangeText={(text) => this.setState({ preferredPayment: text })}
					placeholder={'Apple Pay'}
				/> */}
				<Picker
					selectedValue={this.state.role}
					style={styles.onePicker}
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ role: itemValue })
					}>
					<Picker.Item label='Please select a role' value='0' />
					<Picker.Item label='Customer' value='Customer' />
					<Picker.Item label='Restaurant Staff' value='Staff' />
					<Picker.Item label='Admin' value='Admin' />
				</Picker>
				<View style={{ marginTop: '10%', width: '80%' }}>
					<TouchableOpacity
						style={styles.signupButton}
						onPress={() => this.signup_field()}>
						<Text style={{ color: 'white' }}> Sign Up </Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.returnButton}
						onPress={() => this.goToLogin()}>
						<Text style={{ color: 'black' }}> Return to Login Screen </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	onePicker: {
		width: '80%',
		paddingTop: 0,
		// height: 44,
		backgroundColor: '#fff',
		borderColor: 'black',
		borderWidth: 1,
	},
	signupButton: {
		borderWidth: 1,
		height: 42,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
		backgroundColor: 'limegreen',
		alignSelf: 'center',
		textAlign: 'center',
	},
	returnButton: {
		marginTop: 20,
		borderWidth: 1,
		height: 42,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
		backgroundColor: 'orange',
		alignSelf: 'center',
		textAlign: 'center',
	},
});
