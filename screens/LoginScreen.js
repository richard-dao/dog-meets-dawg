import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../services/api-endpoints';
import { UserContext } from '../context/UserContext';

const LoginScreen = ({ onLogin, goToSignUp }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    const loginPayload = { email, password };
    const loginResult = await login(loginPayload);

    setTimeout(() => {
      setLoading(false);
      if (loginResult) {
        setUser({ email, ...loginResult.user });
        onLogin();
      } else {
        alert("Error logging in.");
      }
    }, 2000); // show spinner briefly before switching
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Dog Meets Dawg</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? 'eye-off' : 'eye'}
              size={24}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, loading && { opacity: 0.7 }]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.staticText}>Don't have an account? </Text>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#4a2c2a',
    fontFamily: 'serif',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    maxWidth: 350,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    maxWidth: 350,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#ff8c42',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    maxWidth: 350,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  staticText: {
    color: '#444',
  },
  link: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
