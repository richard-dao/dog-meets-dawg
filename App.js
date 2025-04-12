import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.body.style.backgroundColor = '#fff';
      document.body.style.margin = '0';
    }
  }, []);

  return (
    <View style={styles.container}>
      {!loggedIn ? (
        showSignUp ? (
          <SignUpScreen onSignUp={() => setShowSignUp(false)} />
        ) : (
          <LoginScreen
            onLogin={() => setLoggedIn(true)}
            goToSignUp={() => setShowSignUp(true)}
          />
        )
      ) : (
        <BottomTabs matches={matches} setMatches={setMatches} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
