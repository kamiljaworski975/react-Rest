import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import { useDarkMode } from "./themeComponents/useDarkMode";
import { lightTheme, darkTheme } from "./themeComponents/theme";
import { GlobalStyles } from "./themeComponents/global";
import Nav from "./navigation/navigation";
import Content from "./content/content";

import Toggle from "./themeComponents/Toggle";

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }

  return (
    <Router>
      <Nav />
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles />

          <Toggle theme={theme} toggleTheme={toggleTheme} />
          <Content theme={theme} />
        </>
      </ThemeProvider>
    </Router>
  );
}

export default App;
