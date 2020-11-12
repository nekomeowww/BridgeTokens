import React from "react";
import { withStore } from "@spyna/react-store";
import { Styles, withStyles } from "@material-ui/styles";
import classNames from "classnames";
import Numeral from "numeral";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import BackArrow from "../assets/back-arrow.svg";
import WalletIcon from "../assets/wallet-icon-dark.svg";
import DarkTooltip from "../components/DarkTooltip";
import WaitingModal from "../components/WaitingModal";
import TxProgressModal from "../components/TxProgressModal";
import ErrorModal from "../components/ErrorModal";
import { Translate } from "../components/Translate";
import theme from "../theme/theme";
import { abbreviateAddress } from "../bridges/ETH_ELA/utils/walletUtils";
import { handleBridgeMode } from "../bridges/ETH_ELA/utils/transferUtils";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(32,32,32)",
    borderRadius: "30px",
    width: 500,
    margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  actionsContainer: {
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    color: "#fff",
  },
  actionButtonContainer: {
    marginTop: theme.spacing(2),
  },
  actionButton: {
    width: "90%",
    fontSize: 12,
    padding: theme.spacing(1),
    borderRadius: "16px",
  },
  actions: {
    paddingTop: theme.spacing(1),
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(0.75),
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  // titleIcon: {
  //   height: 38,
  //   width: "auto",
  //   marginLeft: theme.spacing(0.5),
  //   marginRight: theme.spacing(0.5),
  //   [theme.breakpoints.down("xs")]: {
  //     height: 38,
  //   },
  // },
  optionsContainer: {
    borderBottom: "none",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    "& :last-child": {
      borderBottom: "1px solid transparent",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  option: {
    borderBottom: "1px solid " + theme.palette.divider,
    minHeight: 42,
    fontSize: 14,
    "& img": {
      height: "auto",
      width: 24,
      marginRight: theme.spacing(1),
    },
    "& div": {
      display: "flex",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: 36,
    },
  },
  fade: {
    color: theme.palette.info.contrastText,
  },
  titleAmount: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
  headerText: {
    color: "#fff",
    textAlign: "center",
    position: "relative",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: 0,
    },
  },
  // navTitle: {
  //   color: "#fff",
  //   fontSize: "12",
  //   marginBottom: theme.spacing(2),
  // },
  // back: {
  //   position: "absolute",
  //   top: 8,
  //   left: 10,
  //   height: "auto",
  //   width: 20,
  //   cursor: "pointer",
  //   "&:hover": {
  //     opacity: 0.75,
  //   },
  // },
  amountCell: {
    wordBreak: "break-word",
  },
});

const CancelButton = withStyles({
  root: {
    backgroundColor: "#404040",
    "&:hover": {
      backgroundColor: "rgb(40,40,40)",
    },
  },
})(Button);

class ConfirmContainer extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = props.store.getState();
  }

  showDepositModal(tx: any) {
    const { store } = this.props;
    store.set("showDepositModal", true);
    store.set("depositModalTx", tx);
  }

  render() {
    const { classes, store } = this.props;

    // const confirmAction = store.get("confirmAction");
    // const isDeposit = confirmAction === "deposit";
    const confirmTx = store.get("confirmTx");
    const selectedWallet = store.get("selectedWalletType");
    const token = store.get("token");
    const selectedDirection = store.get("convert.selectedDirection");
    const amount = store.get("convert.amount");
    const serviceFee = (
      Number(store.get("convert.networkFee")) * Number(amount)
    ).toFixed(4);
    // const networkFee = store.get("convert.networkFee");
    const total = Number(store.get("convert.conversionTotal")).toFixed(4);
    const canConvertTo = amount > 0.00010001;

    // const confirmationError = store.get("confirmationError");
    const sourceAsset = confirmTx.sourceAsset;
    const sourceNetwork = confirmTx.sourceNetwork;
    const destAsset = confirmTx.destAsset;
    const destNetwork = confirmTx.destNetwork;

    const waitingApproval = store.get("waitingApproval");
    const type = store.get("transactionType");
    const txRejected = store.get("txRejected");
    const unknownError = store.get("unknownError");

    const sourceTxID = store.get("sourceTxID");
    const destTxID = store.get("destTxID");

    const confirmationNumber = store.get("confirmationNumber");
    const confirmationTotal = store.get("confirmationTotal");

    // Tx progress watcher
    const transferInProgress = store.get("transferInProgress");
    const confirming = store.get("confirming");
    const confirmationStep = store.get("confirmationStep");
    const validatorError = store.get("validatorError");
    const validatorTimeout = store.get("validatorTimeout");
    const transferSuccess = store.get("transferSuccess");

    let price = store.get(`${token[token.home].id}usd`);
    let usdValue =
      price > 0 ? `(${Numeral(price * amount).format("$0,0.00")})` : "";

    const chars = String(amount).replace(".", "");

    let size = "large";
    if (chars.length > 5 && chars.length <= 7) {
      size = "medium";
    } else if (chars.length > 7 && chars.length <= 9) {
      size = "small";
    } else if (chars.length > 9) {
      size = "smallest";
    }
    return (
      <div className={classes.container}>
        <div className={classes.headerText}>
          {/* <img
              className={classes.back}
              src={BackArrow}
              alt="Back"
              onClick={() => {
                store.set("confirmTx", null);
                store.set("confirmAction", "");
                store.set("convert.destination", "");
              }}
            />
            <Typography variant="overline" className={classes.navTitle}>
              <Translate text="Confirm.Header" />
            </Typography> */}

          <Typography variant="body1" className={classes.titleAmount}>
            {usdValue}
          </Typography>

          <Typography variant="h4" className={classNames(classes[size])}>
            <Grid container alignItems="center" justify="center">
              {Numeral(confirmTx.amount).format("0,0.00")}{" "}
              {/* <img
                  alt={sourceAsset}
                  src={token.icon}
                  className={classes.titleIcon}
                /> */}
              {token[selectedDirection].symbol}
            </Grid>
          </Typography>

          <Typography variant="body1">
            <Translate text="Confirm.From" />
            &nbsp;{sourceNetwork}&nbsp;
            <Translate text="Confirm.Network" />
          </Typography>
        </div>
        <div className={classes.actionsContainer}>
          <Grid className={classes.actions}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Grid className={classes.optionsContainer} container>
                  <Grid container className={classes.option}>
                    <Grid item xs={6} className={classes.fade}>
                      <Translate text="Confirm.Destination" />
                    </Grid>
                    <Grid item xs={6}>
                      {destNetwork}&nbsp;
                      <Translate text="Confirm.Network" />
                    </Grid>
                  </Grid>

                  <Grid container className={classes.option}>
                    <Grid item xs={6} className={classes.fade}>
                      <Translate text="Confirm.Asset" />
                    </Grid>
                    <Grid item xs={6}>
                      <img alt={destAsset} src={token.icon} />
                      {token[Number(!selectedDirection)].symbol}
                    </Grid>
                  </Grid>

                  <Grid container className={classes.option}>
                    <Grid item xs={6} className={classes.fade}>
                      <Translate text="Confirm.Target" />
                    </Grid>
                    <Grid item xs={6}>
                      <DarkTooltip
                        placement="top"
                        title={confirmTx.destAddress}
                      >
                        <div>
                          <img src={WalletIcon} alt="Wallet" />
                          {abbreviateAddress(confirmTx.destAddress)}
                        </div>
                      </DarkTooltip>
                    </Grid>
                  </Grid>

                  <Grid container className={classes.option}>
                    <Grid item xs={6} className={classes.fade}>
                      <Translate text="Confirm.Fee" />
                    </Grid>
                    <Grid item xs={6} className={classes.amountCell}>
                      <img alt={sourceAsset} src={token.icon} />
                      {serviceFee} {token[selectedDirection].symbol}
                    </Grid>
                  </Grid>

                  <Grid container className={classes.option}>
                    <Grid item xs={6} className={classes.fade}>
                      <Translate text="Confirm.Receive" />
                    </Grid>
                    <Grid item xs={6} className={classes.amountCell}>
                      <img alt={destAsset} src={token.icon} />
                      {total} {token[Number(!selectedDirection)].symbol}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              className={classes.actionButtonContainer}
            >
              <Grid item xs={6}>
                <CancelButton
                  className={classes.actionButton}
                  disabled={!canConvertTo}
                  variant={"contained"}
                  color="secondary"
                  size="large"
                  disableRipple
                  fullWidth
                  onClick={() => {
                    store.set("confirmTx", null);
                    store.set("confirmAction", "");
                    store.set("convert.destination", "");
                  }}
                >
                  <Translate text="Confirm.Cancel" />
                </CancelButton>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.actionButton}
                  disabled={!canConvertTo}
                  variant={"contained"}
                  color={selectedDirection === 0 ? "secondary" : "primary"}
                  size="large"
                  disableRipple
                  fullWidth
                  onClick={() => {
                    handleBridgeMode(confirmTx);
                  }}
                >
                  <Translate text="Confirm.Start" />
                </Button>
              </Grid>

              {waitingApproval && (
                <WaitingModal
                  wallet={selectedWallet}
                  onClick={() => {
                    store.set("waitingApproval", false);
                  }}
                  open={waitingApproval}
                  direction={selectedDirection}
                  tx={confirmTx}
                  type={type}
                />
              )}

              {txRejected && (
                <ErrorModal store={store} errorType={"txRejected"} />
              )}

              {unknownError && (
                <ErrorModal store={store} errorType={"unknownError"} />
              )}

              {transferInProgress && (
                <TxProgressModal
                  txInput={confirmTx}
                  wallet={selectedWallet}
                  onClick={() => {
                    store.set("waitingApproval", false);
                  }}
                  open={transferInProgress}
                  confirmation={confirmationNumber}
                  total={confirmationTotal}
                  confirming={confirming}
                  confirmationStep={confirmationStep}
                  transferSuccess={transferSuccess}
                  validatorError={validatorError}
                  validatorTimeout={validatorTimeout}
                  sourceTxID={sourceTxID}
                  destTxID={destTxID}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withStore(ConfirmContainer));
