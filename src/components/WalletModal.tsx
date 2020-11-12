import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { WALLET_ICON_MAP } from "../bridges/ETH_ELA/utils/config";
import { initLocalWeb3, clearWeb3 } from "../bridges/ETH_ELA/utils/walletUtils";
import CloseIcon from "@material-ui/icons/Close";
import { grey } from "@material-ui/core/colors";
import { Translate } from "./Translate";
import theme from "../theme/theme";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(36,36,36)",
    borderRadius: "30px",
    width: 450,
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "75%",
    },
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  headerText: {
    textAlign: "center",
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  navTitle: {
    color: "#fff",
    fontSize: "12",
  },
  close: {
    position: "absolute",
    top: 3,
    right: 6,
    height: "auto",
    width: 24,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.5,
    },
  },
  metamask: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    "& div": {
      background: "rgb(255,255,255,0.1)",
      borderRadius: "10px",
      border: "1px solid transparent",
      width: 120,
      height: 110,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      opacity: 0.75,
      transition: "all 0.2s ease-in-out",
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      boxShadow:
        "0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)",
      "&:hover": {
        // opacity: 0.8
        boxShadow:
          "0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)",
      },
      "&.selected": {
        opacity: 1,
        borderColor: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[0],
      },
    },
    "& img": {
      height: 60,
      width: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      "& div": {
        width: "90%",
        height: 50,
        marginTop: 0,
        marginBottom: theme.spacing(1),
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        borderRadius: 14,
      },
      "& img": {
        height: 30,
        width: "auto",
      },
    },
  },
  walletLabel: {
    paddingTop: theme.spacing(1),
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 11.5,
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
      paddingTop: 0,
      textTransform: "none",
      marginLeft: theme.spacing(3),
    },
  },
  selectedWallet: {
    opacity: "1 !important",
  },
  message: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  actionButtonContainer: {
    marginTop: theme.spacing(3),

    "& button": {
      "&.Mui-disabled": {},
      margin: "0px auto",
      fontSize: 12,
      minWidth: 175,
      padding: theme.spacing(1),
    },
  },
  actionButton: {
    width: "100%",
    borderRadius: "16px",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      borderRadius: "14px",
    },
  },
  error: {
    marginTop: theme.spacing(2),
    color: "#FF4545",
  },
  info: {
    marginTop: theme.spacing(2),
  },
  info2: {
    fontWeight: "bold",
    color: "#3F3F48",
  },
  mobileMessage: {
    display: "none",
  },
});

class WalletModal extends React.Component<any> {
  onClose() {
    const { store } = this.props;
    store.set("showWalletModal", false);
  }

  render() {
    const { classes, store } = this.props;

    // const walletConnecting = store.get("walletConnecting");
    const walletType = store.get("selectedWalletType");
    const walletConnected = String(store.get("localWeb3Address")).length > 0;
    const showWalletModal = store.get("showWalletModal");

    return (
      <Modal
        open={showWalletModal}
        onClose={this.onClose.bind(this)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <div className={classes.container}>
            <div className={classes.headerText}>
              <Typography variant="overline" className={classes.navTitle}>
                <Translate text="Wallet.Header" />
              </Typography>
              <CloseIcon
                style={{ color: grey[300] }}
                className={classes.close}
                onClick={() => {
                  store.set("showWalletModal", false);
                }}
              />
            </div>
            <Grid className={classes.metamask} container justify="center">
              <Grid
                container
                className={walletType === "MetaMask" ? "selected" : ""}
                onClick={() => store.set("selectedWalletType", "MetaMask")}
                justify="center"
                alignItems="center"
              >
                <img src={WALLET_ICON_MAP["MetaMask"]} alt="MetaMask" />
                <Typography className={classes.walletLabel}>
                  Metamask
                </Typography>
              </Grid>
              {/* <Grid
                container
                className={walletType === "Elaphant" ? "selected" : ""}
                onClick={() => store.set("selectedWalletType", "Elaphant")}
              >
                <img src={WALLET_ICON_MAP["Elaphant"]} alt="Elaphant" />
                <Typography className={classes.walletLabel}>
                  Elaphant
                </Typography>
              </Grid> */}
              <Grid
                container
                className={walletType === "WalletConnect" ? "selected" : ""}
                onClick={() => store.set("selectedWalletType", "WalletConnect")}
              >
                <img
                  src={WALLET_ICON_MAP["WalletConnect"]}
                  alt="WalletConnect"
                />
                <Typography className={classes.walletLabel}>
                  WalletConnect
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justify="flex-start"
              direction="column"
              alignItems="center"
              className={classes.actionButtonContainer}
            >
              {/* <Grid item xs={12}> */}
              <Button
                onClick={() => {
                  if (!walletConnected) {
                    initLocalWeb3(walletType);
                    store.set("showWalletModal", false);
                  } else {
                    clearWeb3();
                  }
                }}
                // disabled={walletConnecting || requesting}
                className={classes.actionButton}
                size="large"
                color="secondary"
                disableRipple
                variant="contained"
                fullWidth
              >
                {/* {requesting && (
                  <div className={classes.spinner}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      className={classes.spinnerTop}
                      size={18}
                      thickness={4}
                    />
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      className={classes.spinnerBottom}
                      size={18}
                      thickness={4}
                    />
                  </div>
                )} */}
                {!walletConnected ? (
                  <div>
                    <Translate text="Wallet.Connect" />
                    &nbsp;{walletType}
                  </div>
                ) : (
                  <div>
                    <Translate text="Wallet.Disconnect" />
                  </div>
                )}
              </Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    );
  }
}

export default withStyles(styles)(withStore(WalletModal));
