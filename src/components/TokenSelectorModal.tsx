import React from "react";
import { Styles, withStyles } from "@material-ui/styles";
import { getStore } from "../services/storeService";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import theme from "../theme/theme";
import Button from "@material-ui/core/Button";
import DarkTooltip from "./DarkTooltip";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Hidden from "@material-ui/core/Hidden";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useTranslation } from "react-i18next";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";

// Handle unsual decimals
// import { formatValue } from '../lib/helpers';

import {
  isSelectedNetwork,
  generateCustomTokenDetails,
  addCustomToken,
} from "../bridges/ETH_ELA/utils/walletUtils";

const NoCapsButton = withStyles({
  root: {
    textTransform: "none",
  },
})(Button);

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 8,
        border: "0.5px solid rgb(66,66,66)",
      },
      fontWeight: 500,
      fontSize: 16,
      "& input": {
        paddingTop: theme.spacing(1.75),
        paddingBottom: theme.spacing(1.75),
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
  },
})(TextField);

const CustomLinearProgress = withStyles({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 10,
    borderRadius: 4,
  },
})(LinearProgress);

const styles: Styles<typeof theme, any> = (theme) => ({
  logo: {
    width: 30,
    height: "auto",
    marginRight: theme.spacing(1.5),
  },
  searchContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(1.5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  ticker: {
    fontWeight: 600,
    marginRight: theme.spacing(1.5),
  },
  name: {
    color: theme.palette.info.contrastText,
    fontSize: "0.85rem",
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginRight: theme.spacing(1),
  },
  tokenRow: {
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
  },
  tokenButton: {
    border: "0.5px solid rgb(66,66,66)",
    borderRadius: 8,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  customRow: {
    padding: theme.spacing(1),
  },
  balance: {
    marginRight: theme.spacing(0.5),
  },
  label: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "0.85rem",
    color: theme.palette.info.contrastText,
  },
  empty: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

interface CustomToken {
  symbol: string;
  name: string;
  icon?: any;
  sourceID: string;
  destID: string;
  transferType: string;
  network: string;
  networkID: number;
  address: string;
  bridgeMode: string;
  decimals: number;
  minTx: number;
  confirmations: number;
  fee: number;
}

interface Props {
  onAssetChange: (newCurrency: string) => void;
  tokenList: any;
  className: string;
  classes: { [key in string]: string };
  selected: string;
  network: string;
  disabled?: boolean;
}

const TokenSelectorModal: React.FC<Props> = function (props) {
  const store = getStore();
  const direction = store.get("convert.selectedDirection");
  const { t } = useTranslation();
  const { classes, selected, network, tokenList } = props;
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

  const [open, setOpen] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [filteredTokenList, setFilteredTokenList] = React.useState([]);
  const [foundCustom, setFoundCustom] = React.useState(false);
  const active = selected || tokenList[0];

  const handleOpen = () => {
    setFilteredTokenList(tokenList);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e: any) => {
    const lowercaseSearch = e.target.value.toLowerCase().trim();
    const newFilteredTokenList = tokenList.filter((token: any) => {
      return (
        token[direction].name.toLowerCase().includes(lowercaseSearch) ||
        token[direction].symbol.toLowerCase().includes(lowercaseSearch) ||
        token[direction].address.toLowerCase().includes(lowercaseSearch)
      );
    });
    if (newFilteredTokenList.length === 0) {
      if (
        lowercaseSearch.length === 42 &&
        lowercaseSearch.substring(0, 2) === "0x"
      ) {
        setSearching(true);
        generateCustomTokenDetails(lowercaseSearch, network).then(
          (response: any) => {
            // console.log(response);
            if (response) {
              setFilteredTokenList(newFilteredTokenList.concat(response));
              setFoundCustom(true);
              setSearching(false);
            } else {
              setSearching(false);
            }
          }
        );
      }
    }
    setFoundCustom(false);
    setFilteredTokenList(newFilteredTokenList);
  };

  // useEffect(() => {
  //   setFilteredTokenList(tokenList);
  // }, [tokenList, setFilteredTokenList]);

  const connected = store.get("localWeb3Address").length > 0;

  const help = t("TokenSelect.Help");
  const paste = t("TokenSelect.Paste");

  return (
    <React.Fragment>
      <NoCapsButton
        className={classes.button}
        aria-controls="menu"
        aria-haspopup="true"
        onClick={() => {
          if (!connected) {
            store.set("pleaseConnect", true);
            return;
          }
          const correctNetwork = isSelectedNetwork();
          if (correctNetwork) {
            handleOpen();
          }
        }}
      >
        <Grid>
          <img
            src={active.icon}
            alt={active[direction].name}
            className={classes.icon}
          />
          <span className={classes.assetSymbol}>
            {active[direction].symbol}
          </span>
          <ArrowDropDown />
        </Grid>
      </NoCapsButton>
      <Dialog
        className={classes.container}
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      >
        <Grid container alignItems="center" justify="space-between">
          <DialogTitle id="customized-dialog-title">
            <Grid container alignItems="center">
              <Typography className={classes.title}>
                {t("TokenSelect.Title")}
              </Typography>
              <DarkTooltip placement="right" title={help}>
                <HelpOutlineIcon fontSize="small" />
              </DarkTooltip>
            </Grid>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </DialogActions>
        </Grid>

        <div className={classes.searchContainer}>
          <CustomTextField
            color="primary"
            placeholder={paste}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={onChange}
          />
        </div>

        <DialogContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.tokenRow}
          >
            <Grid item>
              <Typography className={classes.label}>
                {t("TokenSelect.Name")}
              </Typography>
            </Grid>

            {!foundCustom ? (
              <Grid item>
                <Typography className={classes.label}>
                  {t("TokenSelect.Balance")}
                </Typography>
              </Grid>
            ) : (
              <Grid item>
                <Typography className={classes.label}>
                  {t("TokenSelect.Found")}
                </Typography>
              </Grid>
            )}
          </Grid>
          {filteredTokenList.length === 0 && (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.tokenRow}
            >
              {searching ? (
                <Grid item xs={12}>
                  <CustomLinearProgress color="primary" />
                </Grid>
              ) : (
                <Grid item>
                  <Typography className={classes.empty}>
                    {t("TokenSelect.NoMatch")}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
          {foundCustom ? (
            <div>
              {filteredTokenList.map((token: any) => (
                <div key={token[direction].id} className={classes.tokenButton}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={classes.customRow}
                  >
                    <Grid item>
                      <Grid container alignItems="center">
                        <img
                          className={classes.logo}
                          src={token.icon}
                          alt={token[direction].symbol}
                        />

                        <Typography className={classes.ticker}>
                          {token[direction].symbol}
                        </Typography>
                        <Hidden xsDown>
                          <Typography className={classes.name}>
                            {token[direction].name}
                          </Typography>
                        </Hidden>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          // add to custom token list, assign active token, close modal
                          handleClose();
                          props.onAssetChange(token);
                          setFoundCustom(false);
                          addCustomToken(token, network);
                        }}
                        className={classes.balance}
                      >
                        {t("TokenSelect.AddCustom")}
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {filteredTokenList.map((token: any) => (
                <Button
                  key={token[direction].id}
                  fullWidth
                  className={classes.tokenButton}
                  onClick={() => {
                    props.onAssetChange(token);
                    handleClose();
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={classes.tokenRow}
                  >
                    <Grid item>
                      <Grid container alignItems="center">
                        <img
                          className={classes.logo}
                          src={token.icon}
                          alt={token[direction].symbol}
                        />
                        <Typography className={classes.ticker}>
                          {token[direction].symbol}
                        </Typography>
                        <Hidden xsDown>
                          <Typography className={classes.name}>
                            {token[direction].name}
                          </Typography>
                        </Hidden>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.balance}>
                        {store.get(`${token[direction].id}Balance`)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default withStyles(styles)(TokenSelectorModal);
