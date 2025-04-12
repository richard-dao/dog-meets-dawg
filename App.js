import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import BottomTabs from './navigation/BottomTabs';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [matches, setMatches] = useState([]); // 👈 make sure this is here

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.body.style.backgroundColor = '#fff';
      document.body.style.margin = '0';
    }
  }, []);

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <BottomTabs matches={matches} setMatches={setMatches} />
      ) : (
        <LoginScreen onLogin={() => setLoggedIn(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});