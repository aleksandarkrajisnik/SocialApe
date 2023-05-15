//Hooks & Router
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Actions & API
import { fetchOneScream } from "../../app/redux/asyncThunks";

//MUI
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Chat from "@mui/icons-material/Chat";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import useMediaQuery from "@mui/material/useMediaQuery";

//Components
import TooltipButton from "../TooltipButton";
import Comments from "./Comments";
import LikeButton from "./LikeButton";
import DeleteScream from "./DeleteScream";
import CommentForm from "./CommentForm";
import LoadingSpinner from "../LoadingSpinner";

//Rest
import dayjs from "dayjs";

const ScreamDialog = ({ scream, isDialogOpen, closeDialog }) => {
  const breakpoint = useMediaQuery("(max-width:850px)");
  const styles = {
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      overflow: "scroll",
    },
  };
  const { screamId } = scream;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const { scream: currentScream, loadingScream } = useSelector(
    (state) => state.screamReducer
  );

  const isAuthorized = scream?.userHandle === user.credentials.handle;

  useEffect(() => {
    if (screamId) {
      dispatch(fetchOneScream(screamId));
    }
  }, []);

  return (
    <>
      <Dialog
        open={Boolean(isDialogOpen)}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
      >
        {scream && (
          <>
            <DialogContent className="screamDialog" sx={styles.dialogContent}>
              <Card sx={{ flexShrink: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" src={scream.userImage}></Avatar>
                  }
                  title={
                    <Link to={`/user/${scream.userHandle}`}>
                      {scream.userHandle}
                    </Link>
                  }
                  subheader={dayjs(scream.createdAt).fromNow()}
                />
                <CardContent
                  sx={{
                    padding: "15px 20px",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Typography variant="body1">{scream.body}</Typography>
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
                      <span>{scream.likeCount} likes</span>
                    </div>
                    <div style={{ display: "inline" }}>
                      <TooltipButton tooltipTitle="Comment">
                        <Chat color="primary" />
                      </TooltipButton>
                      <span>{scream.commentCount} comments</span>
                    </div>

                    {isAuthorized && <DeleteScream screamId={screamId} />}
                  </div>
                </CardContent>
              </Card>

              {loadingScream ? (
                <LoadingSpinner />
              ) : (
                <Comments comments={currentScream.comments} />
              )}
            </DialogContent>

            <CommentForm screamId={screamId} />
          </>
        )}
      </Dialog>
    </>
  );
};

export default ScreamDialog;
