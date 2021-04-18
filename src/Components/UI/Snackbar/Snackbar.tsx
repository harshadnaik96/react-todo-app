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
    "& > * + *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

interface ISnackbar {
  snackbarOpen: boolean;
  snackbarHandleClick: () => void;
  snackbarHandleClose: () => void;
}
const CustomizedSnackbars: React.FC<ISnackbar> = ({
  snackbarOpen,
  snackbarHandleClick,
  snackbarHandleClose,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClick={snackbarHandleClick}
        onClose={snackbarHandleClose}
      >
        <Alert onClose={snackbarHandleClose} severity='success'>
          success, saved to Firebase
        </Alert>
      </Snackbar>
      {/* <Alert severity='error'>This is an error message!</Alert>
      <Alert severity='warning'>This is a warning message!</Alert>
      <Alert severity='info'>This is an information message!</Alert>
      <Alert severity='success'>This is a success message!</Alert> */}
    </div>
  );
};
export default CustomizedSnackbars;
