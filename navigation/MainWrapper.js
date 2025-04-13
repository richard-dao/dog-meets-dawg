import React, { useContext } from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import { UserContext } from '../context/UserContext';
import BottomTabs from './BottomTabs';

const MainWrapper = ({ onLogout }) => {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    onLogout();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Button title="Log Out" onPress={handleLogout} color="#ff6b6b" />
      </View>
      <BottomTabs />
    </SafeAreaView>
  );
};

export default MainWrapper;