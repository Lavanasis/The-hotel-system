import { useState, useEffect } from 'react';

export default function useLocalDarkMode() {
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('isDarkMode');
    return stored !== null ? JSON.parse(stored) : prefersDark;
  });

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode)); //布尔值转换为字符串
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
}
