import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { Modal, TouchableHighlight, TouchableOpacity, TextInput, View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

export default class MenuScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			editModalVisible: false,

			items: [],

			mealName: "",
			editMealName: "",

			picture: "",

			cost: "",
			editCost: "",

			availability: ""

		};
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
		//retrieve the menu
		return fetch("https://ripple506.herokuapp.com/ViewMenu", {
			method: 'GET',
		})
		.then(response => response.json())
		.then(response => {
			this.setState({items: response});
		})
	});
	}

	setModalVisible = (visible) => {
		this.setState({modalVisible: visible});
	}

	setEditModalVisible = (visible, mealName, picture, cost, availability) => {
		this.setState({editModalVisible: visible});
		
		this.setState({mealName: mealName});
		this.setState({picture: picture});
		this.setState({cost: cost});
		this.setState({availability: availability});
	}

	manageEditModalVisible = (visible) => {
		this.setState({ editModalVisible: visible})
	}

	addItem = () => {
		// return fetch("https://ripple506.herokuapp.com/AddItem", {
		// 	method: 'POST'
		// })
	}

	updateItem = (MealName, Picture, Cost, Availability) => {
		// return fetch("https://ripple506.herokuapp.com/UpdateItem", {
		// 	method: 'POST',
		// })
	}

	render() {
		const {	modalVisible, editModalVisible} = this.state;

		return (
			<View>

			<Modal visible={modalVisible}>

			<View>
          <Text style={{fontSize: 30}}>Add Item</Text>

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

		 {/* availability dropdown */}
		 <DropDownPicker items={[
			 {label: 'Available', value: 'Available'},
			 {label: 'Unavailable', value: 'Unavailable'}
			 ]}
			 placeholder={'Available'} 
			 defaultValue={this.state.availability}
			 containerStyle={{height: 40}}
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
              onPress={()=>{this.setModalVisible(!modalVisible);}}
              >
                <Text style={{color: "black"}}> Close </Text>
                </TouchableOpacity>
            </View>

            </View>
          
          </View>


			</Modal>


			<Modal visible={editModalVisible}>

			<View>
          <Text style={{fontSize: 30}}>Update Item</Text>

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
				<View style={{marginBottom:"10%"}}></View>

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
              onPress={()=>{this.updateItem(this.state.editMealName, this.state.picture, this.state.editCost, this.state.availability);}}
              >
                <Text style={{color: "white"}}> Update </Text>
                </TouchableOpacity>
            </View>

                <View style={{marginTop: "2.5%", width: "80%"}}>
                <TouchableOpacity  style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 5 ,
              backgroundColor: "white", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.manageEditModalVisible(!editModalVisible);}}
              >
                <Text style={{color: "black"}}> Close </Text>
                </TouchableOpacity>
            </View>
          
          </View>

          </View>

			</Modal>
			
			<View>
				{<ListItem bottomDivider>
					<ListItem.Content style={{alignItems:"center", flexDirection:"row"}}>
					<Button style={{borderRadius:50}} color="green" title="Add Item" onPress={()=>{this.setModalVisible(!modalVisible);}}/>
					</ListItem.Content>
				</ListItem>
				}
			</View>

			<ScrollView contentContainerStyle={{paddingBottom: 60}}>
				          {
            this.state.items.map((x, i) => (
           
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={{fontSize: 20}}>
                    {x.MealName} 
                    </ListItem.Title>
					<ListItem.Subtitle>{x.Availability}</ListItem.Subtitle>   
					<ListItem.Subtitle>{x.Cost}</ListItem.Subtitle> 
					<ListItem.Subtitle>{x.MealID}</ListItem.Subtitle> 
					<ListItem.Subtitle>{x.Picture}</ListItem.Subtitle> 
                </ListItem.Content>
				<Button  style={{borderRadius:50}} color="orange" title="Update Item" onPress={()=>{this.setEditModalVisible(!editModalVisible, x.MealName, x.Picture, x.Cost, x.Availability);}}/>
              </ListItem>
         
            ))
          }
			</ScrollView>

			</View>
		);
	}
}
