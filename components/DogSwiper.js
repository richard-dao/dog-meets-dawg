import React from 'react';
import Swiper from 'react-native-deck-swiper';
import { View, StyleSheet } from 'react-native';
import DogCard from './DogCard';

const DogSwiper = ({ dogs, swiperRef, onSwiped }) => {
  return (
    <View style={styles.swiperContainer}>
      <Swiper
        ref={swiperRef}
        cards={dogs}
        renderCard={(dog) => <DogCard {...dog} />}
        onSwiped={onSwiped} // ✅ Only handling general swipe
        stackSize={3}
        backgroundColor={'#f0f0f0'}
        cardIndex={0}
        animateCardOpacity
        disableTopSwipe
        disableBottomSwipe
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1,
  },
});

export default DogSwiper;
