import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store";
import AppRouter from "./components/AppRouter";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#797D62",
      },
      secondary: {
        main: "#797D62",
        dark: "#FEFAE0",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
