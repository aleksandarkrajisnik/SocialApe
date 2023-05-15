//Hooks & Router
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Actions & API
import { fetchCurrentUserData } from "../app/redux/asyncThunks";
import { loginUser } from "../app/redux/userSlice";
import { logIn } from "../app/api/user";

//MUI
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

//Rest
import ApeLogo from "../assets/images/ape-icon.png";

const LogIn = () => {
  const styles = {
    formContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "secondary.light",
      width: "100%",
      height: "100%",
    },
    form: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      marginTop: 20,
    },
    pageTitle: {
      fontWeight: "700",
      color: "secondary.dark",
    },
    image: {
      width: "200px",
    },
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    logIn(userData)
      .then((res) => {
        dispatch(loginUser(res.data.token));
        dispatch(fetchCurrentUserData());
        clearLeftoverErrors();
      })
      .catch((err) => {
        setErrors(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  const clearLeftoverErrors = () =>
    Object.keys(errors).length > 0 && setErrors({});

  return (
    <Grid container className="formContainer" sx={styles.formContainer}>
      <Grid item sx={{ textAlign: "center" }}>
        <img src={ApeLogo} alt="Social Ape" style={styles.image} />
        <Typography variant="h3" sx={styles.pageTitle}>
          Social <span>Ape</span>
        </Typography>

        <form style={styles.form} noValidate onSubmit={handleLogin}>
          <TextField
            fullWidth
            size="small"
            id="email"
            name="email"
            error={errors.email ? true : false}
            helperText={errors.email}
            type="email"
            label="E-mail"
            inputRef={emailRef}
          />
          <TextField
            fullWidth
            size="small"
            sx={styles.textField}
            id="password"
            name="password"
            error={errors.password ? true : false}
            helperText={errors.password}
            type="password"
            label="Password"
            inputRef={passwordRef}
          />
          <Button disabled={loading} variant="contained" onClick={handleLogin}>
            {loading && (
              <CircularProgress
                size={25}
                sx={{ marginRight: "10px", color: "white" }}
              />
            )}
            Login
          </Button>

          <small>
            Don't have an account? Sign up <Link to="/signup">here!</Link>
          </small>

          {errors.general && (
            <Typography variant="body2" color="red">
              {errors.general}
            </Typography>
          )}
        </form>
      </Grid>
    </Grid>
  );
};

export default LogIn;
