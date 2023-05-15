import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const TooltipButton = ({ children, onClick, tooltipTitle, btnClassName }) => {
  return (
    <Tooltip placement="top" title={tooltipTitle}>
      <IconButton className={btnClassName} onClick={onClick}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default TooltipButton;
