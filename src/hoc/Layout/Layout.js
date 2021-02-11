import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Paper,
  Typography,
  makeStyles,
  Grid,
  Hidden,
  withStyles,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import "./Layout.css";

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
}));

const MySubTypography = withStyles({
  h1: {
    fontWeight: "lighter",
  },
})(Typography);

const Layout = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [currentAction, setCurrentAction] = useState("Create Reservations");
  // const [currentPath, setcurrentPath] = useState('/');

  useEffect(() => {
    console.log("I'm in: ", history.location.pathname);

    switch (history.location.pathname) {
      case "/reservations":
        setCurrentAction("Create Reservations");
        break;
      case "/reservations/create":
        setCurrentAction("Reservation List");
        break;
      case "/reservation/edit":
        setCurrentAction("Reservation List");
        break;
      case "/contacts":
        setCurrentAction("Create Contact");
        break;
      case "/contacts/create":
        setCurrentAction("Contacts List");
        break;

      default:
        break;
    }

    // setcurrentPath(history.location.pathname)
  }, [history]);

  console.log(history);

  const handleChangeViewButton = () => {
    switch (currentAction) {
      case "Create Reservations":
        history.push("/reservations/create");
        setCurrentAction("Reservation List");
        console.log("entre");
        break;
      case "Create Contact":
        history.push("/contacts/create");
        setCurrentAction("Contacts List");
        break;
      case "Reservation List":
        history.push("/reservations");
        setCurrentAction("Create Reservations");
        break;
      case "Contacts List":
        history.push("/contacts");
        setCurrentAction("Create Contact");
        break;
      default:
        console.log("Default");
        break;
    }
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
              sm={7}
              md={5}
              lg={4}
              justify="flex-end"
              className={classes.titleGrid}
            >
              <Typography variant="h1" gutterBottom>
                ISU Corp
              </Typography>
            </Grid>
          </Hidden>

          <Hidden smUp>
            <Grid
              container
              item
              xs={5}
              justify="center"
              className={classes.titleGrid}
            >
              <Typography variant="h6" gutterBottom>
                ISU Corp
              </Typography>
            </Grid>
          </Hidden>
          <Hidden xsDown>
            <Grid
              sm={5}
              md={7}
              lg={5}
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
            <Grid item xs={6} container justify="flex-end">
              <Button
                className={classes.button}
                onClick={handleChangeViewButton}
              >
                <Typography variant="caption">{currentAction}</Typography>
                <ArrowRight />
              </Button>
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
