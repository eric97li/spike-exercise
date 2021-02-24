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
			UserName: '',
			PassWord: '',
			Phone: '',
			Address: '',
			PaymentType: '',
		};
		this.updateProfile = this.updateProfile.bind(this);
		this.phoneInput = React.createRef();
		this.passInput = React.createRef();
		this.paymentInput = React.createRef();
		this.addressInput = React.createRef();
		this.userInput = React.createRef();
	}
	//Allows us to reset stack title
	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			fetch('https://ripple506.herokuapp.com/GetAccountInfo', {
				method: 'POST',
				headers: {
					'Accept': '*/*',
					'Connection': 'Keep-Alive',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ UserName: this.props.username }),
			})
				// .then((response) => response.json())
				.then((response) => response.json())

				.then(async (json) => {
					console.log(json);
					if (json.Status) {
						this.setState({
							UserName: json.UserName,
							PassWord: json.PassWord,
							Phone: json.Phone,
							Address: json.Address,
							PaymentType: json.PaymentType,
						});
					}
				});
		});
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	updateProfile() {
		// alert('update profile called');
		fetch('https://ripple506.herokuapp.com/UpdateAccount', {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Connection': 'Keep-Alive',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				OldUserName: this.props.username,
				NewUserName: this.state.UserName,
				PassWord: this.state.PassWord,
				Phone: this.state.Phone,
				Address: this.state.Address,
				PaymentType: this.state.PaymentType,
			}),
		})
			.then((response) => response.json())

			.then((json) => {
				this.phoneInput.current.clear();
				this.passInput.current.clear();
				this.addressInput.current.clear();
				this.paymentInput.current.clear();
				this.userInput.current.clear();

				console.log(json);
			});
	}

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

					{/* <Text>Username</Text>
					<TextInput
						ref={this.userInput}
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ UserName: text })}
						placeholder={this.state.UserName}
					/> */}
					<Text>Username</Text>
					<TextInput
						ref={this.userInput}
						// secureTextEntry={true}
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ UserName: text })}
						placeholder={this.state.UserName}
					/>
					<Text>Password</Text>
					<TextInput
						ref={this.passInput}
						// secureTextEntry={true}
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ PassWord: text })}
						placeholder={this.state.PassWord}
					/>

					<Text>Phone Number</Text>
					<TextInput
						ref={this.phoneInput}
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ Phone: text })}
						placeholder={this.state.Phone}
					/>

					<Text>Address</Text>
					<TextInput
						ref={this.addressInput}
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ Address: text })}
						placeholder={this.state.Address}
					/>

					<Text>Preferred Payment</Text>
					<TextInput
						ref={this.paymentInput}
						placeholderTextColor='#5EA9F4'
						style={styles.input}
						onChangeText={(text) => this.setState({ PaymentType: text })}
						placeholder={this.state.PaymentType}
					/>

					{/* Can't modify role */}

					<View style={{ flexDirection: 'row', marginTop: 10 }}>
						<TouchableOpacity
							style={styles.button}
							title='Save Information'
							// onPress={this.updateProfile}
							onPress={this.updateProfile}>
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
