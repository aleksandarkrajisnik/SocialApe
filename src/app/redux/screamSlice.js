import { createSlice } from "@reduxjs/toolkit";

import {
  fetchScreams,
  fetchOneScream,
  screamLiked,
  screamUnliked,
  screamDeleted,
  postNewComment,
  postNewScream,
  fetchAnyUserData,
} from "./asyncThunks";

const initialState = {
  screams: [],
  scream: {},
  loadingScreams: false,
  loadingScream: false,
  errors: "",
};

export const screamSlice = createSlice({
  name: "scream",
  initialState,
  reducers: {
    setScreams: (state, action) => {
      state.screams = action.payload;
    },
    clearErrors: (state) => {
      state.errors = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchScreams.pending, (state) => {
      state.loadingScreams = true;
    });
    builder.addCase(fetchScreams.fulfilled, (state, action) => {
      state.loadingScreams = false;
      state.screams = action.payload;
    });
    builder.addCase(fetchScreams.rejected, (state, action) => {
      state.loadingScreams = false;
      state.errors = action.payload;
    });
    builder.addCase(fetchOneScream.pending, (state) => {
      state.loadingScream = true;
    });
    builder.addCase(fetchOneScream.fulfilled, (state, action) => {
      state.scream = action.payload;
      state.loadingScream = false;
    });
    builder.addCase(screamLiked.fulfilled, (state, action) => {
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
    });
    builder.addCase(screamUnliked.fulfilled, (state, action) => {
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
    });
    builder.addCase(screamDeleted.fulfilled, (state, action) => {
      state.screams = state.screams.filter(
        (scream) => scream.screamId !== action.payload.screamId
      );
    });
    builder.addCase(postNewScream.pending, (state, action) => {
      state.loadingScreams = true;
    });
    builder.addCase(postNewScream.fulfilled, (state, action) => {
      state.loadingScreams = false;
      if (action.payload.error) {
        state.errors = action.payload;
      } else {
        state.errors = {};
        state.screams = [action.payload, ...state.screams];
      }
    });
    builder.addCase(postNewComment.fulfilled, (state, action) => {
      if (action.payload.comment) {
        state.errors = action.payload;
      } else {
        state.scream.comments = [action.payload, ...state.scream.comments];
        const updatedScream = state.screams.findIndex(
          (scream) => scream.screamId === action.payload.screamId
        );
        state.screams[updatedScream].commentCount++;
        state.errors = {};
      }
    });
    builder.addCase(fetchAnyUserData.pending, (state, action) => {
      state.loadingScreams = true;
    });
    builder.addCase(fetchAnyUserData.fulfilled, (state, action) => {
      if (action.payload.errror) {
        state.errors = action.payload.errror;
      } else {
        state.errors = "";
        state.screams = action.payload.screams;
      }

      state.loadingScreams = false;
    });
  },
});

export const { setScreams, clearErrors } = screamSlice.actions;

export default screamSlice.reducer;
