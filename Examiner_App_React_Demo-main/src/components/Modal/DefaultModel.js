import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { LogoText } from "../../utils/utils";

const DefaultModel = (props) => {
  const {
    open,
    handleClose,
    onClick,
    Title = <LogoText />,
    message,
    closeBtn = "",
    arrgeBtn = "Agree",
    children = <></>,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{Title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        {closeBtn && <Button onClick={handleClose}>{closeBtn}</Button>}
        {arrgeBtn && (
          <Button onClick={onClick} autoFocus>
            {arrgeBtn}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DefaultModel;
