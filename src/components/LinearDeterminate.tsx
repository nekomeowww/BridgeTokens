import React from "react";
import theme from "../theme/theme";
import { Styles, withStyles } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles: Styles<typeof theme, any> = (theme) => ({
    confirmationBar: {
        width: "100%",
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
});

interface Props {
    className?: string;
    classes: { [key in string]: string };
    confirmationNumber: any;
    confirmationTotal: any;
}

const CustomLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const LinearDeterminate: React.FC<Props> = function(props) {
    const { classes, confirmationNumber, confirmationTotal } = props;

    let [progress] = React.useState(0);
    progress = (confirmationNumber / confirmationTotal) * 100;

    return (
        <div className={classes.confirmationBar}>
            <CustomLinearProgress variant="determinate" color="primary" value={progress} />
        </div>
    );
};

export default withStyles(styles)(LinearDeterminate);
