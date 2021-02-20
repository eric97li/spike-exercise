import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
export default class OrderItem extends React.Component {
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
		order.map((foodItem) => {
			console.log(foodItem[2]);
		});

		return (
			<View style={styles.mealcard}>
				<Text style={styles.mealtitle}>Monday</Text>
				{order.map((foodItem) => {
					console.log(foodItem[0]);
					return (
						<View style={styles.foodcard} key={foodItem[0]}>
							<Text>
								{foodItem[1]} for ${foodItem[3]}
							</Text>
							<Image
								source={{
									uri: foodItem[2],
								}}
								style={{ width: 60, height: 60 }}
							/>
						</View>
					);
				})}
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
	},
	mealtitle: {
		textAlign: 'left',
	},
	mealcard: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 7,
		marginTop: 7,
		borderColor: '#5EA9F4',
		borderWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
	},
});
