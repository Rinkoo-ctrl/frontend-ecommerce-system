import React from "react";
import ThemeContextProvider from "./context/ThemeContext.js";
import MainApp from "./MainApp.js";

const App = () => {
  return (
    <ThemeContextProvider>
      <MainApp />
    </ThemeContextProvider>
  );
};

export default App;
