//Hooks & Router
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Actions & API
import { clearErrors } from "../../app/redux/screamSlice";

//MUI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chat from "@mui/icons-material/Chat";
import UnfoldIcon from "@mui/icons-material/UnfoldMore";

//Components
import TooltipButton from "../TooltipButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";

//Rest
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

const Scream = ({ scream, dialogOpen }) => {
  const breakpoint = useMediaQuery("(max-width:850px)");
  const {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount,
  } = scream;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);

  const [isDialogOpen, setIsDialogOpen] = useState(dialogOpen);
  const [oldPath, setOldPath] = useState(`/user/${userHandle}`);

  dayjs.extend(relativeTime);

  const isAuthorized = userHandle === user.credentials.handle;

  const openDialog = () => {
    setIsDialogOpen(true);
    setOldPath(window.location.pathname);
    window.history.pushState(
      null,
      null,
      `/user/${userHandle}/scream/${screamId}`
    );
  };

  const closeDialog = () => {
    window.history.pushState(null, null, oldPath);
    setIsDialogOpen(false);
    dispatch(clearErrors());
  };

  return (
    <Card sx={{ marginBottom: 5 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={userImage}></Avatar>}
        action={
          <Tooltip title="Expand scream" placement="top">
            <IconButton onClick={openDialog}>
              <UnfoldIcon color="primary" />
            </IconButton>
          </Tooltip>
        }
        title={<Link to={`/user/${userHandle}`}>{userHandle}</Link>}
        subheader={dayjs(createdAt).fromNow()}
        sx={{ cursor: "pointer" }}
      />
      <CardContent
        sx={{ padding: "15px 20px", width: "100%", position: "relative" }}
      >
        <Typography variant="body1">{body}</Typography>
        <div
          className="screamActions"
          style={{
            width: "100%",
            marginTop: "20px",
            display: breakpoint ? "flex" : "block",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "inline" }}>
            <LikeButton screamId={screamId} />
            <span>{likeCount} likes</span>
          </div>
          <div style={{ display: "inline" }}>
            <TooltipButton onClick={openDialog} tooltipTitle="Comment">
              <Chat color="primary" />
            </TooltipButton>
            <span>{commentCount} comments</span>
          </div>

          {isAuthorized && <DeleteScream screamId={screamId} />}
        </div>

        {isDialogOpen && (
          <ScreamDialog
            isDialogOpen={isDialogOpen}
            closeDialog={closeDialog}
            scream={scream}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default Scream;
