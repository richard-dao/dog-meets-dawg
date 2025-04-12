import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';

import SwiperScreen from '../screens/SwiperScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LocationScreen from '../screens/LocationScreen';

const Tab = createBottomTabNavigator();

function TabTitle({ name }) {
  return (
    <View style={styles.header}>
      <Text style={styles.titleText}>{name}</Text>
    </View>
  );
}

export default function BottomTabs({ matches, setMatches }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          header: () =>
            route.name === 'Swipe' ? (
              <View style={styles.overlayContainer}>
                <Text style={styles.overlayTitle}>🐾 Dog Meets Dawgs 🐾</Text>
              </View>
            ) : (
              <TabTitle name={route.name} />
            ),
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 60,
            borderTopWidth: 1,
            borderTopColor: '#eee',
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 12,
          },
          tabBarActiveTintColor: '#ff8c42',
          tabBarInactiveTintColor: '#999',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Swipe') iconName = 'paw';
            else if (route.name === 'Matches') iconName = 'heart';
            else if (route.name === 'Profile') iconName = 'person';
            else if (route.name === 'Location') iconName = 'location';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Swipe">
          {() => <SwiperScreen matches={matches} setMatches={setMatches} />}
        </Tab.Screen>
        <Tab.Screen name="Matches" component={MatchesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Location" component={LocationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 30,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  overlayTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: '#000000aa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'web' ? 20 : 40,
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#4a2c2a',
  },
});