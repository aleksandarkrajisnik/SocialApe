//Hooks & API
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions & API
import { markNotificationsRead } from "../../app/redux/asyncThunks";

//MUI
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";

//Components
import Notification from "../Notification";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.userReducer.user.notifications
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const numOfUnreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  const unreadNotificationIds = notifications
    .filter((notification) => !notification.read)
    .map((unreadNotification) => unreadNotification.notificationId);

  const notificationIcon =
    numOfUnreadNotifications > 0 ? (
      <Badge color="info" badgeContent={numOfUnreadNotifications}>
        <NotificationsIcon color="info" />
      </Badge>
    ) : (
      <NotificationsIcon color="info" />
    );

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(markNotificationsRead(unreadNotificationIds));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
      >
        {notificationIcon}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <Notification
              key={notification.createdAt}
              handleClose={handleClose}
              notification={notification}
            />
          ))
        ) : (
          <MenuItem onClick={handleClose}>You have no notifications</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Notifications;
