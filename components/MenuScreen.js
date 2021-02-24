import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import {
	Modal,
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
<<<<<<< HEAD
		console.log(this.state.modalVisible);
		this.setState({ modalVisible: !this.state.modalVisible });
	};
=======
		this.setState({modalVisible: !this.state.modalVisible});
	}
>>>>>>> 231a129a90b7568837faa40845889e1424077e57

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
					console.log(items);
					this.setState({ items: response });
				});
		});
	};

	updateItem = (MealName, Picture, Cost, Availability) => {
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
					this.setState({ items: response });
				});
		});
	};

	updateItemStatus = () => {
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
					this.setState({ items: response });
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
<<<<<<< HEAD
					'UserName': this.props.username,
					'FoodItems': this.state.order,
					'DateCreated': new Date(),
				}),
			}).then((response) => {
				// alert(response.json());
				// clear the order queue
				this.setState({ order: [] });
				alert('Order created!');
			});
=======
					"UserName": this.props.username,
					"FoodItems": this.state.order,
					"DateCreated": new Date()
					})
			})
			.then(response => {
				return fetch('https://ripple506.herokuapp.com/GetAccountInfo', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"UserName": this.props.username
					})
				})
				.then(response => response.json())
				.then(response => {
					alert("Order created! Payment confirmed with " + response.PaymentType)
					
					// clear the order queue
					this.setState({order: []})
				})

			})

			
>>>>>>> 231a129a90b7568837faa40845889e1424077e57
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

	addItemToOrder = (mealID, mealName) => {
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
	};

	getBuyButton = (mealID, mealName) => {
<<<<<<< HEAD
		if (this.props.role == 'Customer') {
			return (
				<TouchableOpacity style={[styles.updateButton]}>
					<Text
						style={styles.buttonText}
						onPress={() => {
							this.addItemToOrder(mealID, mealName);
						}}>
						Buy
					</Text>
				</TouchableOpacity>
			);
		}
	};

	getCreateOrderButton = () => {
		if (this.props.role == 'Customer') {
			return (
				<TouchableOpacity style={[styles.addButton]}>
					<Text
						style={styles.buttonText}
						onPress={() => {
							this.createOrder();
						}}>
						Create Order
					</Text>
				</TouchableOpacity>
			);
=======
		if(this.props.role == "Customer") {
			return (<TouchableOpacity style={[styles.updateButton]}> 
				<Text style={styles.buttonText} onPress={()=>{this.addItemToOrder(mealID, mealName);}}>
				  Add to order
				</Text>
				  </TouchableOpacity>
				)
		}
	}

	getCreateOrderButton= () => {
		if(this.props.role == "Customer") {
			return (<View>
			<Text>Current order: {this.state.orderNames}</Text>	
			<TouchableOpacity style={[styles.addButton]}> 
				<Text style={styles.buttonText} onPress={()=>{this.createOrder();}}>
				  Finalize order
				</Text>
				  </TouchableOpacity>
				  </View>
				)
>>>>>>> 231a129a90b7568837faa40845889e1424077e57
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
<<<<<<< HEAD
				<Modal visible={modalVisible}>
					<View>
						<Text style={{ fontSize: 30 }}>Add Item</Text>

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
						<Text style={{ fontSize: 30 }}>Update Item</Text>

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
						<Text style={{ fontSize: 30 }}>Update Item Status</Text>

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
=======

			<Modal visible={modalVisible}>

			<View>
          <Text style={{fontSize: 30, marginTop:"50%", justifyContent: "center"
              , alignSelf: "center", alignContent: "center", alignItems: "center"}}>Add Item</Text>

          <View style={{width: "100%", justifyContent: "center"
              , alignSelf: "center", alignContent: "center", alignItems: "center"
              }}>

          <TextInput multiline={true} placeholder={"Meal name"}
          onChangeText={(value)=> this.setState({mealName: value})}
          style={{ height: 42, width: "80%", borderBottomWidth: 1}}
          />

          
          <TextInput style={{marginTop: "40%"}} placeholder={"Meal cost"}
          onChangeText={(value)=> this.setState({cost: value})}
          style={{ height: 42, width: "80%", borderBottomWidth: 1}}
          />

		  {/* picture */}
		  <TextInput style={{marginTop: "40%"}} placeholder={"Picture"}
          onChangeText={(value)=> this.setState({picture: value})}
          style={{ height: 42, width: "80%", borderBottomWidth: 1}}
          />

		  <View style={{marginBottom:"5%"}}></View>

		 {/* availability dropdown */}
		 <DropDownPicker items={[
			 {label: 'Available', value: 'Available'},
			 {label: 'Unavailable', value: 'Unavailable'}
			 ]}
			 placeholder={'Available'} 
			 defaultValue={this.state.availability}
			 containerStyle={{width: 150, height: 40}}
			 style={{backgroundColor: '#fafafa'}}
			 itemStyle={{
				 justifyContent: 'flex-start'
			 }}
			 dropDownStyle={{backgroundColor: '#fafafa'}}
    		 onChangeItem={item => this.setState({
        	 availability: item.value
    		 })}
			 />

          <View style={{marginTop: "5%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 5,
              backgroundColor: "black", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.addItem();}}
              >
                <Text style={{color: "white"}}> Add </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: "2.5%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 5,
              backgroundColor: "white", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.setModalVisible();}}
              >
                <Text style={{color: "black"}}> Close </Text>
                </TouchableOpacity>
            </View>

            </View>
          
          </View>


			</Modal>


			<Modal visible={editModalVisible}>

			<View>
          <Text style={{fontSize: 30, marginTop:"50%", justifyContent: "center"
              , alignSelf: "center", alignContent: "center", alignItems: "center"}}>Update Item</Text>

          <View style={{width: "100%", justifyContent: "center"
              , alignSelf: "center", alignContent: "center", alignItems: "center"
              }}>
              
              <Text style={{marginTop: "2.5%", fontSize: 20}}>Meal name: {this.state.mealName}</Text>
                <TextInput placeholder={this.state.mealName}
                onChangeText={(value)=> this.setState({editMealName: value})}
                style={{ height: 42, width: "80%", borderBottomWidth: 1}}
                />

                <TextInput style={{marginTop: "40%"}} placeholder={this.state.cost}
                onChangeText={(value)=> this.setState({editCost: value})}
                style={{ height: 42, width: "80%", borderBottomWidth: 1}}
                />


				{/* picture */}
		  		<TextInput style={{marginTop: "40%"}} placeholder={this.state.picture}
          		onChangeText={(value)=> this.setState({editPicture: value})}
          		style={{ height: 42, width: "80%", borderBottomWidth: 1}}
          		/>

				<View style={{marginBottom:"5%"}}></View>

		 		{/* availability dropdown */}
				 <DropDownPicker items={[
			 	{label: 'Available', value: 'Available'},
			 	{label: 'Unavailable', value: 'Unavailable'}
			 	]} 
				 placeholder={'Available'}
				 defaultValue={this.state.availability}
			 	containerStyle={{width: 150, height: 40}}
			 	style={{backgroundColor: '#fafafa'}}
			 	itemStyle={{
				 justifyContent: 'flex-start'
			 	}}
			 	dropDownStyle={{backgroundColor: '#fafafa'}}
    		 	onChangeItem={item => this.setState({
        	 	availability: item.value
    		 	})}
			 	/>

            <View style={{marginTop: "5%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 5 ,
              backgroundColor: "black", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.updateItem(this.state.editMealName, this.state.editPicture, this.state.editCost, this.state.availability);}}
              >
                <Text style={{color: "white"}}> Update </Text>
                </TouchableOpacity>
            </View>

                <View style={{marginTop: "2.5%", width: "80%"}}>
                <TouchableOpacity  style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 5 ,
              backgroundColor: "white", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.manageEditModalVisible();}}
              >
                <Text style={{color: "black"}}> Close </Text>
                </TouchableOpacity>
            </View>
          
          </View>

          </View>

			</Modal>

			<Modal visible={inventoryModalVisible}>

			<View>
          <Text style={{fontSize: 30, marginTop:"50%", justifyContent: "center"
              , alignSelf: "center", alignContent: "center", alignItems: "center"}}>Update Item Status</Text>

          <View style={{width: "100%", justifyContent: "center"
              , alignSelf: "center", alignContent: "center", alignItems: "center"
              }}>
              
              <Text style={{marginTop: "2.5%", fontSize: 20}}>Meal name: {this.state.mealName}</Text>

		 		{/* availability dropdown */}
				 <DropDownPicker items={[
			 	{label: 'Available', value: 'Available'},
			 	{label: 'Unavailable', value: 'Unavailable'}
			 	]} 
				 placeholder={'Available'}
				 defaultValue={this.state.availability}
			 	containerStyle={{width: 150, height: 40}}
			 	style={{backgroundColor: '#fafafa'}}
			 	itemStyle={{
				 justifyContent: 'flex-start'
			 	}}
			 	dropDownStyle={{backgroundColor: '#fafafa'}}
    		 	onChangeItem={item => this.setState({
        	 	availability: item.value
    		 	})}
			 	/>

            <View style={{marginTop: "5%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 5 ,
              backgroundColor: "black", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.updateItemStatus();}}
              >
                <Text style={{color: "white"}}> Update </Text>
                </TouchableOpacity>
            </View>

                <View style={{marginTop: "2.5%", width: "80%"}}>
                <TouchableOpacity  style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 5 ,
              backgroundColor: "white", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.manageInventoryModalVisible();}}
              >
                <Text style={{color: "black"}}> Close </Text>
                </TouchableOpacity>
            </View>
          
          </View>

          </View>

			</Modal>
			
			<View>
				{<ListItem bottomDivider>
					<ListItem.Content style={{alignItems:"center", flexDirection:"column"}}>
					{/* <Button style={{borderRadius:50}} color="green" title="Add Item" onPress={()=>{this.setModalVisible(!modalVisible);}}/> */}
						{/* <TouchableOpacity style={[styles.addButton, {display}]}> 
>>>>>>> 231a129a90b7568837faa40845889e1424077e57
  							<Text style={styles.buttonText} onPress={()=>{this.setModalVisible(!modalVisible);}}>
    							Add Item
  							</Text>
						</TouchableOpacity> */}
<<<<<<< HEAD
								{this.getAddButton()}

								<ListItem.Subtitle>
									<Text>{this.state.orderNames}</Text>
								</ListItem.Subtitle>

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
								<ListItem.Subtitle>{x.MealID}</ListItem.Subtitle>
								<ListItem.Subtitle>{x.Picture}</ListItem.Subtitle>
							</ListItem.Content>
							{/* <Button  style={{borderRadius:50}} color="orange" title="Update Item" onPress={()=>{this.setEditModalVisible(!editModalVisible, x.MealName, x.Picture, x.Cost, x.Availability);}}/> */}
							{/* <TouchableOpacity style={[styles.updateButton, {display}]}> 
=======
						{this.getAddButton()}		

						{this.getCreateOrderButton()}
						
					</ListItem.Content>
				</ListItem>
				}
			</View>

			<ScrollView contentContainerStyle={{paddingBottom: 60}}>
				          {
            this.state.items.map((x, i) => (
           
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={{fontSize: 20, flexDirection: "row"}}>
                    {x.MealName} 
					
		

                    </ListItem.Title>
					<ListItem.Subtitle>{x.Availability}</ListItem.Subtitle>   
					<ListItem.Subtitle>{x.Cost}</ListItem.Subtitle> 
					<ListItem.Subtitle>{x.MealID}</ListItem.Subtitle> 
					<ListItem.Subtitle>{x.Picture}</ListItem.Subtitle> 
                </ListItem.Content>
				{/* <Button  style={{borderRadius:50}} color="orange" title="Update Item" onPress={()=>{this.setEditModalVisible(!editModalVisible, x.MealName, x.Picture, x.Cost, x.Availability);}}/> */}
					{/* <TouchableOpacity style={[styles.updateButton, {display}]}> 
>>>>>>> 231a129a90b7568837faa40845889e1424077e57
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

							{this.getBuyButton(x.MealID, x.MealName)}

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
		backgroundColor: 'green',
		borderRadius: 5,
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
