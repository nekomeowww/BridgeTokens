import React from "react";
import theme from "../theme/theme";
import { Styles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Menu from "@material-ui/core/Menu";

const styles: Styles<any, any> = () => ({
  amountField: {
    width: "100%",
  },
  endAdornment: {
    "& p": {
      color: "#000",
    },
  },
  item: {
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    minWidth: 55,
    paddingLeft: theme.spacing(1),
    "& div": {
      display: "flex",
      // fontSize: 14
    },
    justifyContent: "flex-end",
  },
  select: {
    display: "flex",
    "& div": {
      display: "flex",
      // fontSize: 14
    },
    "& MuiInput-underline:before": {
      display: "none",
    },
  },
});

interface Props {
  onCurrencyChange: (newCurrency: string) => void;
  onAmountChange: (newAmount: number) => void;
  bridgeDirection: string;
  classes: { [key in string]: string };
  disabled?: boolean;
}

class CurrencyInput extends React.Component<Props> {
  anchorEl: React.RefObject<any>;
  state = {
    currency: "",
    open: false,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      currency: "",
      open: false,
    };
    this.anchorEl = React.createRef();
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
    const { classes, onAmountChange, bridgeDirection } = this.props;
    const { currency, open } = this.state;

    return (
      <TextField
        id=""
        className={classes.amountField}
        placeholder={bridgeDirection}
        margin="dense"
        onChange={(event) => {
          if (onAmountChange) {
            onAmountChange(Number(event.target.value));
          }
        }}
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Menu
                id="simple-menu"
                anchorEl={this.anchorEl.current}
                keepMounted
                open={open}
                onClose={this.handleClose.bind(this)}
              ></Menu>
            </InputAdornment>
          ),
        }}
        inputProps={{
          "aria-label": "bare",
          disabled: this.props.disabled,
        }}
      />
    );
  }
}

export default withStyles(styles)(CurrencyInput);
