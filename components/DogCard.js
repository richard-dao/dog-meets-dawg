import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const cardWidth = isWeb ? Math.min(deviceWidth * 0.95, 500) : deviceWidth;
const cardHeight = isWeb ? cardWidth * 1.4 : deviceHeight;

const DogCard = ({ dogName, dogAge, dogImage, dogBreed, dogBio }) => {

	return (
		<View style={styles.cardWrapper}>
			<View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
				<Image source={{ uri: dogImage }} style={[styles.image, { width: cardWidth, height: cardHeight * 0.65 }]} />
				<View style={styles.infoContainer}>
					<Text style={styles.name}>{dogName}, {dogAge}</Text>
					<Text style={styles.breed}>{dogBreed}</Text>
					<Text style={styles.subtitle}>{dogBio}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 20,
		overflow: 'hidden',
		elevation: 5,
	},
	image: {
		resizeMode: 'cover',
	},
	infoContainer: {
		width: '100%',
		paddingHorizontal: 20,
		paddingTop: 16,
	},
	name: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	breed: {
		fontSize: 18,
		color: '#333',
		fontStyle: 'italic',
		marginTop: 4,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		marginTop: 10,
	},
});

export default DogCard;
