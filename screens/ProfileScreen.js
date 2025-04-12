import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [bio, setBio] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [profilePic, setProfilePic] = useState('https://placehold.co/300x300?text=Your+Dog');

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need camera roll permissions to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleUpload}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text style={styles.uploadText}>Tap to upload</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Change Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

      <Text style={styles.label}>Change Password</Text>
      <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

      <Text style={styles.label}>Breed</Text>
      <TextInput value={breed} onChangeText={setBreed} style={styles.input} />

      <Text style={styles.label}>Dog Age</Text>
      <TextInput value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Tell us about your pup..."
        style={[styles.input, styles.bioInput]}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  profilePic: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  uploadText: {
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
});

export default ProfileScreen;