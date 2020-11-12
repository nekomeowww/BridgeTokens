import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import theme from "../theme/theme";
import DoubleArrow from "../assets/double-arrow.svg";
import LinearProgress from "@material-ui/core/LinearProgress";
import { WALLET_ICON_MAP } from "../bridges/ETH_ELA/utils/config";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
  actionButton: {
    borderRadius: "16px",
  },
  close: {
    position: "absolute",
    top: 8,
    left: 10,
    height: "auto",
    width: 20,
    cursor: "pointer",
    zIndex: 100000,
    "&:hover": {
      opacity: 0.75,
    },
  },
  header: {
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  approveIconContainer: {
    paddingTop: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",

    "& img": {
      height: 60,
      width: "auto",
      marginBottom: theme.spacing(1),
    },
  },
  walletIconContainer: {
    paddingTop: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      height: 50,
      width: "auto",
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
  assetText: {
    color: theme.palette.info.contrastText,
    fontSize: 18,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  tokenMapContainer: {
    paddingTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  assetIcon: {
    height: 42,
    width: "auto",
  },
  fromToIcon: {
    height: 34,
    width: "auto",
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
  spinnerContainer: {
    paddingTop: theme.spacing(4),
    alignItems: "center",
    justifyContent: "center",
  },
  waitingText: {
    color: theme.palette.info.contrastText,
    fontSize: 16,
    paddingTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  spacer: {
    marginTop: theme.spacing(1),
  },
});

interface Props {
  className?: string;
  classes: { [key in string]: string };
  onClick: any;
  wallet: any;
  tx: any;
  open: any;
  type: any;
}

const WaitingModal: React.FC<Props> = function (props) {
  // class WaitingModal extends React.PureComponent<any> {

  // constructor(props: any) {
  //   super(props);
  //   this.state = props.store.getState();
  // }

  // const [open, setOpen] = React.useState(false);

  const { classes, wallet, open, tx, type } = props;

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <React.Fragment>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
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
              {type === "approve" && (
                <div className={classes.container}>
                  <div className={classes.spacer} />
                  <div className={classes.approveIconContainer}>
                    <img src={tx.icon} alt={tx.sourceAsset} />
                    <Typography className={classes.walletText}>
                      <Translate text="Waiting.ApproveSpend" />
                      &nbsp;{tx.sourceSymbol}
                    </Typography>
                  </div>
                  <div className={classes.spacer} />
                  <div className={classes.spinnerContainer}>
                    <LinearProgress color="secondary" />
                    <Typography className={classes.waitingText}>
                      <Translate text="Waiting.User" />
                    </Typography>
                  </div>
                </div>
              )}
              {type === "approveConfs" && (
                <div className={classes.container}>
                  <div className={classes.spacer} />
                  <div className={classes.approveIconContainer}>
                    <img src={tx.icon} alt={tx.sourceSymbol} />
                    <Typography className={classes.walletText}>
                      <Translate text="Waiting.SpendApproved1" />
                      &nbsp;{tx.sourceSymbol}&nbsp;
                      <Translate text="Waiting.SpendApproved2" />
                    </Typography>
                  </div>
                  <div className={classes.spacer} />
                  <div className={classes.spinnerContainer}>
                    <LinearProgress color="primary" />
                    <Typography className={classes.waitingText}>
                      <Translate text="Waiting.Confirmations" />
                    </Typography>
                  </div>
                </div>
              )}
              {type === "relay" && (
                <div className={classes.container}>
                  <div className={classes.walletIconContainer}>
                    <img src={WALLET_ICON_MAP[wallet]} alt={wallet} />
                    <Typography className={classes.walletText}>
                      <Translate text="Waiting.Confirm" />
                      {/* &nbsp;{wallet} */}
                    </Typography>
                  </div>
                  <div className={classes.tokenMapContainer}>
                    <div className={classes.assetText}>
                      <Typography>{Number(tx.amount).toFixed(2)}</Typography>
                      <Typography>{tx.sourceSymbol}</Typography>
                    </div>
                    <img
                      className={classes.assetIcon}
                      src={tx.icon}
                      alt={tx.sourceSymbol}
                    />
                    <img
                      className={classes.fromToIcon}
                      src={DoubleArrow}
                      alt="To"
                    />
                    <img
                      className={classes.assetIcon}
                      src={tx.icon}
                      alt={tx.destSymbol}
                    />
                    <div className={classes.assetText}>
                      <Typography>{Number(tx.total).toFixed(2)}</Typography>
                      <Typography>{tx.destSymbol}</Typography>
                    </div>
                  </div>

                  <div className={classes.spinnerContainer}>
                    <LinearProgress color="secondary" />
                    <Typography className={classes.waitingText}>
                      <Translate text="Waiting.User" />
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default withStyles(styles)(WaitingModal);
