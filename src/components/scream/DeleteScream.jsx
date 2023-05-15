//Hooks & Router
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Actions & API
import { screamDeleted } from "../../app/redux/asyncThunks";

//MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const DeleteScream = ({ screamId }) => {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const deleteScream = () => {
    dispatch(screamDeleted(screamId));
    closeDialog();
  };

  return (
    <>
      <Tooltip placement="top" title={"Delete scream"}>
        <IconButton
          sx={{ position: "absolute", right: "8px", bottom: "24px" }}
          onClick={openDialog}
        >
          <DeleteOutline sx={{ color: "danger.main" }} />
        </IconButton>
      </Tooltip>

      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogContent>This action is irreversible</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>CANCEL</Button>
          <Button onClick={deleteScream} color="danger">
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteScream;
