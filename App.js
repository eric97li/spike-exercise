import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NativeAppEventEmitter, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './components/ProfileScreen';
import OrdersScreen from './components/OrdersScreen';
import MenuScreen from './components/MenuScreen';
import UsageReports from './components/UsageReportScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';

const Stack = createStackNavigator();

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
		};

		this.setUsername = this.setUsername.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}
	getStackTitle() {
		if (!this.state.username) {
			return 'Login';
		} else return 'Logout';
	}
	setUsername(y) {
		this.setState({ username: y });
	}

	setPassword(x) {
		this.setState({ password: x });
	}

	createTabNavigator(props) {
		const Tab = createBottomTabNavigator();
		let role = 'Customer';
		//Middle Tab will change depending on the role of the user
		let customizedTab = (
			<Tab.Screen
				name='Orders'
				options={{
					tabBarIcon: () => {
						let iconName = `md-calendar`;
						return <Ionicons name={iconName} size={25} />;
					},
				}}>
				{(props) => <OrdersScreen {...props} username={this.state.username} />}
			</Tab.Screen>
		);
		if (role === 'Admin') {
			customizedTab = (
				<Tab.Screen
					name='Admin Controls'
					options={{
						tabBarIcon: () => {
							let iconName = `md-settings`;
							return <Ionicons name={iconName} size={25} />;
						},
					}}>
					{(props) => (
						<UsageReports {...props} username={this.state.username} />
					)}
				</Tab.Screen>
			);
		}

		//Create Tab Navigator
		return (
			<Tab.Navigator>
				<Tab.Screen
					name='Menu'
					options={{
						tabBarIcon: () => {
							let iconName = `md-pizza`;
							return <Ionicons name={iconName} size={25} />;
						},
					}}>
					{(props) => <MenuScreen {...props} username={this.state.username} />}
				</Tab.Screen>
				{customizedTab}

				<Tab.Screen
					name='Profile'
					options={{
						tabBarIcon: () => {
							let iconName = `md-person`;
							return <Ionicons name={iconName} size={25} />;
						},
					}}>
					{(props) => (
						<ProfileScreen
							{...props}
							username={this.state.username}
							password={this.state.password}
						/>
					)}
				</Tab.Screen>
			</Tab.Navigator>
		);
	}

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					{/* Temporarily Commented Out to avoid login functionality */}

					<Stack.Screen name='Login' options={{ title: this.getStackTitle() }}>
						{(props) => (
							<LoginScreen
								{...props}
								setUsernameCallBack={this.setUsername}
								setPasswordCallBack={this.setPassword}
							/>
						)}
					</Stack.Screen>
					<Stack.Screen name='Sign Up'>
						{(props) => (
							<SignUpScreen
								{...props}
								setUsernameCallBack={this.setUsername}
								setPasswordCallBack={this.setPassword}
							/>
						)}
					</Stack.Screen>
					<Stack.Screen name='Badger Bytes'>
						{(props) => this.createTabNavigator(props)}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
