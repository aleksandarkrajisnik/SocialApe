//Hooks & Router
import React from "react";
import { useNavigate } from "react-router";

//MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import useMediaQuery from "@mui/material/useMediaQuery";

//Components
import TooltipButton from "../TooltipButton";
import AddScream from "../scream/AddScream";
import Notifications from "./Notifications";

//Rest
import ApeLogo from "../../assets/images/ape-icon-secondary-dark.png";

const Navbar = () => {
  const styles = {
    appbar: {
      backgroundColor: "primary.dark",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      position: "relative",
    },
    toolbar: {
      //border: "1px solid red",
      width: "100%",
      maxWidth: "1530px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
  };

  const breakpoint = useMediaQuery("(max-width:400px)");
  const navigate = useNavigate();
  const handleHome = () => navigate("/");

  return (
    <AppBar sx={styles.appbar}>
      <Toolbar sx={styles.toolbar}>
        <div style={styles.logo} onClick={handleHome}>
          <img width="60px" src={ApeLogo} alt="Social Ape" />
          {!breakpoint && <Typography variant="h4">Social Ape</Typography>}
        </div>
        <div className="actionButtons">
          <TooltipButton onClick={handleHome} tooltipTitle="Home">
            <HomeIcon color="info" />
          </TooltipButton>
          <AddScream />
          <Notifications />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
