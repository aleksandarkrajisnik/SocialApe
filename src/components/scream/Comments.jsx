//Hooks & Router
import React from "react";
import { Link } from "react-router-dom";

//MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

//Rest
import dayjs from "dayjs";

const Comments = ({ comments }) => {
  const breakpoint = useMediaQuery("(max-width:500px)");
  const styles = {
    commentContainer: {
      marginTop: "20px",
      boxShadow: "0px 0px 25px black",
      borderRadius: "5px",
    },
    comment: {
      borderBottom: "1px solid lightgray",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "white",
    },
    imageContainer: {
      maxWidth: "300px",
      minWidth: "30px",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      overflow: "hidden",
    },
    commentImage: {
      height: "100%",
      width: "100%",
      borderRadius: "50%",
    },
  };
  return (
    <Grid sx={styles.commentContainer} container>
      {comments?.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Grid key={index} sx={styles.comment} item sm={12}>
            <Grid container>
              <Grid item xs={2}>
                <div style={styles.imageContainer}>
                  <img
                    style={styles.commentImage}
                    src={userImage}
                    alt="comment"
                  />
                </div>
              </Grid>
              <Grid sx={{ paddingLeft: "20px" }} item xs={9}>
                <div>
                  <Typography
                    variant="subtitle1"
                    component={Link}
                    to={`/user/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: breakpoint ? "0" : "10px",
                      display: breakpoint ? "block" : "inline",
                    }}
                    variant="caption"
                    color="secondary"
                  >
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                  <Typography variant="body1">{body}</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Comments;
