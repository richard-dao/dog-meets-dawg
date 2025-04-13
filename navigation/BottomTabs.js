import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SwiperScreen from '../screens/SwiperScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../screens/ChatListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';

const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

function ChatStackNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Chats' }} />
      <ChatStack.Screen name="ChatRoom" component={ChatRoomScreen} options={({ route }) => ({ title: route.params.chat.userInfo.dogName })} />
    </ChatStack.Navigator>
  );
}

export default function BottomTabs({ matches, setMatches }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Swipe') iconName = 'paw';
            else if (route.name === 'Matches') iconName = 'heart';
            else if (route.name === 'Profile') iconName = 'person';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Swipe">
          {() => <SwiperScreen matches={matches} setMatches={setMatches} />}
        </Tab.Screen>
        <Tab.Screen name="Matches" component={ChatStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}