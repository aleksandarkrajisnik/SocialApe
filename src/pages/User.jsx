//Hooks & Router
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//Actions & API
import { fetchAnyUserData } from "../app/redux/asyncThunks";

//MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

//Components
import Profile from "../components/profile/Profile";
import Scream from "../components/scream/Scream";
import LoadingSpinner from "../components/LoadingSpinner";

const User = () => {
  const breakpoint = useMediaQuery("(max-width:400px)");
  const styles = {
    homeContainer: {
      padding: 5,
      justifyContent: "space-between",
    },
    noScreams: {
      display: "flex",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      textAlign: "center",
    },
  };
  const { handle, screamId: screamIdParam } = useParams();
  const dispatch = useDispatch();
  const {
    screams,
    loadingScreams,
    errors: screamErrors,
  } = useSelector((state) => state.screamReducer);
  const { errors: userErrors } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchAnyUserData(handle));
  }, [handle]);

  const userMarkup = screamErrors ? (
    <Grid sx={styles.noScreams}>
      <Typography
        sx={{
          fontWeight: 500,
          marginTop: breakpoint ? 10 : 20,
          marginBottom: 10,
          color: "primary.dark",
        }}
        variant="h4"
      >
        {screamErrors}
      </Typography>
    </Grid>
  ) : screams.length === 0 && !loadingScreams ? (
    <Grid sx={styles.noScreams}>
      <Typography
        sx={{
          fontWeight: 500,
          marginTop: breakpoint ? 10 : 20,
          marginBottom: 10,
          color: "primary.dark",
        }}
        variant="h4"
      >
        This user has no screams
      </Typography>
    </Grid>
  ) : screamIdParam && !loadingScreams ? (
    <>
      {screams?.map((scream) => {
        if (scream.screamId !== screamIdParam) {
          return <Scream key={scream.screamId} scream={scream} />;
        } else
          return <Scream key={scream.screamId} scream={scream} dialogOpen />;
      })}
    </>
  ) : (
    !loadingScreams && (
      <>
        {screams?.map((scream) => (
          <Scream key={scream.screamId} scream={scream} />
        ))}
      </>
    )
  );

  return (
    <Grid sx={styles.homeContainer} className="homeContainer" container>
      <Grid md={9} item sm={8} xs={12}>
        {loadingScreams && <LoadingSpinner />}
        <Grid sm={10} xs={12}>
          {userMarkup}
        </Grid>
      </Grid>
      <Grid item md={3} sm={4} xs={12}>
        {!userErrors && <Profile />}
      </Grid>
    </Grid>
  );
};

export default User;
