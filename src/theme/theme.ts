import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    typography: {
        fontFamily: [
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    palette: {
        type: "dark",
        primary: {
            light: "#8DFEFF",
            main: "rgb(13, 129, 207, 1)",
            dark: "#404040",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff0",
            main: "rgb(200, 83, 103, 1)",
            dark: "#404040",
            contrastText: "#fff",
        },
        info: {
            light: "rgb(66,66,66)",
            main: "#606060",
            dark: "rgb(36,36,36)",
            contrastText: "rgba(255, 255, 255, 0.5)",
        },
        success: {
            light: "#32ce7cff",
            main: "#0aab6eff",
            dark: "#404040",
            contrastText: "#fff",
        },
        divider: "#606060",
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
            }
        },
        MuiButtonBase: {
            root: {
                textTransform: "none",
                borderRadius: 4,
                "&.MuiButton-outlined": {
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingLeft: 9,
                    paddingRight: 9,
                    "&.Mui-disabled": {
                        // backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
                        border: "1px solid transparent",
                    },
                },
                "&.MuiButton-sizeLarge": {
                    minHeight: 48,
                    fontSize: 17,
                },
                "&.MuiButton-contained": {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiFormLabel: {
            root: {
                "&.Mui-error": {
                    color: "rgb(200, 83, 103, 1)",
                }
            }

        },
        MuiFormHelperText: {
            root: {
                "&.Mui-error": {
                    color: "rgb(200, 83, 103, 1)",
                }
            }

        },
        MuiOutlinedInput: {
            root: {
                fontSize: 14,
                "& .MuiInputAdornment-marginDense span": {
                    fontSize: 12,
                },
                "& fieldset": {
                    borderRadius: 0,
                },
            },
            notchedOutline: {
                // borderColor: 'rgba(255, 255, 255, 0.23) !important',
                borderWidth: "1px !important",
            },
            inputMarginDense: {
                fontSize: 12,
                paddingTop: 11.5,
                paddingBottom: 11.5,
            },
        },
        //@ts-ignore
        MuiToggleButtonGroup: {
            root: {
                backgroundColor: "#fff",
                "& span": {
                    fontSize: 14,
                },
                "& button": {
                    minHeight: 52,
                },
                borderRadius: 0,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
            },
            grouped: {
                "&:not(:first-child)": {
                    // borderLeft: '1px solid rgba(255, 255, 255, 0.23)'
                },
            },
        },
        MuiMenu: {
            paper: {
                boxShadow: "0px 1px 3px rgba(0, 27, 58, 0.1)",
                border: "1px solid #606060",
                borderRadius: 8,
                backgroundColor: "rgb(32,32,32)",
                minWidth: 160,
            },
        },
        MuiDialog: {
            paper: {
                // boxShadow: "0px 1px 3px rgba(0, 27, 58, 0.1)",
                // border: "1px solid #666666",
                borderRadius: 15,
                backgroundColor: "rgb(36,36,36)",
                margin: "16px",
            },
            paperFullWidth: {
                width: "calc(100% - 32px)",
            },
        },

        // .MuiToggleButtonGroup-grouped:not(:first-child)
        MuiToggleButton: {
            root: {
                backgroundColor: "#eeeeee2e !important",
                "& img": {
                    opacity: 0.75,
                },
                "&.Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    color: "#000",
                    fontWeight: "500",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1) !important",
                    },
                    "& img": {
                        opacity: 1,
                    },
                },
                borderRadius: 0,
                "&:hover": {
                    backgroundColor: "#eeeeee2e !important",
                },
                "& .MuiToggleButton-label": {
                    fontSize: 12,
                },
            },
        },
    },
});
