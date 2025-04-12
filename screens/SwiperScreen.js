import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DogSwiper from '../components/DogSwiper';
import { Ionicons } from '@expo/vector-icons';

const SwiperScreen = ({ matches, setMatches }) => {
  const swiperRef = useRef();
  const [dogIndex, setDogIndex] = useState(0);

  const dogs = [
    { name: 'Luna', age: 3, breed: 'Golden Retriever', image: 'https://placedog.net/800/600?id=1' },
    { name: 'Buddy', age: 5, breed: 'German Shepherd', image: 'https://placedog.net/800/600?id=2' },
    { name: 'Milo', age: 2, breed: 'French Bulldog', image: 'https://placedog.net/800/600?id=3' },
  ];

  const [swipedDogs, setSwipedDogs] = useState([]); // track swipe history manually

  const handleSwipeRight = (dog) => {
    setMatches((prev) => [...prev, dog]);
    setSwipedDogs((prev) => [...prev, dog]);
  };

  const handleSwiped = (index) => {
    setDogIndex(index + 1);
  };

  const swipeLeft = () => swiperRef.current?.swipeLeft();
  const swipeRight = () => swiperRef.current?.swipeRight();

  const rewind = () => {
    if (swipedDogs.length > 0) {
      const lastDog = swipedDogs[swipedDogs.length - 1];
      const lastIndex = dogs.findIndex((d) => d.name === lastDog.name);

      setDogIndex(lastIndex);
      setSwipedDogs((prev) => prev.slice(0, -1));
      swiperRef.current?.jumpToCardIndex(lastIndex);
    }
  };

  const outOfCards = dogIndex >= dogs.length;

  return (
    <View style={styles.container}>
      {!outOfCards ? (
        <DogSwiper
          dogs={dogs}
          swiperRef={swiperRef}
          onSwiped={handleSwiped}
          onSwipeRight={handleSwipeRight}
        />
      ) : (
        <View style={styles.noMoreContainer}>
          <Text style={styles.noMoreText}>🐾 No more dogs in your area!</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={rewind} style={styles.button}>
          <Ionicons name="play-back-circle" size={60} color="#6c5ce7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={swipeLeft} style={styles.button}>
          <Ionicons name="close-circle" size={72} color="#e74c3c" />
        </TouchableOpacity>
        <TouchableOpacity onPress={swipeRight} style={styles.button}>
          <Ionicons name="heart-circle" size={72} color="#2ecc71" />
        </TouchableOpacity>
      </View>
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
});

export default SwiperScreen;
