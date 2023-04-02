import React, { useEffect, useMemo } from "react";
import { SnackbarUtilsConfigurator } from "utilities/SnackbarUtilsConfigurator";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import { AppState } from "store/store";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { WithStyles } from "@material-ui/core";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthGuardRoute from "shared/auth/auth-guard-route";
import { LAYOUT_ROUTES as routes } from "app.routing";
import { createTheme } from "theme";
import { ModalProvider } from "components/Modal/ModalProvider";
const styles = {
  base: {
    "& span": {
      fontSize: 14,
    },
  },
  processBarBaseLine: {
    backgroundColor: "unset",
  },
  processBarRoot: {
    height: 3,
  },
};
const App = (props: PropsFromRedux & WithStyles<typeof styles>) => {
  const dispatch = useDispatch();
  const { authState, classes } = props;
  const theme = useMemo(() => createTheme(props.theme.currentTheme), [props.theme.currentTheme]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={1}
          hideIconVariant={true}
          classes={{
            variantSuccess: "snackSuccess",
            variantError: "snackError",
            variantWarning: "snackWarning",
            variantInfo: "snackInfo",
            root: classes.base,
          }}
        >
          <SnackbarUtilsConfigurator />
          <Router>
            <ModalProvider>
              <React.Fragment>
                <Switch>
                  {routes.map(({ path, header, component, redirect, extract, authorities }, key) => (
                    <AuthGuardRoute
                      key={key}
                      path={path}
                      header={header}
                      component={component}
                      redirect={redirect}
                      hasAnyAuthorities={authorities}
                      exact={extract}
                    />
                  ))}
                </Switch>
              </React.Fragment>
            </ModalProvider>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};
const mapStateToProps = (state: AppState) => ({
  theme: state.theme,
  authState: state.auth,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withStyles(styles)(App));
