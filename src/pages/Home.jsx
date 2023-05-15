//Hooks & Router
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Actions & API
import { fetchScreams } from "../app/redux/asyncThunks";

//MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

//Components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import LoadingSpinner from "../components/LoadingSpinner";
import AddScream from "../components/scream/AddScream";

const Home = () => {
  const breakpoint = useMediaQuery("(max-width:400px)");
  const dispatch = useDispatch();
  const { screams, loadingScreams } = useSelector(
    (state) => state.screamReducer
  );
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

  useEffect(() => {
    dispatch(fetchScreams());
  }, []);

  return (
    <Grid sx={styles.homeContainer} className="homeContainer" container>
      <Grid item md={9} sm={8} xs={12}>
        {loadingScreams && <LoadingSpinner />}
        {!loadingScreams && screams?.length === 0 && (
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
              No screams posted yet, be the first one!
              <AddScream />
            </Typography>
          </Grid>
        )}
        <Grid sm={10} xs={12}>
          {!loadingScreams &&
            screams?.map((scream) => (
              <Scream key={scream.screamId} scream={scream} />
            ))}
        </Grid>
      </Grid>
      <Grid item md={3} sm={4} xs={12}>
        <Profile currentUser />
      </Grid>
    </Grid>
  );
};

export default Home;
