import React from "react";
import theme from "../theme/theme";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import TokenSelectorModal from "./TokenSelectorModal";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

const NoCapsButton = withStyles({
  root: {
    textTransform: "none",
  },
})(Button);

const styles = () => ({
  amountField: {
    width: "100%",
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
    fontSize: 17.5,
    color: "#fff",
    // display: "flex",
    // justifyContent: "flex-start",
  },
  balance: {
    fontSize: 12,
    marginTop: -2,
    color: "#797986",
  },
});

type Balances = {
  [key in string]: string | any;
};

interface Props extends Balances {
  onCurrencyChange: (newCurrency: string) => void;
  items: any;
  className: string;
  classes: { [key in string]: string };
  active?: string;
  network: string;
  disabled?: boolean;
}

class CurrencySelect extends React.Component<Props> {
  anchorEl: React.RefObject<any>;
  state = {
    currency: "",
    open: false,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      currency: "",
      open: false,
    };
    this.anchorEl = React.createRef();
  }

  appendCustomTokens(items: any, network: string) {
    let localTokenList = JSON.parse(
      window.localStorage.getItem("customTokens") as any
    );
    if (!localTokenList) return items;
    const customTokenList = localTokenList.filter(
      (token: any) => token.network === network
    );
    return items.concat(customTokenList);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose(event: any) {
    const value = event.target.value;
    if (value) {
      this.props.onCurrencyChange(value);
      this.setState({ currency: value });
    }
    this.setState({ open: false });
  }

  render() {
    const { classes, active, network } = this.props;
    let { items } = this.props;
    const { open } = this.state;
    const selected = active || items[0];

    return (
      <React.Fragment>
        {/* <NoCapsButton
          // fullWidth
          className={classes.button}
          ref={this.anchorEl}
          aria-controls="menu"
          aria-haspopup="true"
          onClick={() => {
            this.appendCustomTokens(items, network);
            this.handleOpen();
          }}
        >
          <Grid>
            <img
              src={TOKENS[selected.toLowerCase()].icon}
              alt={selected}
              className={classes.icon}
            />
            <span className={classes.assetSymbol}>{selected}</span>
            <ArrowDropDown />
          </Grid>
        </NoCapsButton>
        <TokenSelectorModal open={open} items={items}></TokenSelectorModal>
        <Menu
          id="menu"
          anchorEl={this.anchorEl.current}
          keepMounted
          className={classes.menu}
          open={open}
          onClose={this.handleClose.bind(this)}
        >
          {items.map((i: any, index: any) => {
            // const balance = this.props[`${i.sourceID}Balance`];

            return (
              <MenuItem
                className={classes.item}
                onClick={() => {
                  this.handleClose.bind(this)({
                    target: {
                      value: i.sourceID,
                    },
                  });
                }}
                key={index}
                value={i.symbol}
              >
                <div>
                  <img src={i.icon} alt={i.name} className={classes.icon} />
                </div>
                <Grid container direction="column" alignItems="flex-start">
                  <span>{i.symbol}</span>
                  <span className={classes.balance}>
                    {i.name}
                    {balance ? `${balance} ${i.name}` : i.name}
                  </span>
                </Grid>
              </MenuItem>
            );
          })}
        </Menu> */}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CurrencySelect);
