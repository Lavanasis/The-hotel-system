import { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalDarkMode from '../hooks/useLocalDarkMode';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalDarkMode();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode(prev => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DarkModeContext, DarkModeProvider };
