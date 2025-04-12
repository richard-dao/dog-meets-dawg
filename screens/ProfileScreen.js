import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [profilePic, setProfilePic] = useState('https://placehold.co/300x300?text=Your+Dog');
  const [email] = useState('user@example.com'); // shown only
  const [storedPassword, setStoredPassword] = useState('password123'); // simulate saved password

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [dogBio, setDogBio] = useState('');
  const [humanBio, setHumanBio] = useState('');
  const [phone, setPhone] = useState('');

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

  const handleSave = () => {
    if (currentPassword && newPassword) {
      if (currentPassword !== storedPassword) {
        Alert.alert('Incorrect Password', 'Current password is incorrect.');
        return;
      }
      setStoredPassword(newPassword);
    }

    console.log({
      dogName,
      breed,
      age,
      dogBio,
      humanBio,
      phone,
      email,
      newPassword: newPassword ? '(updated)' : '(unchanged)',
    });

    Alert.alert('Saved!', 'Your profile info has been saved.');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleUpload}>
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
          <Text style={styles.uploadText}>Tap to upload</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Email</Text>
        <TextInput value={email} editable={false} style={[styles.input, styles.disabledInput]} />

        <Text style={styles.label}>Dog Name</Text>
        <TextInput value={dogName} onChangeText={setDogName} style={styles.input} />

        <Text style={styles.label}>Breed</Text>
        <TextInput value={breed} onChangeText={setBreed} style={styles.input} />

        <Text style={styles.label}>Dog Age</Text>
        <TextInput value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />

        <Text style={styles.label}>Dog Bio</Text>
        <TextInput
          value={dogBio}
          onChangeText={setDogBio}
          placeholder="Tell us about your pup..."
          style={[styles.input, styles.bioInput]}
          multiline
        />

        <Text style={styles.label}>Human Bio</Text>
        <TextInput
          value={humanBio}
          onChangeText={setHumanBio}
          placeholder="Tell us about yourself..."
          style={[styles.input, styles.bioInput]}
          multiline
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

        <Text style={styles.label}>Current Password</Text>
        <TextInput
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={styles.input}
          secureTextEntry
          placeholder="Enter current password"
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
          secureTextEntry
          placeholder="Enter new password"
        />

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 160,
    height: 160,
    borderRadius: 80,
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
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  input: {
    width: '100%',
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
  disabledInput: {
    backgroundColor: '#eee',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
