import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getScreams,
  likeScream,
  deleteScream,
  unlikeScream,
  newScream,
  newComment,
  getOneScream,
} from "../api/screams";

import {
  getCurrentUserData,
  getAnyUserData,
  readNotifications,
} from "../api/user";

//SCREAM
export const fetchScreams = createAsyncThunk("scream/fetchScreams", getScreams);
export const fetchOneScream = createAsyncThunk(
  "scream/fetchOneScream",
  getOneScream
);
export const screamLiked = createAsyncThunk("scream/likeScream", likeScream);
export const screamUnliked = createAsyncThunk(
  "scream/unlikeScream",
  unlikeScream
);
export const screamDeleted = createAsyncThunk(
  "scream/deleteScream",
  deleteScream
);
export const postNewScream = createAsyncThunk("scream/newScream", newScream);
export const postNewComment = createAsyncThunk("scream/newComment", newComment);

//USER
export const fetchCurrentUserData = createAsyncThunk(
  "user/fetchCurrentUserData",
  getCurrentUserData
);
export const fetchAnyUserData = createAsyncThunk(
  "user/fetchAnyUserData",
  getAnyUserData
);
export const markNotificationsRead = createAsyncThunk(
  "user/markNotificationsRead",
  readNotifications
);
