import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DogCard = ({ name, age, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}, {age}</Text>
        <Text style={styles.subtitle}>Looking for new pup friends 🐾</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width,
    height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: width,
    height: height * 0.65,
    resizeMode: 'cover',
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 6,
  },
});

export default DogCard;