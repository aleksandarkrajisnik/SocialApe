//Hooks & Router
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Actions & API
import { fetchCurrentUserData } from "../app/redux/asyncThunks";
import { loginUser } from "../app/redux/userSlice";
import { signUp } from "../app/api/user";

//MUI
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

//Rest
import ApeLogo from "../assets/images/ape-icon.png";

const SignUp = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const handleRef = useRef(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    const newUserData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      handle: handleRef.current.value,
    };

    signUp(newUserData)
      .then((res) => {
        dispatch(loginUser(res.data.token));
        dispatch(fetchCurrentUserData());
        clearLeftoverErrors();
        redirectUserAfterLoggingIn();
      })
      .catch((err) => {
        setErrors(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const redirectUserAfterLoggingIn = () => navigate("/");

  const clearLeftoverErrors = () =>
    Object.keys(errors).length > 0 ? setErrors({}) : "";

  return (
    <Grid container className="formContainer" sx={styles.formContainer}>
      <Grid item sx={{ textAlign: "center" }}>
        <img src={ApeLogo} alt="Social Ape" style={styles.image} />
        <Typography variant="h3" sx={styles.pageTitle}>
          Social <span>Ape</span>
        </Typography>

        <form style={styles.form} noValidate onSubmit={handleSignUp}>
          <TextField
            fullWidth
            size="small"
            sx={styles.textField}
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
          <TextField
            fullWidth
            size="small"
            sx={styles.textField}
            id="confirmPassword"
            name="confirmPassword"
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword}
            type="password"
            label="Confirm password"
            inputRef={confirmPasswordRef}
          />
          <TextField
            fullWidth
            size="small"
            sx={styles.textField}
            id="handle"
            name="handle"
            error={errors.handle ? true : false}
            helperText={errors.handle}
            type="handle"
            label="Username"
            inputRef={handleRef}
          />
          <Button disabled={loading} variant="contained" onClick={handleSignUp}>
            {loading && (
              <CircularProgress
                size={25}
                sx={{ marginRight: "10px", color: "white" }}
              />
            )}
            Sign up
          </Button>

          <small>
            Already have an account? Log in <Link to="/login">here!</Link>
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

export default SignUp;
