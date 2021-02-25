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
					<Text style={{ fontSize: 18 }}>Username</Text>
					<TextInput
						ref={this.userInput}
						// secureTextEntry={true}
						style={styles.input}
						onChangeText={(text) => this.setState({ UserName: text })}
						placeholder={this.state.UserName}
					/>
					<Text style={{ fontSize: 18 }}>Password</Text>
					<TextInput
						ref={this.passInput}
						// secureTextEntry={true}
						style={styles.input}
						onChangeText={(text) => this.setState({ PassWord: text })}
						placeholder={this.state.PassWord}
					/>

					<Text style={{ fontSize: 18 }}>Phone Number</Text>
					<TextInput
						ref={this.phoneInput}
						style={styles.input}
						onChangeText={(text) => this.setState({ Phone: text })}
						placeholder={this.state.Phone}
					/>

					<Text style={{ fontSize: 18 }}>Address</Text>
					<TextInput
						ref={this.addressInput}
						style={styles.input}
						onChangeText={(text) => this.setState({ Address: text })}
						placeholder={this.state.Address}
					/>

					<Text style={{ fontSize: 18 }}>Preferred Payment</Text>
					<TextInput
						ref={this.paymentInput}
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
							<Text style={{ fontSize: 18, color: 'white' }}> Confirm </Text>
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
		padding: 10,
		margin: 5,
		height: 40,
		width: '80%',
		borderColor: 'black',
		borderWidth: 1,
	},
	button: {
		borderWidth: 1,
		height: 42,
		width: '80%',
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 40,
		backgroundColor: 'limegreen',
		alignSelf: 'center',
		textAlign: 'center',
	},
});
