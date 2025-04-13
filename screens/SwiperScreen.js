import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import DogSwiper from '../components/DogSwiper';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const SwiperScreen = () => {
  const swiperRef = useRef();
  const [dogIndex, setDogIndex] = useState(0);

  const dogs = [
    { name: 'Luna', age: 3, breed: 'Golden Retriever', image: 'https://placedog.net/800/600?id=1' },
    { name: 'Buddy', age: 5, breed: 'German Shepherd', image: 'https://placedog.net/800/600?id=2' },
    { name: 'Milo', age: 2, breed: 'French Bulldog', image: 'https://placedog.net/800/600?id=3' },
  ];

  const handleSwiped = (index) => {
    setDogIndex(index + 1);
  };

  const swipeLeft = () => swiperRef.current?.swipeLeft();
  const swipeRight = () => swiperRef.current?.swipeRight();

  const outOfCards = dogIndex >= dogs.length;

  return (
    <View style={styles.container}>
      {!outOfCards ? (
        <DogSwiper
          dogs={dogs}
          swiperRef={swiperRef}
          onSwiped={handleSwiped}
        />
      ) : (
        <View style={styles.noMoreContainer}>
          <Text style={styles.noMoreText}>🐾 No more dogs in your area!</Text>
        </View>
      )}

      {/* ✅ Like / Dislike buttons over the bottom of the card image */}
      {!outOfCards && (
        <View style={styles.overlayButtons}>
          <TouchableOpacity onPress={swipeLeft} style={styles.overlayButton}>
            <Ionicons name="close-circle" size={72} color="#e74c3c" />
          </TouchableOpacity>
          <TouchableOpacity onPress={swipeRight} style={styles.overlayButton}>
            <Ionicons name="heart-circle" size={72} color="#2ecc71" />
          </TouchableOpacity>
        </View>
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
  overlayButtons: {
    position: 'absolute',
    bottom: height * 0.26, // 👈 visually sits over the image
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    zIndex: 10,
    paddingHorizontal: 20,
  },
  overlayButton: {
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 12,
    elevation: 5,
  },
});

export default SwiperScreen;
