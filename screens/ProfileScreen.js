import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';
import { updateAccount } from '../services/api-endpoints';

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [dogName, setDogName] = useState(user?.dogName || '');
  const [breed, setBreed] = useState(user?.dogBreed || '');
  const [age, setAge] = useState(user?.dogAge || '');
  const [bio, setBio] = useState(user?.dogBio || '');

  const handleSave = async () => {
    const updatedUser = {
      ...user.user,
      dogName,
      dogBreed:breed,
      dogAge: age,
      dogBio: bio,
    };
    console.log(updatedUser);
    // alert('Profile updated!');
    try {
      const response = await updateAccount(updatedUser);
      setUser(updatedUser);
      alert('Profile updated!');
    } catch (err) {
      alert('Failed to updated profile');
      console.error(err);
    }

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