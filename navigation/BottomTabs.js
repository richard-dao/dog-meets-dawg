import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SwiperScreen from '../screens/SwiperScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LocationScreen from '../screens/LocationScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs({ matches, setMatches }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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