import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
export default class OrderComponent extends React.Component {
	compilePDF() {
		console.log('Compile PDF Functionality Yet to be Implemented');
	}
	render() {
		//replace with props.order eventually
		let order = [
			[
				'12343',
				'dish1',
				'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563',
				'10',
			],
			[
				'12452',
				'dish2',
				'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563',
				'24',
			],
		];
		// order.map((foodItem) => {
		// 	console.log(foodItem[2]);
		// });

		return (
			<View style={styles.mealcard}>
				<Text style={styles.mealtitle}>Ready to be Picked Up!</Text>
				<View style={styles.row}>
					{order.map((foodItem) => {
						return (
							<View style={styles.foodcard} key={foodItem[0]}>
								<Text style={{ marginBottom: 5 }}>
									{foodItem[1]} for ${foodItem[3]}
								</Text>
								<Image
									source={{
										uri: foodItem[2],
									}}
									style={{ width: 100, height: 100, marginBottom: 5 }}
								/>
								<TouchableOpacity
									title='Compile PDF'
									onPress={this.compilePDF}
								/>
							</View>
						);
					})}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	foodcard: {
		alignItems: 'center',
		marginBottom: 7,
		marginTop: 7,
		marginLeft: 5,
		borderColor: '#5EA9F4',
		borderWidth: 1,
		width: 150,
	},
	mealtitle: {
		textAlign: 'left',
		marginRight: 10,
	},
	mealcard: {
		width: '100%',
		marginBottom: 7,
		marginTop: 7,
		borderColor: '#5EA9F4',
		borderWidth: 2,
	},
	row: {
		flexDirection: 'row',
	},
	spaceVertical: {
		height: 15,
	},
});
