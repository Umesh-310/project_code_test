import { MenuItem, Select } from "@mui/material";
import React from "react";

const SelectYesNo = (props) => {
  const {
    id = "CoderTest-select",
    name = "select",
    sx = { width: "50%" },
    value,
    onChange,
  } = props;
  return (
    <Select
      id={id}
      name={name}
      inputProps={{ "aria-label": "Without label" }}
      sx={sx}
      value={value}
      onChange={onChange}
    >
      {["Yes", "No"].map((val, i) => {
        return (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectYesNo;
