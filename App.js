import React, { useState } from 'react';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  const [matches, setMatches] = useState([]);
  return <BottomTabs matches={matches} setMatches={setMatches} />;
}