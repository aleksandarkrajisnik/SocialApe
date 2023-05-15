//Hooks & Router
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Actions & API
import { fetchCurrentUserData } from "./app/redux/asyncThunks";
import { loginUser, logoutUser } from "./app/redux/userSlice";

//MUI
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./assets/MuiStyles/muiTheme";

//Components & Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import User from "./pages/User";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./routes/PrivateRoute";

//Rest
import "./App.scss";
import jwtDecode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.userReducer.user.authenticated
  );

  useEffect(() => {
    if (userIsLoggedIn) {
      dispatch(loginUser(localStorage.FBIdToken.split("Bearer ")[1]));
      dispatch(fetchCurrentUserData());
    } else {
      dispatch(logoutUser());
    }
    // eslint-disable-next-line
  }, []);

  const userIsLoggedIn =
    localStorage.FBIdToken &&
    jwtDecode(localStorage.FBIdToken).exp * 1000 > Date.now();

  const theme = createTheme(muiTheme);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          {isAuthenticated && <Navbar />}
          <div className="appWrapper">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute
                    outlet={<Home />}
                    authPath="/login"
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <PrivateRoute
                    outlet={<LogIn />}
                    authPath="/"
                    isAuthenticated={!isAuthenticated}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <PrivateRoute
                    outlet={<SignUp />}
                    authPath="/login"
                    isAuthenticated={!isAuthenticated}
                  />
                }
              />
              <Route
                path="/user/:handle"
                element={
                  <PrivateRoute
                    outlet={<User />}
                    authPath="/login"
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/user/:handle/scream/:screamId"
                element={
                  <PrivateRoute
                    outlet={<User />}
                    authPath="/login"
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
