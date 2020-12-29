import React from "react";
import { getStore } from "../services/storeService";
import { Styles, withStyles } from "@material-ui/styles";
import theme from "../theme/theme";
import Switch from "@material-ui/core/Switch";
import { depositELA } from "../services/sidechain";

const styles: Styles<typeof theme, any> = (theme) => ({
  switchContainer: {
    height: 36,
    minWidth: 48,
    border: "1px solid #3CBEED",
    borderRadius: 8,
    backgroundColor: "#3CBEED",
    marginLeft: 6,
  },
});

const CustomSwitch = withStyles({
  switchBase: {
    color: '#fff',
  },
  checked: {
    color: '#6EEDDD'
  },
  track: {
    backgroundColor: theme.palette.primary.contrastText,
  },
})(Switch);

function SwitchMode(props: any) {
  const { classes } = props;
  const store = getStore();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      store.set("page", "bridge");
    } else {
      store.set("page", "sidechain");
      store.set("depositInProgress", 0);
      depositELA();
    }
  };

  return (
    <div className={classes.switchContainer}>
      <CustomSwitch
        checked={state.checkedB}
        onChange={handleChange}
        name="checkedB"
        color="primary"
      />
    </div>
  );
}

export default withStyles(styles)(SwitchMode);
