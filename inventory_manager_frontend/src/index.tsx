import React, { useEffect, useMemo } from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { UIComponentProvider, useModal } from "@sapo-presentation/sapo-ui-components";
import storeProvider from "store/store";
import { createTheme } from "theme";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/styles";

const Root = () => {
  const theme = useMemo(
    () => createTheme(storeProvider.store.getState().theme.currentTheme),
    [storeProvider.store.getState().theme.currentTheme]
  );

  return (
    <Provider store={storeProvider.store}>
      <PersistGate loading={null} persistor={storeProvider.persistor}>
        <Router>
          <ThemeProvider theme={theme}>
            <UIComponentProvider theme={storeProvider.store.getState().application.sapoTheme}>
              <UIComponentModalConfig />
              <App />
            </UIComponentProvider>
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};
const UIComponentModalConfig = React.memo(() => {
  const history = useHistory();
  const { closeAllModal } = useModal();
  useEffect(() => {
    history.listen((location, action) => {
      if (action === "PUSH") {
        closeAllModal();
      }
    });
  }, [history]);
  return <></>;
});
render(<Root />, document.getElementById("root"));
