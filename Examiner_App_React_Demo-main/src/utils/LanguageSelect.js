import { Box, Chip, FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { all_language_arr, languagesSvg } from "./utils";
import { useTheme } from "@mui/material/styles";
import css from "./LanguageSelect.module.css";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 1,
    },
  },
};

function getStyles(lang, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(lang) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const LanguageSelect = (props) => {
  const { handleChange, language } = props;
  const theme = useTheme();

  const ChipLogo = (value) => {
    return (
      <Chip
        icon={languagesSvg[value.key]}
        key={value.key}
        label={value.value}
      />
    );
  };
  return (
    <FormControl sx={{ width: 1 }}>
      <Select
        id="demo-multiple-chip"
        multiple
        value={language}
        name="language"
        placeholder="language"
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {all_language_arr.map((value) => {
              if (selected.includes(value.key)) return ChipLogo(value);
              else {
                return <></>;
              }
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        <MenuItem
          value={"select-all"}
          style={getStyles("select-all", language, theme)}
        >
          {"Select All"}
        </MenuItem>
        <MenuItem
          value={"deselect-all"}
          style={getStyles("deselect-all", language, theme)}
        >
          {"Deselect All"}
        </MenuItem>
        {all_language_arr.map((lang) => (
          <MenuItem
            key={lang}
            value={lang.key}
            style={getStyles(lang, language, theme)}
          >
            <div className={css.menuItemSvg}>{languagesSvg[lang.key]}</div>
            {lang.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
