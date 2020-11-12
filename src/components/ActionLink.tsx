import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import theme from "../theme/theme";

const styles = () => ({
  link: {
    fontSize: 16,
    textDecoration: "none",
    cursor: "pointer",
  },
  lunarLink: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: "#8DFEFF",
    },
  },
  solarLink: {
    color: "#bd660f",
    "&:hover": {
      color: "#ff0",
    },
  },
});

interface Props {
  className?: string;
  classes: { [key in string]: string };
  url: any;
}

const ActionLink: React.FC<Props> = function (props) {
  const { children, classes, url } = props;

  return (
    <a
      className={classNames(classes.link)}
      target="_blank"
      rel="noopener noreferrer"
      href={url}
    >
      {children}
    </a>
  );
};

export default withStyles(styles)(ActionLink);
