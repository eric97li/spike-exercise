import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import {
	Modal,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	TextInput,
	View,
	Text,
	Button,
	ScrollView,
	StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default class MenuScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			editModalVisible: false,
			inventoryModalVisible: false,

			items: [],
			order: [],
			orderNames: [],

			mealName: '',
			editMealName: '',

			picture: '',
			editPicture: '',

			cost: '',
			editCost: '',

			availability: '',
		};

		this.setEditModalVisible = this.setEditModalVisible.bind(this);
		this.setInventoryModalVisible = this.setInventoryModalVisible.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);

		this.manageEditModalVisible = this.manageEditModalVisible.bind(this);
		this.manageInventoryModalVisible = this.manageInventoryModalVisible.bind(
			this
		);
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			//retrieve the menu
			return fetch('https://ripple506.herokuapp.com/ViewMenu', {
				method: 'GET',
			})
				.then((response) => response.json())
				.then((response) => {
					this.setState({ items: response });
				});
		});
	}

	setModalVisible = () => {
		this.setState({ modalVisible: !this.state.modalVisible });
	};

	setEditModalVisible = (mealName, picture, cost, availability) => {
		this.setState({ editModalVisible: !this.state.editModalVisible });

		this.setState({ mealName: mealName });
		this.setState({ picture: picture });
		this.setState({ cost: cost });
		this.setState({ availability: availability });
	};

	setInventoryModalVisible = (mealName, picture, cost, availability) => {
		this.setState({ inventoryModalVisible: !this.state.inventoryModalVisible });

		this.setState({ mealName: mealName });
		this.setState({ picture: picture });
		this.setState({ cost: cost });
		this.setState({ availability: availability });
	};

	manageInventoryModalVisible = () => {
		this.setState({ inventoryModalVisible: !this.state.inventoryModalVisible });
	};

	manageEditModalVisible = () => {
		this.setState({ editModalVisible: !this.state.editModalVisible });
	};

	addItem = () => {
		if (
			this.state.mealName == '' ||
			this.state.picture == '' ||
			this.state.cost == '' ||
			this.state.availability == ''
		) {
			alert('One or more missing fields');
		} else {
			return fetch('https://ripple506.herokuapp.com/AddItem', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					MealName: this.state.mealName,
					Picture: this.state.picture,
					Cost: this.state.cost,
					Availability: this.state.availability,
				}),
			}).then((response) => {
				return fetch('https://ripple506.herokuapp.com/ViewMenu', {
					method: 'GET',
				})
					.then((response) => response.json())
					.then((response) => {
						this.setState({ items: response, modalVisible: false });
					});
			});
		}
	};

	updateItem = (MealName, Picture, Cost, Availability) => {
		if (MealName == '' || Picture == '' || Cost == '' || Availability == '') {
			alert('One or more missing fields');
		} else {
			return fetch('https://ripple506.herokuapp.com/UpdateItem', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					OriginalName: this.state.mealName,
					NewName: MealName,
					Picture: Picture,
					Cost: Cost,
					Availability: Availability,
				}),
			}).then((response) => {
				return fetch('https://ripple506.herokuapp.com/ViewMenu', {
					method: 'GET',
				})
					.then((response) => response.json())
					.then((response) => {
						this.setState({ items: response, editModalVisible: false });
					});
			});
		}
	};

	updateItemStatus = () => {
		console.log('UIS');
		return fetch('https://ripple506.herokuapp.com/UpdateItem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				OriginalName: this.state.mealName,
				NewName: this.state.mealName,
				Picture: this.state.picture,
				Cost: this.state.cost,
				Availability: this.state.availability,
			}),
		}).then((response) => {
			return fetch('https://ripple506.herokuapp.com/ViewMenu', {
				method: 'GET',
			})
				.then((response) => response.json())
				.then((response) => {
					console.log('Update');
					this.setState({ items: response, inventoryModalVisible: false });
				});
		});
	};

	createOrder = () => {
		if (this.state.orderNames.length == 0) {
			alert('No items have been added to order');
		} else {
			return fetch('https://ripple506.herokuapp.com/CreateOrder', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'UserName': this.props.username,
					'FoodItems': this.state.order,
					'DateCreated': new Date(),
				}),
			}).then((response) => {
				return fetch('https://ripple506.herokuapp.com/GetAccountInfo', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'UserName': this.props.username,
					}),
				})
					.then((response) => response.json())
					.then((response) => {
						alert(
							'Order created! Payment confirmed with ' + response.PaymentType
						);

						// clear the order queue
						this.setState({ order: [] });
					});
			});
		}
	};

	getAddButton = () => {
		if (this.props.role == 'Admin') {
			return (
				<TouchableOpacity style={[styles.addButton]}>
					<Text
						style={styles.buttonText}
						onPress={() => {
							this.setModalVisible();
						}}>
						Add Item
					</Text>
				</TouchableOpacity>
			);
		}
	};

	getUpdateButton = (MealName, Picture, Cost, Availability) => {
		if (this.props.role == 'Admin') {
			return (
				<TouchableOpacity style={[styles.updateButton]}>
					<Text
						style={styles.buttonText}
						onPress={() => {
							this.setEditModalVisible(MealName, Picture, Cost, Availability);
						}}>
						Update Item
					</Text>
				</TouchableOpacity>
			);
		}

		if (this.props.role == 'Staff') {
			return (
				<TouchableOpacity style={[styles.updateButton]}>
					<Text
						style={styles.buttonText}
						onPress={() => {
							this.setInventoryModalVisible(
								MealName,
								Picture,
								Cost,
								Availability
							);
						}}>
						Update Item Status
					</Text>
				</TouchableOpacity>
			);
		}
	};

	addItemToOrder = (mealID, mealName, availability) => {
		if (availability == 'Unavailable') {
			alert('Sorry item is unavailable');
		} else {
			this.setState((state) => {
				const order = state.order.concat(mealID);

				return {
					order,
					value: '',
				};
			});

			let mealString = mealName + ', ';
			this.setState((state) => {
				const orderNames = state.orderNames.concat(mealString);

				return {
					orderNames,
					value: '',
				};
			});
		}
	};

	getBuyButton = (mealID, mealName, availability) => {
		if (this.props.role == 'Customer') {
			return (
				<TouchableOpacity style={[styles.updateButton]}>
					<Text
						style={styles.buttonText}
						onPress={() => {
							this.addItemToOrder(mealID, mealName, availability);
						}}>
						Add to order
					</Text>
				</TouchableOpacity>
			);
		}
	};

	getCreateOrderButton = () => {
		if (this.props.role == 'Customer') {
			return (
				<View>
					<Text>Current order: {this.state.orderNames}</Text>
					<TouchableOpacity style={[styles.addButton]}>
						<Text
							style={styles.buttonText}
							onPress={() => {
								this.createOrder();
							}}>
							Finalize order
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
	};

	render() {
		const {
			modalVisible,
			editModalVisible,
			inventoryModalVisible,
		} = this.state;

		console.log(this.state.order);
		// console.log("---------------")
		// console.log(this.state.orderNames);

		return (
			<View>
				<Modal visible={modalVisible}>
					<View>
						<Text
							style={{
								fontSize: 30,
								marginTop: '50%',
								justifyContent: 'center',
								alignSelf: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}>
							Add Item
						</Text>

						<View
							style={{
								width: '100%',
								justifyContent: 'center',
								alignSelf: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}>
							<TextInput
								multiline={true}
								placeholder={'Meal name'}
								onChangeText={(value) => this.setState({ mealName: value })}
								style={{ height: 42, width: '80%', borderBottomWidth: 1 }}
							/>

							<TextInput
								style={{ marginTop: '40%' }}
								placeholder={'Meal cost'}
								onChangeText={(value) => this.setState({ cost: value })}
								style={{ height: 42, width: '80%', borderBottomWidth: 1 }}
							/>

							{/* picture */}
							<TextInput
								style={{ marginTop: '40%' }}
								placeholder={'Picture'}
								onChangeText={(value) => this.setState({ picture: value })}
								style={{ height: 42, width: '80%', borderBottomWidth: 1 }}
							/>

							<View style={{ marginBottom: '5%' }}></View>

							{/* availability dropdown */}
							<DropDownPicker
								items={[
									{ label: 'Available', value: 'Available' },
									{ label: 'Unavailable', value: 'Unavailable' },
								]}
								placeholder={'Available'}
								defaultValue={this.state.availability}
								containerStyle={{ width: 150, height: 40 }}
								style={{ backgroundColor: '#fafafa' }}
								itemStyle={{
									justifyContent: 'flex-start',
								}}
								dropDownStyle={{ backgroundColor: '#fafafa' }}
								onChangeItem={(item) =>
									this.setState({
										availability: item.value,
									})
								}
							/>

							<View style={{ marginTop: '5%', width: '80%' }}>
								<TouchableOpacity
									style={{
										borderWidth: 1,
										height: 42,
										width: '60%',
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 5,
										backgroundColor: 'black',
										alignSelf: 'center',
										textAlign: 'center',
									}}
									onPress={() => {
										this.addItem();
									}}>
									<Text style={{ color: 'white' }}> Add </Text>
								</TouchableOpacity>
							</View>
							<View style={{ marginTop: '2.5%', width: '80%' }}>
								<TouchableOpacity
									style={{
										borderWidth: 1,
										height: 42,
										width: '60%',
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 5,
										backgroundColor: 'white',
										alignSelf: 'center',
										textAlign: 'center',
									}}
									onPress={() => {
										this.setModalVisible();
									}}>
									<Text style={{ color: 'black' }}> Close </Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>

				<Modal visible={editModalVisible}>
					<View>
						<Text
							style={{
								fontSize: 30,
								marginTop: '50%',
								justifyContent: 'center',
								alignSelf: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}>
							Update Item
						</Text>

						<View
							style={{
								width: '100%',
								justifyContent: 'center',
								alignSelf: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}>
							<Text style={{ marginTop: '2.5%', fontSize: 20 }}>
								Meal name: {this.state.mealName}
							</Text>
							<TextInput
								placeholder={this.state.mealName}
								onChangeText={(value) => this.setState({ editMealName: value })}
								style={{ height: 42, width: '80%', borderBottomWidth: 1 }}
							/>

							<TextInput
								style={{ marginTop: '40%' }}
								placeholder={this.state.cost}
								onChangeText={(value) => this.setState({ editCost: value })}
								style={{ height: 42, width: '80%', borderBottomWidth: 1 }}
							/>

							{/* picture */}
							<TextInput
								style={{ marginTop: '40%' }}
								placeholder={this.state.picture}
								onChangeText={(value) => this.setState({ editPicture: value })}
								style={{ height: 42, width: '80%', borderBottomWidth: 1 }}
							/>

							<View style={{ marginBottom: '5%' }}></View>

							{/* availability dropdown */}
							<DropDownPicker
								items={[
									{ label: 'Available', value: 'Available' },
									{ label: 'Unavailable', value: 'Unavailable' },
								]}
								placeholder={'Available'}
								defaultValue={this.state.availability}
								containerStyle={{ width: 150, height: 40 }}
								style={{ backgroundColor: '#fafafa' }}
								itemStyle={{
									justifyContent: 'flex-start',
								}}
								dropDownStyle={{ backgroundColor: '#fafafa' }}
								onChangeItem={(item) =>
									this.setState({
										availability: item.value,
									})
								}
							/>

							<View style={{ marginTop: '5%', width: '80%' }}>
								<TouchableOpacity
									style={{
										borderWidth: 1,
										height: 42,
										width: '60%',
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 5,
										backgroundColor: 'black',
										alignSelf: 'center',
										textAlign: 'center',
									}}
									onPress={() => {
										this.updateItem(
											this.state.editMealName,
											this.state.editPicture,
											this.state.editCost,
											this.state.availability
										);
									}}>
									<Text style={{ color: 'white' }}> Update </Text>
								</TouchableOpacity>
							</View>

							<View style={{ marginTop: '2.5%', width: '80%' }}>
								<TouchableOpacity
									style={{
										borderWidth: 1,
										height: 42,
										width: '60%',
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 5,
										backgroundColor: 'white',
										alignSelf: 'center',
										textAlign: 'center',
									}}
									onPress={() => {
										this.manageEditModalVisible();
									}}>
									<Text style={{ color: 'black' }}> Close </Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>

				<Modal visible={inventoryModalVisible}>
					<View>
						<Text
							style={{
								fontSize: 30,
								marginTop: '50%',
								justifyContent: 'center',
								alignSelf: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}>
							Update Item Status
						</Text>

						<View
							style={{
								width: '100%',
								justifyContent: 'center',
								alignSelf: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}>
							<Text style={{ marginTop: '2.5%', fontSize: 20 }}>
								Meal name: {this.state.mealName}
							</Text>

							{/* availability dropdown */}
							<DropDownPicker
								items={[
									{ label: 'Available', value: 'Available' },
									{ label: 'Unavailable', value: 'Unavailable' },
								]}
								placeholder={'Available'}
								defaultValue={this.state.availability}
								containerStyle={{ width: 150, height: 40 }}
								style={{ backgroundColor: '#fafafa' }}
								itemStyle={{
									justifyContent: 'flex-start',
								}}
								dropDownStyle={{ backgroundColor: '#fafafa' }}
								onChangeItem={(item) =>
									this.setState({
										availability: item.value,
									})
								}
							/>

							<View style={{ marginTop: '5%', width: '80%' }}>
								<TouchableOpacity
									style={{
										borderWidth: 1,
										height: 42,
										width: '60%',
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 5,
										backgroundColor: 'black',
										alignSelf: 'center',
										textAlign: 'center',
									}}
									onPress={() => {
										this.updateItemStatus();
									}}>
									<Text style={{ color: 'white' }}> Update </Text>
								</TouchableOpacity>
							</View>

							<View style={{ marginTop: '2.5%', width: '80%' }}>
								<TouchableOpacity
									style={{
										borderWidth: 1,
										height: 42,
										width: '60%',
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 5,
										backgroundColor: 'white',
										alignSelf: 'center',
										textAlign: 'center',
									}}
									onPress={() => {
										this.manageInventoryModalVisible();
									}}>
									<Text style={{ color: 'black' }}> Close </Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>

				<View>
					{
						<ListItem bottomDivider>
							<ListItem.Content
								style={{ alignItems: 'center', flexDirection: 'column' }}>
								{/* <Button style={{borderRadius:50}} color="green" title="Add Item" onPress={()=>{this.setModalVisible(!modalVisible);}}/> */}
								{/* <TouchableOpacity style={[styles.addButton, {display}]}> 
  							<Text style={styles.buttonText} onPress={()=>{this.setModalVisible(!modalVisible);}}>
    							Add Item
  							</Text>
						</TouchableOpacity> */}
								{this.getAddButton()}

								{this.getCreateOrderButton()}
							</ListItem.Content>
						</ListItem>
					}
				</View>

				<ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
					{this.state.items.map((x, i) => (
						<ListItem key={i} bottomDivider>
							<ListItem.Content>
								<ListItem.Title style={{ fontSize: 20, flexDirection: 'row' }}>
									{x.MealName}
								</ListItem.Title>
								<ListItem.Subtitle>{x.Availability}</ListItem.Subtitle>
								<ListItem.Subtitle>{x.Cost}</ListItem.Subtitle>
								<Image
									style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
									source={{ uri: x.Picture }}
								/>
							</ListItem.Content>
							{/* <Button  style={{borderRadius:50}} color="orange" title="Update Item" onPress={()=>{this.setEditModalVisible(!editModalVisible, x.MealName, x.Picture, x.Cost, x.Availability);}}/> */}
							{/* <TouchableOpacity style={[styles.updateButton, {display}]}> 
  							<Text style={styles.buttonText} onPress={()=>{this.setEditModalVisible(!editModalVisible, x.MealName, x.Picture, x.Cost, x.Availability);}}>
    							Update Item
  							</Text>
					</TouchableOpacity> */}

							{this.getUpdateButton(
								x.MealName,
								x.Picture,
								x.Cost,
								x.Availability
							)}

							{this.getBuyButton(x.MealID, x.MealName, x.Availability)}

							{/* <TouchableOpacity style={[styles.updateButton, {displayStaff}]}> 
  							<Text style={styles.buttonText} onPress={()=>{this.setInventoryModalVisible(!inventoryModalVisible, x.MealName, x.Picture, x.Cost, x.Availability);}}>
    							Update Item Status
  							</Text>
					</TouchableOpacity> */}
						</ListItem>
					))}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	addButton: {
		borderWidth: 1,
		height: 42,
		width: '35%',
		backgroundColor: 'limegreen',
		borderRadius: 5,
		padding: 4,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		textAlign: 'center',
	},

	updateButton: {
		borderWidth: 1,
		height: 42,
		width: '35%',
		backgroundColor: 'orange',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		textAlign: 'center',
	},

	buttonText: {
		fontSize: 15,
		color: 'white',
	},
});
