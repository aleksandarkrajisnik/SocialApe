import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const NoMatch = () => {
  return (
    <Grid
      container
      maxWidth="xl"
      sx={{
        width: "100%",
        height: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2">
        Uh oh! Nothing to see here...wrong link?
      </Typography>
    </Grid>
  );
};

export default NoMatch;
