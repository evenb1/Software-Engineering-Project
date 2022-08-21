import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { mainListItems } from "./listItems";
import * as routes from "../constants/routes";

import Orders from '../dashboard/Orders'
import UsersList from "../dashboard/UsersList";
import LogoutIcon from "@mui/icons-material/Logout";
import AddUser from "../dashboard/AddUser";
import Addstock from "../dashboard/AddStock";
import StocksList from "../dashboard/Stock";
import AddOrder from "../dashboard/AddOrder";
import AddPayment from "../dashboard/AddPayment";
import theme from "../MuiThemes";
import SignOutButton from "./SignOut";



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const mdTheme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#000000",
      dark: "#C18A8A",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffe69b",
      main: "#ffe082",
      dark: "#b29c5b",
      contrastText: "#3B2B2B",
    },
  },
});

function DashboardContent() {
  
  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box>
        <CssBaseline />
        <AppBar elevation={1} position="fixed" open={true}>
          <Toolbar
            sx={{
              // keep right padding when drawer closed
              // backgroundColor: "#ef9a9a",
              color: "#ffffff",
            }}
          >
            {/* <Link to={routes.LANDING}>
              <IconButton
                color="inherit"
                sx={{
                  color:'#ffffff'
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Link> */}

            <Typography
              component="h1"
              variant="h5"
              color="#ffffff"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Staff Dashboard
            </Typography>
            <IconButton color="inherit">
              <SignOutButton/>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: "#EFEFEF",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{ mt: 4, mb: 4, backgroundColor: "#EFEFEF" }}
          >
            <Grid container spacing={3}>
             
              
              
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <AddPayment />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Addstock />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <StocksList />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <AddOrder />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <UsersList />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <AddUser />
                </Paper>
              </Grid>
            </Grid>
          
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function StaffDashboard() {
  return <DashboardContent />;
}
