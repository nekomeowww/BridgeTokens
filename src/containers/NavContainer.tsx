import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import theme from "../theme/theme";
import classNames from "classnames";
import { restoreInitialState } from "../bridges/ETH_ELA/utils/txUtils";
import { BRIDGE_NAME_MAP, BRIDGE_ICON_MAP } from "../bridges/bridges";
import Hidden from "@material-ui/core/Hidden";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ShadowtokensTitle from "../assets/logo_title.svg";
import ShadowtokensLogo from "../assets/logo.svg";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LanguageSelect from "../components/LanguageSelect";
import { Translate } from "../components/Translate";
import Switch from "../components/Switch";
import Menu from "../components/Menu";

const styles: Styles<typeof theme, any> = (theme) => ({
  navContainer: {
    padding: theme.spacing(1.5),
    minHeight: 52,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  logo: {
    height: 42,
    width: "auto",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      height: 54,
    },
  },
  branding: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(0.5),
    fontSize: 26,
  },
  aboutButton: {
    marginRight: theme.spacing(1),
    "& svg": {
      height: "0.7em",
      marginRight: theme.spacing(0.25),
    },
  },
  accountButton: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
    "& svg": {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      // width: "75%",
      // marginTop: theme.spacing(1.5),
    },
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
  faq: {
    marginRight: theme.spacing(2),
  },
  hideMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  icon: {
    height: 22,
    width: "auto",
    marginRight: theme.spacing(0.75),
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: "#3dc29c",
    borderRadius: 5,
    float: "left",
    marginTop: 6.85,
    marginRight: 4,
    marginLeft: 2,
  },
  walletLabel: {
    marginRight: theme.spacing(1),
  },
  activeNetwork: {
    textTransform: "uppercase",
    marginRight: theme.spacing(2),
  },
  navButtons: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      // justifyContent: "center",
    },
  },
  walletActive: {
    borderColor: "rgb(66, 66, 66)",
    backgroundColor: "rgb(32,32,32)",
    "&:hover": {
      // backgroundColor: "rgb(54,54,54)",
      borderColor: theme.palette.primary.main,
    },
  },
  bridgeActive: {
    borderColor: "rgb(66, 66, 66)",
    backgroundColor: "rgb(32,32,32)",
    "&:hover": {
      // backgroundColor: "rgb(54,54,54)",
      borderColor: theme.palette.secondary.main,
    },
  },
  walletButtonText: {
    fontSize: 14,
    color: "#fff",
    marginRight: 4,
    marginLeft: 4,
  },
  bridgeButtonText: {
    fontSize: 14,
    color: "#fff",
    marginRight: 4,
    marginLeft: 4,
  },
});

const WalletButton = withStyles({
  root: {
    marginLeft: 8,
    textTransform: "none",
    border: "1px solid " + theme.palette.primary.main,
    borderRadius: 8,
    backgroundColor: "rgb(13, 129, 207, 0.2)",
    padding: 6,
    "&:hover": {
      backgroundColor: "rgb(13, 129, 207, 0.45)",
    },
  },
})(Button);

const BridgeButton = withStyles({
  root: {
    marginLeft: 8,
    textTransform: "none",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: 8,
    backgroundColor: "rgb(200, 83, 103, 0.2)",
    padding: 6,
    "&:hover": {
      backgroundColor: "rgb(200, 83, 103, 0.45)",
    },
  },
})(Button);

class NavContainer extends React.Component<any> {
  anchorRef = React.createRef();

  async componentDidMount() {}

  toggleNeworkMenu() {
    const { store } = this.props;
    const showNetworkMenu = store.get("showNetworkMenu");
    store.set("showNetworkMenu", !showNetworkMenu);
  }

  render() {
    const { classes, store } = this.props;

    const walletAddress = store.get("localWeb3Address");
    const selectedBridge = store.get("selectedBridge");
    const selectedPair = store.get("selectedPair");

    return (
      <Grid item xs={12} className={classes.navContainer}>
        {
          <Grid container alignItems="center">
            <Grid item xs={2} sm={5}>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                className={classes.logoMobile}
              >
                <img
                  alt="ShadowTokens"
                  className={classes.logo}
                  src={ShadowtokensLogo}
                />
                <Hidden xsDown>
                  <img
                    alt="ShadowTokens"
                    className={classes.logo}
                    src={ShadowtokensTitle}
                  />
                </Hidden>
              </Grid>
            </Grid>
            <Grid item xs={10} sm={7}>
              <Grid
                container
                className={classes.navButtons}
                alignItems="center"
                justify="flex-end"
              >
                <WalletButton
                  disableRipple
                  onClick={() => {
                    // if (!walletAddress) {
                    store.set("showWalletModal", true);
                    //   initLocalWeb3(walletType);
                    // }
                  }}
                  variant="contained"
                  size="small"
                  className={classNames(
                    classes.accountButton,
                    walletAddress && classes.walletActive
                  )}
                >
                  {walletAddress ? (
                    <div>
                      <div className={classes.circle}></div>
                      <span className={classes.walletButtonText}>
                        {walletAddress.slice(0, 7) +
                          "..." +
                          walletAddress.slice(walletAddress.length - 5)}
                      </span>
                    </div>
                  ) : (
                    <span className={classes.walletButtonText}>
                      <Translate text="Nav.Connect" />
                    </span>
                  )}
                </WalletButton>

                <Hidden smDown>
                  <BridgeButton
                    disableRipple
                    onClick={() => {
                      restoreInitialState();
                      store.set("confirmBridge", false);
                    }}
                    variant="contained"
                    size="small"
                    className={classNames(
                      classes.accountButton,
                      selectedBridge && classes.bridgeActive
                    )}
                  >
                    {selectedBridge ? (
                      <Grid
                        container
                        alignItems="center"
                        justify="center"
                        className={classes.bridgeButtonText}
                      >
                        <img
                          src={BRIDGE_ICON_MAP[selectedBridge]}
                          alt={BRIDGE_NAME_MAP[selectedBridge]}
                          className={classes.icon}
                        />
                        {BRIDGE_NAME_MAP[selectedBridge]}
                        <SwapHorizIcon />
                        <img
                          src={BRIDGE_ICON_MAP[selectedPair]}
                          alt={BRIDGE_NAME_MAP[selectedPair]}
                          className={classes.icon}
                        />
                        {BRIDGE_NAME_MAP[selectedPair]}
                      </Grid>
                    ) : (
                      <span className={classes.bridgeButtonText}>
                        <Translate text="Nav.Bridge" />
                      </span>
                    )}
                  </BridgeButton>
                </Hidden>
                <Switch />
                <Hidden smDown>
                  <LanguageSelect
                    className={classes.hideMobile}
                    store={store}
                    isVisible={true}
                  />
                </Hidden>
                <Menu />
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(withStore(NavContainer));
