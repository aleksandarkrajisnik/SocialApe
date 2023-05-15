//Hooks & Router
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Action & API
import { postNewComment } from "../../app/redux/asyncThunks";

//MUI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const CommentForm = ({ screamId }) => {
  const dispatch = useDispatch();

  const { errors } = useSelector((state) => state.screamReducer);

  const commentRef = useRef();

  const handleComment = () => {
    dispatch(
      postNewComment({
        screamId,
        body: {
          body: commentRef.current.value,
        },
      })
    );
    commentRef.current.value = "";
  };

  return (
    <Grid
      sx={{
        padding: "20px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <TextField
        //className="whiteTextField"
        name="comment"
        type="text"
        label="New comment"
        helperText={errors?.comment}
        error={errors?.comment}
        placeholder="Comment on this post"
        size="small"
        inputRef={commentRef}
        sx={{ width: "80%", height: "100%" }}
      />
      <Button sx={{ height: "100%" }} variant="primary" onClick={handleComment}>
        SUBMIT
      </Button>
    </Grid>
  );
};

export default CommentForm;
