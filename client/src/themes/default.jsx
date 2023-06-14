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
      blue: "#345995",
      mint: "#03cea4",
      razzmatazz: "#E40066",
      saffron: "#eac435",
      tomato: "#fb4d3d",
    },
    secondary: {
      black: "#000000",
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
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#e40066",
          "&:hover": {
            backgroundColor: "#345995",
          },
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
