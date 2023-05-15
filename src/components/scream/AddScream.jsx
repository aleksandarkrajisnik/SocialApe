//Hooks & Router
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions & API
import { postNewScream } from "../../app/redux/asyncThunks";
import { clearErrors } from "../../app/redux/screamSlice";

//MUI
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

//Components
import TooltipButton from "../TooltipButton";

const AddScream = () => {
  const styles = {
    imageContainer: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#40916c",
      padding: "3px",
    },
    profileImg: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
    },
  };

  const dispatch = useDispatch();
  const { handle, imageUrl } = useSelector(
    (state) => state.userReducer.user.credentials
  );
  const { errors, loadingScreams } = useSelector(
    (state) => state.screamReducer
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const postRef = useRef(null);

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => {
    setIsDialogOpen(false);
    dispatch(clearErrors());
  };

  const handleNewPost = () => {
    const screamBody = {
      body: postRef.current.value,
      userHandle: handle,
    };
    dispatch(postNewScream(screamBody));
    if (postRef.current.value.trim().length > 0) {
      closeDialog();
    }
  };

  return (
    <>
      <TooltipButton tooltipTitle="Post a scream" onClick={openDialog}>
        <AddIcon color="info" />
      </TooltipButton>
      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogContent>
          <Grid
            container
            sx={{
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div style={styles.imageContainer}>
              <img style={styles.profileImg} src={imageUrl} alt="Profile" />
            </div>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                marginLeft: "10px",
                color: "primary.dark",
              }}
            >
              {handle}
            </Typography>
          </Grid>
          <TextField
            name="post"
            type="text"
            label="New post"
            multiline
            rows="3"
            placeholder="Write something clever..."
            error={errors.error}
            helperText={errors?.error}
            fullWidth
            inputRef={postRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="danger">
            CANCEL
          </Button>
          <Button
            disabled={loadingScreams}
            onClick={handleNewPost}
            color="primary"
          >
            {loadingScreams && (
              <CircularProgress
                size={25}
                sx={{ marginRight: "10px", color: "white" }}
              />
            )}
            POST
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddScream;
