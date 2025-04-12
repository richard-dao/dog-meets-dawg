import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const isWeb = Platform.OS === 'web';
const cardWidth = isWeb ? Math.min(deviceWidth * 0.9, 500) : deviceWidth;
const cardHeight = isWeb ? cardWidth * 1.4 : deviceHeight;

const DogCard = ({ name, age, image }) => {
  return (
    <View style={[styles.cardWrapper, isWeb && styles.cardWrapperWeb]}>
      <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <Image
          source={{ uri: image }}
          style={[styles.image, { width: cardWidth, height: cardHeight * 0.65 }]}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}, {age}</Text>
          <Text style={styles.subtitle}>Looking for new pup friends 🐾</Text>
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
  cardWrapperWeb: {
    paddingTop: 40,
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
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 6,
  },
});

export default DogCard;
