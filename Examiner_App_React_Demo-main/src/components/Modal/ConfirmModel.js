import React from "react";
import DefaultModel from "./DefaultModel";
import { Box, TextField } from "@mui/material";

const ConfirmModel = (props) => {
  const {
    open,
    handleClose,
    onClick,
    Title,
    message,
    closeBtn = "",
    arrgeBtn = "Agree",
    onChange,
    placeholder = "",
    error = "",
  } = props;
  return (
    <DefaultModel
      open={open}
      handleClose={handleClose}
      onClick={onClick}
      Title={Title}
      message={message}
      closeBtn={closeBtn}
      arrgeBtn={arrgeBtn}
    >
      <Box sx={{ margin: "10px" }}>
        <TextField
          error={!!error}
          fullWidth
          type="text"
          onChange={onChange}
          placeholder={placeholder}
          helperText={error}
        />
      </Box>
    </DefaultModel>
  );
};

export default ConfirmModel;
