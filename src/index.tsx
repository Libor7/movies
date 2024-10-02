/** CUSTOM COMPONENTS */
import App from "./App";

/** LIBRARIES */
import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/** OTHER */
import reportWebVitals from "./reportWebVitals";
import { MovieContextProvider } from "./store/MovieContext";

/** STYLES */
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#fff",
      dark: "#002984",
      main: "#3f51b5",
      light: "#757de8",
    },
    secondary: {
      contrastText: "#000",
      dark: "#ba000d",
      main: "#f44336",
      light: "#ff7961",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
