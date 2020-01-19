import React from 'react';
import { Fab } from "@material-ui/core";
import BrushIcon from '@material-ui/icons/Brush';
import { ThemeContext, THEME_LIGHT, THEME_DARK } from '../../contexts/theme.context';
import './ThemeFAB.css';

const THEME_TO_FAB_COLORS = {
  [THEME_LIGHT]: {
    color: 'white',
    backgroundColor: 'black'
  },
  [THEME_DARK]: {
    color: 'black',
    backgroundColor: 'white'
  },
};

function ThemeFAB() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    // material doesn't pass className props, have to use a wrapper
    <div className="ThemeFAB-container">
      <Fab
        onClick={toggleTheme}
        style={{ backgroundColor: THEME_TO_FAB_COLORS[theme].backgroundColor }}
      >
        <BrushIcon style={{ color: THEME_TO_FAB_COLORS[theme].color }} />
      </Fab>
    </div>
  );
}

export default ThemeFAB;