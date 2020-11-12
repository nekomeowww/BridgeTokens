import React from "react";
import theme from "../theme/theme";
import { Styles, withStyles } from "@material-ui/styles";
import classNames from "classnames";
import { Translate } from "./Translate";

const styles: Styles<any, any> = () => ({
  button: {
    // marginRight: theme.spacing(0.75),
    fontSize: 14,
    borderRadius: 8,
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    paddingLeft: theme.spacing(1.25),
    paddingRight: theme.spacing(1.25),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  primary: {
    color: theme.palette.primary.main,
    border: "1px solid rgba(13, 129, 207, 0.5)",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid rgb(13, 129, 207, 1)",
      backgroundColor: "rgba(13, 129, 207, 0.08)",
    },
  },
  secondary: {
    color: "rgb(200, 83, 103, 1)",
    border: "1px solid rgba(200, 83, 103, 0.5)",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid rgb(200, 83, 103, 1)",
      backgroundColor: "rgba(200, 83, 103, 0.08)",
    },
  },
});

interface Props {
  onSetMax: () => void;
  className?: string;
  classes: { [key in string]: string };
  direction: number;
  balance: string;
}

const Balance: React.FC<Props> = function (props) {
  const { classes, direction, balance } = props;

  return (
    <React.Fragment>
      <div
        className={classNames(
          direction ? classes.secondary : classes.primary,
          classes.button
        )}
        onClick={() => {
          props.onSetMax();
        }}
      >
        <Translate text="Transfer.Max" />
        &nbsp;{balance || "0.00"}
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Balance);
