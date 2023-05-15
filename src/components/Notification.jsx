//Hooks & Router
import React from "react";
import { useNavigate } from "react-router";

//MUI
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

//Rest
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Notification = ({ handleClose, notification }) => {
  const navigate = useNavigate();

  const { type, read, sender, recipient, screamId, createdAt } = notification;

  dayjs.extend(relativeTime);

  const time = dayjs(createdAt).fromNow();
  const notificationText =
    type === "like"
      ? `${sender} liked your scream`
      : `${sender} commented on your scream`;

  const iconColor = read ? "primary" : "info";

  const icon =
    type === "like" ? (
      <FavoriteIcon sx={{ marginRight: "10px" }} color={iconColor} />
    ) : (
      <ChatIcon sx={{ marginRight: "10px" }} color={iconColor} />
    );

  const handleNotificationClick = () => {
    navigate(`/user/${recipient}/scream/${screamId}`);
    handleClose();
  };

  return (
    <MenuItem
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      onClick={handleNotificationClick}
    >
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        {icon}
        {notificationText}
      </div>
      <Typography variant="caption">{time}</Typography>
    </MenuItem>
  );
};

export default Notification;
