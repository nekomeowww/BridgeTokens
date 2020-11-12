import React from "react";
import { withStore } from "@spyna/react-store";
import NumberFormat from "react-number-format";
import classNames from "classnames";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import theme from "../theme/theme";

const styles: Styles<any, any> = () => ({
  container: {
    width: "100%",
    "& input": {
      fontFamily: "inherit",
      color: "#fff",
      // fontSize: 18
    },
  },
  input: {
    fontSize: 17.5,
    fontWeight: 500,
    width: "100%",
    outline: "none",
    textAlign: "left",
    background: "rgb(32,32,32)",
    color: theme.palette.info.contrastText,
    border: "none",
  },
});

class BigCurrencyInput extends React.PureComponent<any> {
  ref: React.RefObject<any>;
  input: any;

  constructor(props: any) {
    super(props);
    this.ref = React.createRef();
    this.input = null;
    this.state = props.store.getState();
  }

  componentDidMount() {
    const inputRef = this.props.inputRef;
    if (this.props.inputRef) {
      this.ref = inputRef;
    }

    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { classes, className, onChange, value, placeholder } = this.props;

    const val = value ? String(value) : "";
    const ref = this.ref;
    const change = onChange || (() => {});

    return (
      // <div className={classNames(classes.container, classes[size])}>
      <div className={classNames(classes.container)}>
        <React.Fragment>
          <Grid container>
            <Grid item>
              <NumberFormat
                value={val}
                ref={ref}
                thousandSeparator={true}
                allowLeadingZeros={true}
                allowNegative={false}
                // suffix={" {" + Numeral(usdValue).format("$0,0.00") + "}"}
                onValueChange={change}
                getInputRef={(input: any) => {
                  this.input = input;
                }}
                className={classNames(classes.input, className)}
                placeholder={placeholder}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(withStore(BigCurrencyInput));
