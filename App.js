import React, { useContext, useState } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
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

  // Show Sign Up screen
  if (!user && showSignUp) {
    return <SignUpScreen goToLogin={() => setShowSignUp(false)} />;
  }

  // Show Login screen
  if (!user) {
    return (
      <LoginScreen
        onLogin={() => {
          // No action needed here, user context will update and trigger BottomTabs render
        }}
        goToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  // User is logged in → show main app
  return <BottomTabs />;
};
