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
		};
	}
	signup_field = () => {
		const { username, password, role } = this.state;
		if (role === '0') {
			alert('Select a role other than default');
			return;
		}
		if (username == '') {
			alert('Username or password missing!');
			return false;
		} else if (password == '') {
			alert('Username or password missing!');
			return false;
		} else if (password.length < 5) {
			alert('Field password must be 5 characters or longer.');
			return false;
		}

		//check that the username is unique
		return fetch('https://ripple506.herokuapp.com/CreateAccount', {
			method: 'POST',
		})
			.then((response) => response.json())
			.then((response) => {
				// console.log(response[0].name)

				//users begin at id 1
				//get list of usernames
				let usernameList = [];
				for (let i = 1; i < response.length; i++) {
					usernameList.push(response[i].username);
				}
				//check array of usernames
				//username is already taken
				if (usernameList.includes(username)) {
					alert('Username is already taken');
				}
				//username is unique, create account
				else {
					const data = {
						username: username,
						password: password,
						name: username,
						role: role,
					};

					return fetch('https://ripple506.herokuapp.com/CreateAccount', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(data),
					}).then((response) => {
						if (response.status == 201) {
							alert('Profile created');
							//Navigate to login page
							this.props.navigation.navigate('Login');
						}
						//error
						else {
							alert('username already taken!');
						}
					});
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
					onChangeText={(value) => this.setState({ password: value })}
					style={{
						height: 42,
						width: '80%',
						borderBottomWidth: 1,
						marginTop: '5%',
					}}
				/>
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
						style={{
							borderWidth: 1,
							height: 42,
							width: '80%',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 40,
							backgroundColor: 'black',
							alignSelf: 'center',
							textAlign: 'center',
						}}
						onPress={() => this.signup_field()}>
						<Text style={{ color: 'white' }}> Sign Up </Text>
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
});
