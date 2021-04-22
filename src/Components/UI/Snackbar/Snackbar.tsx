import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
}));

interface ISnackbar {
  snack: any;
  snackbarOpen: boolean;
  snackbarHandleClick: (variant: any) => void;
  snackbarHandleClose: () => void;
}
const CustomizedSnackbars: React.FC<ISnackbar> = ({
  snack,
  snackbarOpen,
  snackbarHandleClick,
  snackbarHandleClose,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snack.duration}
        onClick={snackbarHandleClick}
        onClose={snackbarHandleClose}
      >
        <Alert severity={snack.severity}>{snack.text}</Alert>
      </Snackbar>
    </div>
  );
};
export default CustomizedSnackbars;
