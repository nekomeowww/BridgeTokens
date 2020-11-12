import React from "react";
import { createStore, withStore } from "@spyna/react-store";
import { storeListener } from "./services/storeService";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import theme from "./theme/theme";
import { INITIAL_STATE } from "./bridges/ETH_ELA/utils/config";
import { init } from "./bridges/ETH_ELA/utils/walletUtils";
import Grid from "@material-ui/core/Grid";
import NavContainer from "./containers/NavContainer";
import Bridge from "./pages/Bridge";
import Sidechain from "./pages/Sidechain";

require("dotenv").config();

const styles = () => ({
  appWrapper: {
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
  },
  headerWrapper: {
    width: "100%",
    justifyContent: "space-between",
  },
  bodyWrapper: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
  bridge: {
    padding: theme.spacing(1.5),
    paddingTop: "20vh",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "5vh",
    },
  },
  sidechain: {
    padding: theme.spacing(1.5),
    paddingTop: "12.5vh",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "5vh",
    },
  },
});

interface Props {
  store: any;
  classes: { [key in string]: string };
}

class AppWrapper extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    init();
  }

  render() {
    if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;
    // window.ethereum.on(isVersion8 ? 'chainChanged' : 'networkChanged', network => {
    //     choiceNetwork()
    // })
    const classes = this.props.classes;
    const store = this.props.store;
    storeListener(store);

    const page = store.get("page");

    return (
      <ThemeProvider theme={theme}>
        <Grid container justify="center">
          <Grid container className={classes.appWrapper}>
            <Grid container className={classes.headerWrapper} justify="center">
              <NavContainer />
            </Grid>
            <Grid container className={classes.bodyWrapper} justify="center">
              {page === "bridge" ? (
                <Grid className={classes.bridge}>
                  <Bridge />
                </Grid>
              ) : (
                <Grid className={classes.sidechain}>
                  <Sidechain />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

const AppWrapperComponent = withStore(AppWrapper);

class App extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return <AppWrapperComponent classes={classes} />;
  }
}

export default createStore(withStyles(styles)(App), INITIAL_STATE);
