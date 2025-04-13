import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DogSwiper from '../components/DogSwiper';
import { Ionicons } from '@expo/vector-icons';
import { getAccounts, handleMatch } from '../services/api-endpoints';
import { UserContext } from '../context/UserContext';

const SwiperScreen = ({ matches, setMatches }) => {
	const swiperRef = useRef();
	const [dogIndex, setDogIndex] = useState(0);
	const { user, setUser } = useContext(UserContext);

	const [dogs, setDogs] = useState([]);

	useEffect(() => {
		async function fetchDogs() {
			const result = await getAccounts(user?.userID);
			if (result) {
				setDogs(result);
				console.log(dogs);
			}
		}
		if (dogs.length === 0) {
			fetchDogs();
		}
	}), [user?.userID];

	const [swipedDogs, setSwipedDogs] = useState([]); 

	const handleSwipeRight = async () => {
		// Just go to next dog — no matches tracked
		setDogIndex((prev) => prev + 1);
		const swipedUserID = dogs[dogIndex].userID;
		console.log("Swiped right!");
		const response = await handleMatch(user.userID, swipedUserID);
	};

	const handleSwiped = (index) => {
		setDogIndex(index + 1);
	};

	const swipeLeft = () => swiperRef.current?.swipeLeft();
	const swipeRight = () => swiperRef.current?.swipeRight();


	const outOfCards = dogIndex >= dogs.length;

	return (
		<View style={styles.container}>
			{dogs.length > 0 && (
				!outOfCards ? (
					<DogSwiper
						dogs={dogs}
						swiperRef={swiperRef}
						onSwiped={handleSwiped}
						onSwipedRight={handleSwipeRight}
					/>
				) : (
					<View style={styles.noMoreContainer}>
						<Text style={styles.noMoreText}>🐾 No more dogs in your area!</Text>
					</View>
				)
			)}

		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	noMoreContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
	},
	noMoreText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#444',
		textAlign: 'center',
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 40,
		left: 0,
		right: 0,
		zIndex: 100,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	button: {
		borderRadius: 50,
	},
	overlayButtons: {
		position: 'absolute',
		bottom: '30%',
		width: 700,
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'space-around',
		alignItems: 'center',
		zIndex: 10,
		margin: 5
	},

	overlayButton: {
		borderRadius: 50,
		backgroundColor: 'rgba(255,255,255,0.85)',
		padding: 10,
	}
});

export default SwiperScreen;
