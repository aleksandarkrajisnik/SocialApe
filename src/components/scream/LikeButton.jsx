//Hooks & Router
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions & API
import { screamLiked, screamUnliked } from "../../app/redux/asyncThunks";

//MUI
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

//Components
import TooltipButton from "../TooltipButton";

const LikeButton = ({ screamId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const isScreamLiked =
    user.likes && user.likes.find((scream) => scream.screamId === screamId);

  const handleLikeScream = () => {
    dispatch(screamLiked(screamId));
  };

  const handleUnlikeScream = () => {
    dispatch(screamUnliked(screamId));
  };

  return isScreamLiked ? (
    <TooltipButton tooltipTitle="Undo like" onClick={handleUnlikeScream}>
      <Favorite color="primary" />
    </TooltipButton>
  ) : (
    <TooltipButton tooltipTitle="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </TooltipButton>
  );
};

export default LikeButton;
