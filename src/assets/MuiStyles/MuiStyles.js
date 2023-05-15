import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
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
  textField: {
    "&.MuiInputBase-input": {
      [theme.breakpoints.up("md")]: {
        border: "1px solid red",
      },
    },
  },
  paper: {
    padding: 20,
  },
  profile: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    "& .profile-image": {
      position: "relative",
      width: "70%",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      objectFit: "cover",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      maxWidth: "100%",

      "& img": {
        borderRadius: "50%",
      },
    },
    "& .editPicture": {
      position: "absolute",
      right: "0px",
      top: "0px",
      zIndex: "100",
    },
    "& .profile-details": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& svg": {
        marginRight: "10px",
      },
      "& a": {
        color: "primary.main",
      },
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
    "& .actionButtons": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
}));
