import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Paper,
  Typography,
  makeStyles,
  Grid,
  Hidden,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  mainBanner: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    paddingTop: "5%",
  },
  titleGrid: {
    paddingLeft: "1%",
    textAlign: "center",
    marginBottom: "4%",
    fontWeight: "bolder",
  },
  titleGridSecond: {
    textAlign: "left",
    marginBottom: "4%",
    fontWeight: "lighter",
    fontFamily: "revert",
  },
  subName: {
    fontWeight: theme.typography.fontWeightLight,
  },
  button: {
    color: "white",
    textAlign: "rigth",
    fontSize: "small",
    marginBottom: "4%",
    marginLeft: "50%",
  },
  subHeader: {
    width: "100%",

    //  textAlign:"center"
  },
  subHeaderMovil: {
    width: "100%",
  },
  contentSubHeader: {
    width: "75%",
    textAlign: "center",
    padding: "2%",
    marginLeft: "12.5%",
  },
  content: {
    width: "75%",

    //  textAlign:"center"
  },
  contentMovil: {
    width: "95%",
  },

  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  buttonAction: {
    color: "white",
    backgroundColor: " rgb(173, 173, 173)",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  navigation: {
    marginBottom: "4%",
  },
}));

/*
Layoout to wrap the app. The contains navigation for mocil version.
Is the main Banner with de ISUcorp 

*/

const Layout = (props) => {
  const classes = useStyles();
  const history = useHistory();
  // const [currentAction, setCurrentAction] = useState("Create Reservations");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangeViewButton = (action) => {
    setMenuOpen(false);
    switch (action) {
      case "Create Reservation":
        history.replace("/reservations/create");

        console.log("entre");
        break;
      case "Create Contact":
        history.replace("/contacts/create");

        break;
      case "Reservations List":
        history.replace("/reservations");

        break;
      case "Contacts List":
        history.replace("/contacts");

        break;
      default:
        console.log("Default");
        break;
    }
  };

  const handleClick = (e) => {
    setAnchorEl(e.target);
    setMenuOpen(true);
  };

  return (
    <React.Fragment>
      <Paper className={classes.mainBanner}>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          alignContent="flex-start"
        >
          <Hidden xsDown>
            <Grid
              item
              container
              sm={3}
              md={3}
              lg={4}
              justify="flex-end"
              className={classes.titleGrid}
            >
              <Typography variant="h1" gutterBottom>
                ISU
              </Typography>
            </Grid>
            <Grid
              item
              container
              sm={3}
              md={2}
              lg={2}
              justify="flex-start"
              className={classes.titleGridSecond}
            >
              <Typography
                variant="h1"
                gutterBottom
                style={{
                  fontWeight: "lighter",
                  fontFamily: "revert",
                }}
              >
                Corp
              </Typography>
            </Grid>
          </Hidden>

          <Hidden smUp>
            <Grid
              container
              item
              xs={2}
              justify="flex-end"
              className={classes.titleGrid}
            >
              <Typography variant="h5" gutterBottom>
                ISU
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={2}
              justify="flex-start"
              className={classes.titleGridSecond}
            >
              <Typography
                variant="h5"
                style={{
                  fontWeight: "lighter",
                  fontFamily: "revert",
                }}
                gutterBottom
              >
                Corp
              </Typography>
            </Grid>
          </Hidden>
          <Hidden xsDown>
            <Grid
              sm={5}
              md={7}
              lg={4}
              item
              container
              justify="flex-start"
              className={classes.titleGrid}
            >
              <Typography
                variant="h6"
                style={{
                  textAlign: "left",
                }}
              >
                World Class <br /> Software Development{" "}
              </Typography>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid
              item
              xs={6}
              className={classes.navigation}
              container
              justify="flex-end"
            >
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                edge="end"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
              >
                <MenuItem
                  onClick={() => handleChangeViewButton("Reservations List")}
                >
                  Reservation List
                </MenuItem>
                <MenuItem
                  onClick={() => handleChangeViewButton("Contacts List")}
                >
                  Contact List
                </MenuItem>
                <MenuItem
                  onClick={() => handleChangeViewButton("Create Reservation")}
                >
                  Create Reservation
                </MenuItem>
              </Menu>
            </Grid>
          </Hidden>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>

      <Grid
        container
        item
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Hidden xsDown>
          <Grid className={classes.content}>{props.children}</Grid>
        </Hidden>
        <Hidden smUp>
          <Grid className={classes.contentMovil}>{props.children}</Grid>
        </Hidden>
      </Grid>
    </React.Fragment>
  );
};

export default Layout;
