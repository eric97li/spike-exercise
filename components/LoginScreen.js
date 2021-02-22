import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	validate_field = () => {
		const { username, password } = this.state;

		if (username == '') {
			alert('Username or password is incorrect!');
			return false;
		} else if (password == '') {
			alert('Username or password is incorrect!');
			return false;
		}
		console.log(JSON.stringify({ UserName: username, PassWord: password }));
		//check for the credentials entered by user with the api and retrieve account of user
		fetch('https://ripple506.herokuapp.com/VerifyAccount', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ UserName: username, PassWord: password }),
		})
			// .then((response) => response.json())
			.then((response) => response.json())

			.then((json) => {
				console.log(json);
				if (json.Status) {
					this.props.setUsernameCallBack(username);
					this.props.setPasswordCallBack(password);
					this.props.navigation.navigate('Badger Bytes');
				} else {
					alert('Error logging in!');
				}
			});
	};

	goToSignUp() {
		this.props.navigation.navigate('Sign Up');
	}

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
				<View style={{ marginTop: '10%', width: '80%' }}>
					<TouchableOpacity
						accessible={true}
						accessibilityLabel='Login Button'
						accessibilityHint='Activate to login'
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
						onPress={() => this.validate_field()}>
						<Text style={{ color: 'white' }}> Login </Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: '10%', width: '80%' }}>
					<Text>New user?</Text>
				</View>
				<View style={{ marginTop: '2.5%', width: '80%' }}>
					<TouchableOpacity
						accessible={true}
						accessibilityLabel='Sign Up Button'
						accessibilityHint='Activate to go to sign up page'
						style={{
							borderWidth: 1,
							height: 42,
							width: '80%',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 40,
							backgroundColor: 'white',
							alignSelf: 'center',
							textAlign: 'center',
						}}
						onPress={() => this.goToSignUp()}>
						<Text style={{ color: 'black' }}> Sign Up </Text>
					</TouchableOpacity>
				</View>

				{/* <Text>{this.state.username}</Text>
              <Text>{this.state.password}</Text>
              <Text>{this.state.token}</Text> */}
			</View>
		);
	}
}
