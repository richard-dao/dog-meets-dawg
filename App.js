import React, { useContext, useState } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import LoginScreen from './screens/LoginScreen';
import MainWrapper from './navigation/MainWrapper';
import SignUpScreen from './screens/SignUpScreen'; // optional

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
    if (showSignUp) {
      return <SignUpScreen goToLogin={() => setShowSignUp(false)} />;
    }
    return (
      <LoginScreen
        onLogin={() => {}}
        goToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return <MainWrapper onLogout={() => {}} />;
};