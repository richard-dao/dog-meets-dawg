import React, { createContext, useState } from 'react';

export const MatchesContext = createContext();

export const MatchesProvider = ({ children }) => {
  const [matches, setMatches] = useState(null);

  return (
	<MatchesContext.Provider value={{ matches, setMatches }}>
	  {children}
	</MatchesContext.Provider>
  );
};