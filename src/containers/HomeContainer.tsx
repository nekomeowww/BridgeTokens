import React from "react";
import { withStore } from "@spyna/react-store";
import theme from "../theme/theme";
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import CradleAnimation from "../components/CradleAnimation";
import { Translate } from "../components/Translate";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import {
  BRIDGE_SYMBOL_MAP,
  BRIDGE_NAME_MAP,
  BRIDGE_ICON_MAP,
} from "../bridges/bridges";

const styles = () => ({
  container: {
    background: "rgb(32,32,32)",
    borderRadius: "30px",
    width: 500,
    margin: "0px auto " + theme.spacing(1) + "px",
    padding: theme.spacing(2.5),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: 34,
    fontWeight: 700,
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
  },
  titleImage: {
    width: "65%",
    height: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "75%",
    },
  },
  gray: {
    color: theme.palette.info.contrastText,
  },
  subtitle: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(3),
    fontSize: 15,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
    align: "center !important",
  },
  actionButtonContainer: {
    // paddingTop: theme.spacing(2),
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
    borderRadius: "16px",
  },
  bridgeSelectionBox: {
    border: "0.5px solid " + theme.palette.divider,
    borderRadius: "10px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  bridgeSelectionLabel: {
    color: theme.palette.info.contrastText,
    fontSize: 15,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  amountField: {
    width: "100%",
  },
  endAdornment: {
    "& p": {},
  },
  item: {
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    minWidth: 55,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "& div": {
      display: "flex",
    },
    justifyContent: "flex-start",
  },
  select: {
    display: "flex",
    "& div": {
      display: "flex",
    },
    "& MuiInput-underline:before": {
      display: "none",
    },
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  button: {
    fontSize: 24,
    color: "#fff",
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  arrow: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& svg": {
      width: 22,
      height: "auto",
      marginLeft: theme.spacing(0.75),
    },
  },
  balance: {
    fontSize: 12,
    marginTop: -2,
    color: theme.palette.info.main,
  },
  standaloneOption: {
    border: "1px solid #DBE0E8",
    borderRadius: 4,
    boxShadow: "0px 1px 2px rgba(0, 27, 58, 0.05)",
  },
  option: {
    minHeight: 60,
    fontSize: 14,
    "& img": {
      height: "auto",
      width: 24,
      marginRight: theme.spacing(1),
    },
    "& .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
    },
  },
});

type Balances = {
  [key in string]: string | any;
};

interface Props extends Balances {
  items: Array<keyof typeof BRIDGE_SYMBOL_MAP>;
  classes: { [key in string]: string };
  active?: string;
  pair?: string;
  disabled?: boolean;
  // t: WithTranslation;
}

class HomeContainer extends React.Component<Props> {
  bridgeEl: React.RefObject<any>;
  pairsEl: React.RefObject<any>;
  state = {
    currency: "",
    bridgeOpen: false,
    pairsOpen: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      currency: "",
      bridgeOpen: false,
      pairsOpen: false,
    };
    this.bridgeEl = React.createRef();
    this.pairsEl = React.createRef();
  }

  setBridge(selectedBridge: string, selectedPair: string) {
    const { store } = this.props;
    store.set("confirmBridge", true);
    store.set("selectedBridge", selectedBridge);
    store.set("selectedPair", selectedPair);
  }

  handleBridgeOpen() {
    this.setState({
      bridgeOpen: true,
    });
  }

  handleBridgeClose(event: any) {
    const value = event.target.value;
    if (value) {
      this.props.onBridgeChange(value);
      this.setState({ currency: value });
    }
    this.setState({ bridgeOpen: false });
  }

  handlePairsOpen() {
    this.setState({
      pairsOpen: true,
    });
  }

  handlePairsClose(event: any) {
    const value = event.target.value;
    if (value) {
      this.props.onPairChange(value);
      this.setState({ currency: value });
    }
    this.setState({ pairsOpen: false });
  }

  render() {
    const { classes, items, active, pair } = this.props;

    const { bridgeOpen, pairsOpen } = this.state;
    const selected = active || items[0];
    const chainPair = pair || items[0];

    let pairOptions = [...items].filter((item) => item !== selected);

    return (
      <div className={classes.container}>
        <Grid container justify="center">
          <CradleAnimation />
          {/* <Grid container justify="center" className={classes.title}>
                        <img
                            src={ShadowtokensTitle}
                            alt="ShadowTokens"
                            className={classes.titleImage}
                        />
                    </Grid> */}
          <Typography
            align="center"
            className={classes.subtitle}
            variant="body1"
          >
            <Translate text="Home.Intro" />
          </Typography>
        </Grid>
        <div className={classes.actionsContainer}>
          <Grid>
            <React.Fragment>
              <Grid container className={classNames(classes.option)}>
                <Grid item xs={6}>
                  <Grid container justify="center">
                    {/* Bridge Chain */}
                    <Typography className={classes.bridgeSelectionLabel}>
                      <Translate text="Home.Bridges" />
                    </Typography>
                    <Button
                      fullWidth
                      className={(classes.button, classes.bridgeSelectionBox)}
                      // size="large"
                      ref={this.bridgeEl}
                      aria-controls="bridgeMenu"
                      aria-haspopup="true"
                      onClick={this.handleBridgeOpen.bind(this)}
                    >
                      <img
                        src={
                          BRIDGE_ICON_MAP[selected.toLowerCase()] ||
                          BRIDGE_ICON_MAP["eth"]
                        }
                        alt={selected}
                        className={classes.icon}
                      />
                      <span className={classes.assetSymbol}>
                        {BRIDGE_NAME_MAP[selected.toLowerCase()] ||
                          BRIDGE_NAME_MAP["eth"]}
                      </span>
                      <div className={classes.arrow}>
                        <ArrowDropDown />
                      </div>
                    </Button>
                    <Menu
                      id="bridgeMenu"
                      anchorEl={this.bridgeEl.current}
                      keepMounted
                      open={bridgeOpen}
                      onClose={this.handleBridgeClose.bind(this)}
                    >
                      {items.map((i, index) => {
                        return (
                          <MenuItem
                            className={classes.item}
                            onClick={() => {
                              this.handleBridgeClose.bind(this)({
                                target: {
                                  value: i,
                                },
                              });
                            }}
                            key={index}
                            value={i}
                          >
                            <div>
                              <img
                                src={BRIDGE_ICON_MAP[i.toLowerCase()]}
                                alt={i}
                                className={classes.icon}
                              />
                            </div>
                            <Grid
                              container
                              direction="column"
                              alignItems="flex-start"
                            >
                              <span>{i}</span>
                              <span className={classes.balance}>
                                {
                                  BRIDGE_NAME_MAP[
                                    i.toLowerCase() as keyof typeof BRIDGE_NAME_MAP
                                  ]
                                }
                              </span>
                            </Grid>
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container justify="center">
                    {/* Pair Chain */}
                    <Typography className={classes.bridgeSelectionLabel}>
                      <Translate text="Home.Pairs" />
                    </Typography>
                    <Button
                      fullWidth
                      className={(classes.button, classes.bridgeSelectionBox)}
                      // size="large"
                      ref={this.pairsEl}
                      aria-controls="pairsMenu"
                      aria-haspopup="true"
                      onClick={this.handlePairsOpen.bind(this)}
                    >
                      <img
                        src={BRIDGE_ICON_MAP[chainPair.toLowerCase()]}
                        alt={selected}
                        className={classes.icon}
                      />
                      <span className={classes.assetSymbol}>
                        {BRIDGE_NAME_MAP[chainPair.toLowerCase()]}
                      </span>
                      <div className={classes.arrow}>
                        <ArrowDropDown />
                      </div>
                    </Button>
                    <Menu
                      id="pairsMenu"
                      anchorEl={this.pairsEl.current}
                      keepMounted
                      open={pairsOpen}
                      onClose={this.handlePairsClose.bind(this)}
                    >
                      {pairOptions.map((i, index) => {
                        return (
                          <MenuItem
                            className={classes.item}
                            onClick={() => {
                              this.handlePairsClose.bind(this)({
                                target: {
                                  value: i,
                                },
                              });
                            }}
                            key={index}
                            value={i}
                          >
                            <div>
                              <img
                                src={BRIDGE_ICON_MAP[i.toLowerCase()]}
                                alt={i}
                                className={classes.icon}
                              />
                            </div>
                            <Grid
                              container
                              direction="column"
                              alignItems="flex-start"
                            >
                              <span>{i}</span>
                              <span className={classes.balance}>
                                {
                                  BRIDGE_NAME_MAP[
                                    i.toLowerCase() as keyof typeof BRIDGE_NAME_MAP
                                  ]
                                }
                              </span>
                            </Grid>
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justify="center"
                  className={classes.actionButtonContainer}
                >
                  <Grid item xs={12}>
                    <Button
                      variant={"contained"}
                      disableRipple
                      color="primary"
                      size="large"
                      fullWidth
                      className={classNames(classes.actionButton)}
                      onClick={() => {
                        this.setBridge.bind(this)(
                          selected.toLowerCase(),
                          chainPair.toLowerCase()
                        );
                      }}
                    >
                      <Translate text="Home.Next" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStore(withStyles(styles)(HomeContainer));
