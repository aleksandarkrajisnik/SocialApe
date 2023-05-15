import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCurrentUserData,
  fetchAnyUserData,
  markNotificationsRead,
  screamLiked,
  screamUnliked,
} from "./asyncThunks";

import axios from "axios";
import jwtDecode from "jwt-decode";

const initialState = {
  user: {
    authenticated:
      localStorage.FBIdToken &&
      jwtDecode(localStorage.FBIdToken).exp * 1000 > Date.now(),
    credentials: {},
    likes: [],
    notifications: [],
  },
  userProfile: {},
  loadingUser: false,
  errors: "",
};

const setUserTokenToStorageAndHeaders = (userToken) => {
  const FBIdToken = `Bearer ${userToken}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

const removeUserTokenFromStorageAndHeaders = () => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user.authenticated = true;
      setUserTokenToStorageAndHeaders(action.payload);
    },
    logoutUser: (state) => {
      removeUserTokenFromStorageAndHeaders();
      state.user = {
        authenticated: false,
        credentials: {},
        likes: [],
        notifications: [],
      };
    },
    clearUserErrors: (state) => {
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUserData.pending, (state) => {
      state.loadingUser = true;
    });
    builder.addCase(fetchCurrentUserData.fulfilled, (state, action) => {
      state.user = {
        authenticated: true,
        ...action.payload,
      };
      state.loadingUser = false;
    });
    builder.addCase(fetchCurrentUserData.rejected, (state, action) => {
      state.errors = action.payload;
      state.loadingUser = false;
    });
    builder.addCase(screamLiked.fulfilled, (state, action) => {
      state.user.likes.push({
        userHandle: state.user.credentials.handle,
        screamId: action.payload.screamId,
      });
    });
    builder.addCase(screamUnliked.fulfilled, (state, action) => {
      state.user.likes = state.user.likes.filter(
        (like) => like.screamId !== action.payload.screamId
      );
    });
    builder.addCase(fetchAnyUserData.pending, (state) => {
      state.loadingUser = true;
    });
    builder.addCase(fetchAnyUserData.fulfilled, (state, action) => {
      state.loadingUser = false;
      if (action.payload.errror) {
        state.errors = action.payload.errror;
      } else {
        state.errors = "";
        state.userProfile = action.payload.user;
      }
    });
    builder.addCase(markNotificationsRead.fulfilled, (state, action) => {
      //state.user.notifications = action.payload;
      state.user.notifications = state.user.notifications.map(
        (notification) => {
          notification.read = true;
          return notification;
        }
      );
    });
  },
});

export const { loginUser, logoutUser, clearUserErrors } = userSlice.actions;

export default userSlice.reducer;
