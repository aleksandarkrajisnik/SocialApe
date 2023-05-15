//Hooks & Router
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions & API
import { fetchCurrentUserData } from "../../app/redux/asyncThunks";
import { editUserDetails } from "../../app/api/user";

//MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";

//Components
import TooltipButton from "../TooltipButton";

const EditDetails = () => {
  const dispatch = useDispatch();
  const {
    credentials: { bio, website, location },
  } = useSelector((state) => state.userReducer.user);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const bioRef = useRef(null);
  const websiteRef = useRef(null);
  const locationRef = useRef(null);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const updateUserDetails = () => {
    const userDetails = {
      bio: bioRef.current.value,
      website: websiteRef.current.value,
      location: locationRef.current.value,
    };

    editUserDetails(userDetails).then(() => {
      getUserInfo();
    });

    closeDialog();
  };

  const getUserInfo = () => {
    dispatch(fetchCurrentUserData());
  };

  return (
    <>
      <TooltipButton
        btnClassName="tooltipButton"
        tooltipTitle={"Edit details"}
        onClick={openDialog}
      >
        <EditIcon color="primary" />
      </TooltipButton>
      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              name="Bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              fullWidth
              inputRef={bioRef}
              defaultValue={bio ?? ""}
            />
            <TextField
              name="Website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              fullWidth
              inputRef={websiteRef}
              defaultValue={website ?? ""}
            />
            <TextField
              name="Location"
              type="text"
              label="Location"
              placeholder="Where you live"
              fullWidth
              inputRef={locationRef}
              defaultValue={location ?? ""}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={updateUserDetails} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDetails;
