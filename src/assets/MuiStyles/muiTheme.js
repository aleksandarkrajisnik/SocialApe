export const muiTheme = {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          p: {
            marginLeft: 0,
          },
          "&.infoTextField": {
            "& fieldset": {
              border: "1px solid #ffc300",
            },
            "& label": {
              color: "#ffc300",
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputBase-input:hover + fieldset": {
              border: `2px solid #ffc300`,
            },
            "& .MuiInputBase-input:focus + fieldset": {
              border: `2px solid #ffc300`,
            },
          },
          "&.whiteTextField": {
            "& fieldset": {
              border: "1px solid white",
            },
            "& label": {
              color: "white",
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputBase-input:hover + fieldset": {
              border: `2px solid white`,
            },
            "& .MuiInputBase-input:focus + fieldset": {
              border: `2px solid white`,
            },
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: { paddingTop: "24px !important" },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "info" },
          style: {
            border: "1px solid #ffc300",
            color: "#ffc300",
          },
        },
        {
          props: { variant: "primary" },
          style: {
            border: "1px solid #40916c",
            color: "#40916c",
          },
        },
      ],
    },
  },
  palette: {
    primary: {
      light: "#74c69d",
      main: "#40916c",
      dark: "#1b4332",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f8f9fa",
      main: "#343A40",
      dark: "#2E2E2E",
      contrastText: "#0D1B2A",
    },
    info: {
      light: "#fff75e",
      main: "#ffd60a",
      dark: "#ffc300",
      contrastText: "#0D1B2A",
    },
    danger: {
      main: "#F70D18",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
};
