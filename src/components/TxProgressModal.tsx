import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import theme from "../theme/theme";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import LinearDeterminate from "./LinearDeterminate";
import ActionLink from "../components/ActionLink";
import {
  getExplorerLink,
  restoreInitialState,
} from "../bridges/ETH_ELA/utils/txUtils";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Success from "../assets/success.svg";
import Alert from "../assets/alert.svg";
import Warning from "../assets/warning.svg";
import Sent from "../assets/sent.svg";
import { Translate } from "./Translate";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    textAlign: "center",
    background: "rgb(36,36,36)",
    borderRadius: "30px",
    width: 350,
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "75%",
    },
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  successContainer: {
    paddingTop: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "& img": {
      height: 60,
      width: "auto",
      marginBottom: theme.spacing(0.5),
    },
  },
  successText: {
    color: "#fff",
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  warningText: {
    color: "#fff",
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  walletText: {
    color: "#fff",
    fontSize: 18,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  generalContainer: {
    paddingTop: theme.spacing(3),
    alignItems: "center",
    justifyContent: "center",
  },
  confirmationText: {
    color: "#fff",
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  waitingText: {
    color: theme.palette.info.contrastText,
    fontSize: 14,
    paddingTop: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  dismissContainer: {
    paddingTop: theme.spacing(2),
  },
  actionButton: {
    borderRadius: "16px",
  },
  modalIcon: {
    height: "55px !important",
    width: "auto",
  },
});

const ExplorerButton = withStyles({
  root: {
    textTransform: "none",
    color: theme.palette.info.contrastText,
  },
})(Button);

const SuccessButton = withStyles({
  root: {
    color: theme.palette.success.light,
    borderColor: theme.palette.success.light,
    "&:hover": {
      backgroundColor: "rgb(32,32,32)",
    },
  },
})(Button);

const WarningButton = withStyles({
  root: {
    color: "#fbb300ff",
    borderColor: "#fbb300ff",
    "&:hover": {
      backgroundColor: "rgb(33,32,32)",
    },
  },
})(Button);

interface Props {
  className?: string;
  classes: { [key in string]: string };
  onClick: any;
  open: any;
  confirmation: any;
  total: any;
  txInput: any;
  confirming: boolean;
  confirmationStep: number;
  transferSuccess: boolean;
  validatorTimeout: boolean;
  validatorError: boolean;
  sourceTxID?: any;
  destTxID?: any;
}

const TxProgressModal: React.FC<Props> = function (props) {
  const {
    classes,
    open,
    confirmation,
    total,
    txInput,
    confirming,
    confirmationStep,
    transferSuccess,
    validatorTimeout,
    validatorError,
    sourceTxID,
    destTxID,
  } = props;

  return (
    <div>
      <React.Fragment>
        <Modal
          className={classes.modal}
          open={open}
          // onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              {transferSuccess && (
                <div className={classes.container}>
                  <div className={classes.successContainer}>
                    <img src={Success} alt="Transfer Complete" />
                    <Typography className={classes.successText}>
                      <Translate text="Progress.Success" />
                    </Typography>
                  </div>
                  <div className={classes.generalContainer}>
                    <Typography className={classes.confirmationText}>
                      {txInput.destSymbol}&nbsp;
                      <Translate text="Progress.Received" />
                      &nbsp;{txInput.destNetwork}&nbsp;
                      <Translate text="Progress.Chain" />
                    </Typography>
                    <ActionLink
                      url={getExplorerLink(
                        "dest",
                        "transaction",
                        txInput,
                        destTxID
                      )}
                    >
                      <ExplorerButton startIcon={<OpenInNewIcon />}>
                        <Translate text="Progress.Explorer" />
                      </ExplorerButton>
                    </ActionLink>
                  </div>
                  <Grid
                    container
                    justify="flex-end"
                    className={classes.dismissContainer}
                  >
                    <SuccessButton
                      variant={"outlined"}
                      disableRipple
                      fullWidth
                      className={classNames(classes.actionButton)}
                      onClick={() => {
                        restoreInitialState();
                      }}
                    >
                      <Translate text="Progress.Accept" />
                    </SuccessButton>
                  </Grid>
                </div>
              )}

              {confirming && (
                <div className={classes.container}>
                  <div className={classes.successContainer}>
                    <img src={Sent} alt="Sent" />
                    <Typography className={classes.successText}>
                      <Translate text="Progress.Sent" />
                    </Typography>
                    <ActionLink
                      url={getExplorerLink(
                        "source",
                        "transaction",
                        txInput,
                        sourceTxID
                      )}
                    >
                      <ExplorerButton startIcon={<OpenInNewIcon />}>
                        <Translate text="Progress.Explorer" />
                      </ExplorerButton>
                    </ActionLink>
                  </div>

                  {confirmationStep === 1 && (
                    <div className={classes.generalContainer}>
                      {confirmation < 1 ? (
                        <div>
                          <LinearProgress color="primary" />
                          <Typography className={classes.waitingText}>
                            <Translate text="Progress.Verified" />
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <Typography className={classes.confirmationText}>
                            {confirmation} of {total}
                          </Typography>
                          <LinearDeterminate
                            confirmationNumber={confirmation}
                            confirmationTotal={total}
                          />
                          <Typography className={classes.waitingText}>
                            <Translate text="Progress.Blocks" />
                          </Typography>
                        </div>
                      )}
                    </div>
                  )}

                  {confirmationStep === 2 && (
                    <div className={classes.generalContainer}>
                      <LinearProgress color="primary" />
                      <Typography className={classes.waitingText}>
                        <Translate text="Progress.Oracles" />
                      </Typography>
                    </div>
                  )}
                </div>
              )}

              {validatorTimeout && (
                <div className={classes.container}>
                  <div className={classes.successContainer}>
                    <img
                      src={Warning}
                      alt="Oracles Busy"
                      className={classes.modalIcon}
                    />
                    <Typography className={classes.successText}>
                      <Translate text="Progress.Busy.Title" />
                    </Typography>
                  </div>
                  <div className={classes.generalContainer}>
                    <Typography className={classes.warningText}>
                      <Translate text="Progress.Busy.Message" />
                    </Typography>
                    <ActionLink
                      url={getExplorerLink(
                        "dest",
                        "address",
                        txInput,
                        txInput.destAddress
                      )}
                    >
                      <ExplorerButton startIcon={<OpenInNewIcon />}>
                        <Translate text="Progress.Explorer" />
                      </ExplorerButton>
                    </ActionLink>
                  </div>
                  <Grid
                    container
                    justify="flex-end"
                    className={classes.dismissContainer}
                  >
                    <WarningButton
                      variant={"outlined"}
                      disableRipple
                      fullWidth
                      className={classNames(classes.actionButton)}
                      onClick={() => {
                        restoreInitialState();
                      }}
                    >
                      <Translate text="Progress.Accept" />
                    </WarningButton>
                  </Grid>
                </div>
              )}

              {validatorError && (
                <div className={classes.container}>
                  <div className={classes.successContainer}>
                    <img
                      src={Alert}
                      alt="Network Error"
                      className={classes.modalIcon}
                    />
                    <Typography className={classes.successText}>
                      <Translate text="Progress.Error.Title" />
                    </Typography>
                  </div>
                  <div className={classes.generalContainer}>
                    <Typography className={classes.warningText}>
                      <Translate text="Progress.Error.Message" />
                    </Typography>
                    <ActionLink
                      url={getExplorerLink(
                        "dest",
                        "address",
                        txInput,
                        txInput.destAddress
                      )}
                    >
                      <ExplorerButton startIcon={<OpenInNewIcon />}>
                        <Translate text="Progress.Explorer" />
                      </ExplorerButton>
                    </ActionLink>
                  </div>
                  <Grid
                    container
                    justify="flex-end"
                    className={classes.dismissContainer}
                  >
                    <Button
                      variant={"outlined"}
                      color="secondary"
                      disableRipple
                      fullWidth
                      className={classNames(classes.actionButton)}
                      onClick={() => {
                        restoreInitialState();
                      }}
                    >
                      <Translate text="Progress.Accept" />
                    </Button>
                  </Grid>
                </div>
              )}
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default withStyles(styles)(TxProgressModal);
