import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import { updateAccount } from '../services/api-endpoints';

const defaultAvatar = 'https://www.gravatar.com/avatar/?d=mp';

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const inputWidth = width * 0.45;
  const imageSize = width * 0.15; // smaller image size

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState(null);

  const [dogName, setDogName] = useState(user?.dogName || '');
  const [breed, setBreed] = useState(user?.dogBreed || '');
  const [age, setAge] = useState(user?.dogAge || '');
  const [dogBio, setDogBio] = useState(user?.dogBio || '');
  const [dogImage, setDogImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const pickImage = async (setter) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const updatedUser = {
      ...user.user,
      name,
      bio,
      dogName,
      dogBreed: breed,
      dogAge: age,
      dogBio,
      profileImage,
      dogImage,
    };

    try {
      await updateAccount(updatedUser);
      setUser(updatedUser);
      setPreviewData(updatedUser);
      alert('Profile updated!');
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderImageWithIcon = (imageUri, setImageFn) => {
    return (
      <TouchableOpacity
        onPress={() => pickImage(setImageFn)}
        style={[
          styles.imageWrapper,
          {
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
          },
        ]}
      >
        <Image
          source={{ uri: imageUri || defaultAvatar }}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            resizeMode: 'cover',
          }}
        />
        <View style={styles.pencilOverlay}>
          <Ionicons name="pencil" size={14} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Your Info</Text>
      <View style={styles.row}>
        <View style={[styles.formColumn, { width: inputWidth }]}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={user?.email}
            editable={false}
            style={[styles.input, { backgroundColor: '#eee' }]}
          />
          <TextInput
            placeholder="Password"
            value="********"
            editable={false}
            style={[styles.input, { backgroundColor: '#eee' }]}
          />
          <TextInput
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
            style={styles.input}
            multiline
          />
        </View>
        {renderImageWithIcon(profileImage, setProfileImage)}
      </View>

      <Text style={styles.sectionTitle}>Your Pet</Text>
      <View style={styles.row}>
        <View style={[styles.formColumn, { width: inputWidth }]}>
          <TextInput
            placeholder="Dog Name"
            value={dogName}
            onChangeText={setDogName}
            style={styles.input}
          />
          <TextInput
            placeholder="Dog Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Dog Breed"
            value={breed}
            onChangeText={setBreed}
            style={styles.input}
          />
          <TextInput
            placeholder="Dog Bio"
            value={dogBio}
            onChangeText={setDogBio}
            style={styles.input}
            multiline
          />
        </View>
        {renderImageWithIcon(dogImage, setDogImage)}
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Save</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {previewData && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Preview</Text>
          <View style={styles.previewRow}>
            <Image
              source={{ uri: previewData.profileImage || defaultAvatar }}
              style={styles.previewImage}
            />
            <View style={styles.previewText}>
              <Text style={styles.previewLabel}>User: {previewData.name}</Text>
              <Text style={styles.previewLabel}>Bio: {previewData.bio}</Text>
            </View>
          </View>

          <View style={styles.previewRow}>
            <Image
              source={{ uri: previewData.dogImage || defaultAvatar }}
              style={styles.previewImage}
            />
            <View style={styles.previewText}>
              <Text style={styles.previewLabel}>Dog: {previewData.dogName}</Text>
              <Text style={styles.previewLabel}>Age: {previewData.dogAge}</Text>
              <Text style={styles.previewLabel}>Breed: {previewData.dogBreed}</Text>
              <Text style={styles.previewLabel}>Bio: {previewData.dogBio}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 16,
    flexWrap: 'wrap',
  },
  formColumn: {
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 2,
    overflow: 'hidden',
  },
  pencilOverlay: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#0008',
    borderRadius: 10,
    padding: 3,
  },
  saveButton: {
    backgroundColor: '#4cd137',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  previewContainer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  previewText: {
    flex: 1,
  },
  previewLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
});

export default ProfileScreen;
