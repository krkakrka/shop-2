import React from 'react';
export const ThemeContext = React.createContext();

export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';

export const ThemeProvider = (props) => {
  const [theme, setTheme] = React.useState(THEME_DARK);
  const toggleTheme = () => {
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const withTheme = (Component) => {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        {(theme) => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
};