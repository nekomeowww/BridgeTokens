import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import theme from "../theme/theme";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useTranslation } from "react-i18next";
import ShadowTokens from "../assets/logo_about.svg";
import ShadowTokensTitle from "../assets/logo_about_title.svg";

const styles: Styles<typeof theme, any> = (theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  logo: {
    height: "auto",
    width: "85%",
  },
  title: {
    width: "80%",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1),
      width: "65%",
    },
  },
  label: {
    fontSize: "0.85rem",
    color: theme.palette.info.contrastText,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
    },
  },
  copyright: {
    fontSize: "0.85rem",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginTp: theme.spacing(0.5),
      fontSize: "0.65rem",
    },
  },
});

interface Props {
  className: string;
  classes: { [key in string]: string };
}

const About: React.FC<Props> = function (props) {
  const { t } = useTranslation();
  const { classes } = props;
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("xs");

  return (
    <React.Fragment>
      <Dialog open={true} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogContent>
          <Grid container alignItems="center" className={classes.container}>
            <Grid item xs={4} sm={4}>
              <Grid container alignItems="center">
                <img
                  src={ShadowTokens}
                  alt="ShadowTokens"
                  className={classes.logo}
                />
              </Grid>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Grid container alignItems="center">
                <img
                  src={ShadowTokensTitle}
                  alt="ShadowTokens"
                  className={classes.title}
                />
                <Typography className={classes.label}>
                  {t("About.Message")}
                </Typography>
                <Typography className={classes.copyright}>
                  {t("About.Copyright")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default withStyles(styles)(About);
