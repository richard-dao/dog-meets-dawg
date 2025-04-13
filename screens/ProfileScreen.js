import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [dogName, setDogName] = useState(user?.dogName || '');
  const [breed, setBreed] = useState(user?.breed || '');
  const [age, setAge] = useState(String(user?.age || ''));
  const [bio, setBio] = useState(user?.bio || '');

  const handleSave = () => {
    setUser({
      ...user,
      dogName,
      breed,
      age: parseInt(age),
      bio,
    });
    alert('Profile updated!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text>Email: {user?.email}</Text>

      <TextInput
        placeholder="Dog Name"
        value={dogName}
        onChangeText={setDogName}
        style={styles.input}
      />
      <TextInput
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
        style={[styles.input, styles.bioInput]}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
});

export default ProfileScreen;