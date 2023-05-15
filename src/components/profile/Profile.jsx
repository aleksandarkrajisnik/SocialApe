//Hooks & Router
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Actions & API
import { uploadImage } from "../../app/api/user";
import { fetchCurrentUserData } from "../../app/redux/asyncThunks";
import { logoutUser } from "../../app/redux/userSlice";

//MUI
import Paper from "@mui/material/Paper";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import KeyboardIcon from "@mui/icons-material/KeyboardReturn";
import EditIcon from "@mui/icons-material/Edit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useStyles } from "../../assets/MuiStyles/MuiStyles";

//Components
import EditDetails from "./EditDetails";
import TooltipButton from "../TooltipButton";
import LoadingSpinner from "../LoadingSpinner";

//Rest
import dayjs from "dayjs";

const Profile = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { user, userProfile, loadingUser } = useSelector(
    (state) => state.userReducer
  );
  const styles = useStyles();

  const profile = currentUser ? user.credentials : userProfile;
  const { handle, bio, website, imageUrl, location, createdAt } = profile;

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImage(formData).then(() => {
      dispatch(fetchCurrentUserData());
    });
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return loadingUser ? (
    <LoadingSpinner />
  ) : (
    <>
      <Paper className={styles.paper}>
        <div className={styles.profile}>
          <div className="profile-image">
            <img src={imageUrl} alt="profile" />
          </div>
          {(user.credentials.handle === userProfile.handle || currentUser) && (
            <TooltipButton
              btnClassName="tooltipButton editPicture"
              tooltipTitle="Edit profile picture"
              onClick={handleEditPicture}
            >
              <AddAPhotoIcon color="primary" />
            </TooltipButton>
          )}
          <input
            type="file"
            hidden="hidden"
            id="imageInput"
            onChange={handleImageChange}
          />

          <div className="profile-details" style={{ width: "100%" }}>
            <MuiLink
              component={Link}
              to={`/user/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            {bio && (
              <Typography
                sx={{
                  textAlign: "center",
                  wordBreak: "break-word",
                  width: "100%",
                }}
                variant="body2"
              >
                {bio}
              </Typography>
            )}
            {location && (
              <Typography
                sx={{
                  textAlign: "center",
                  wordBreak: "break-word",
                  width: "100%",
                }}
                variant="body2"
              >
                <LocationOn color="primary" />
                <span>{location}</span>
              </Typography>
            )}
            {website && (
              <Typography textAlign="center" variant="body2">
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </Typography>
            )}
            <Typography textAlign="center" variant="body2">
              <CalendarIcon color="primary" />
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </Typography>
          </div>
          {(user.credentials.handle === userProfile.handle || currentUser) && (
            <div className="actionButtons">
              <TooltipButton
                btnClassName="tooltipButton"
                tooltipTitle="Log out"
                onClick={handleLogOut}
              >
                <KeyboardIcon color="primary" />
              </TooltipButton>
              <EditDetails />
            </div>
          )}
        </div>
      </Paper>
    </>
  );
};

export default Profile;
