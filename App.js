import React, { useContext, useState } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'; // optional
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

const AppContent = () => {
  const { user } = useContext(UserContext);
  const [showSignUp, setShowSignUp] = useState(false);

  if (!user) {
    return showSignUp ? (
      <SignUpScreen goToLogin={() => setShowSignUp(false)} />
    ) : (
      <LoginScreen
        onLogin={() => {}}
        goToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return <BottomTabs />;
};
