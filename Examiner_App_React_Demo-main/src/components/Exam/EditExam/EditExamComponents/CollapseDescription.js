import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
const CollapseDescription = ({ description }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <Typography variant="body2">
      {readMore
        ? description
        : description.length >= 80
        ? `${description.substring(0, 80)}...`
        : description}
      {description.length >= 80 && (
        <Button
          sx={{ fontSize: "12px", padding: 0 }}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "Less" : "More"}
        </Button>
      )}
    </Typography>
  );
};

export default CollapseDescription;
