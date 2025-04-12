import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DogSwiper from '../components/DogSwiper';
import { Ionicons } from '@expo/vector-icons';

const SwiperScreen = ({ matches, setMatches }) => {
  const dogs = [
    { name: 'Luna', age: 3, image: 'https://placedog.net/800/600?id=1' },
    { name: 'Buddy', age: 5, image: 'https://placedog.net/800/600?id=2' },
    { name: 'Milo', age: 2, image: 'https://placedog.net/800/600?id=3' },
  ];

  let swiperRef = React.useRef();

  const swipeLeft = () => swiperRef?.current?.swipeLeft();
  const swipeRight = () => swiperRef?.current?.swipeRight();

  return (
    <View style={styles.container}>
      <DogSwiper
        dogs={dogs}
        onSwipeRight={(dog) => setMatches((prev) => [...prev, dog])}
        swiperRef={swiperRef}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={swipeLeft}>
          <Ionicons name="close-circle" size={64} color="#ff5b5b" />
        </TouchableOpacity>
        <TouchableOpacity onPress={swipeRight}>
          <Ionicons name="heart-circle" size={64} color="#4cd137" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 24,
  },
});

export default SwiperScreen;