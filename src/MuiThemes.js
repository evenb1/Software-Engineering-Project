import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#f2aeae",
      main: "#ef9a9a",
      dark: "#C18A8A",
      contrastText: "#112A46",
    },
    secondary: {
      light: "#ffe69b",
      main: "#ffe082",
      dark: "#b29c5b",
      contrastText: "#3B2B2B",
    },
  },
});

export default theme;
