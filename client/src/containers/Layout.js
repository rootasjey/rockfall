import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

export default function Layout({ children }) {
  return (
    <div>
      <h1>Rockfall</h1>
      {children}
    </div>
  )
}
