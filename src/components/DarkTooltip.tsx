import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/styles";

const DarkTooltip = withStyles((theme) => ({
  arrow: {
    color: "rgb(28, 28, 28)",
  },
  tooltip: {
    fontSize: 14,
    backgroundColor: "rgb(28, 28, 28)",
    border: "0.5px solid #fff",
  },
}))(Tooltip);

export default DarkTooltip;
