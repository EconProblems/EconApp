import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    contrastThreshold: 4.5,
    primary: {
      dark: "#345995",
      main: "#E40066",
      light: "#eac435"
    },
    secondary: {
      dark: "#fb4d3d",
      main: "#03cea4"
    },
    background: {
      default: "#ffffff",
      secondary: "#eac435",
    },
    text: {
      primary: "#000000",
    },
    error: {
      main: "#fb4d3d",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontFamily2: "Open Sans, sans-serif",
    fontSize: 16,
    h1: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10,
      },
      fontWeight: 700,
      lineHeight: "calc(150%)",
      color: "#03cea4"
    },
    h2: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10,
      },
      fontWeight: 700,
      lineHeight: "calc(150%)",
      color: "#E40066"
    },
    h3: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10,
      },
      fontWeight: 700,
      lineHeight: "calc(150%)",
      color: "#345995"
    },
    h4: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10,
      },
      fontWeight: 700,
      lineHeight: "calc(150%)",
    },
    h5: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10,
      },
      fontWeight: 700,
      lineHeight: "calc(150%)",
    },
    bodyText: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10,
      },
      fontWeight: 400,
      lineHeight: "calc(150%)",
    },
    bodyText2: {
      fontFamily: "fontFamily2",
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10,
      },
      fontWeight: 400,
      lineHeight: "calc(150%)",
      color: "#345995"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#e40066",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#345995",
          },
          textTransform: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
        paper: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
