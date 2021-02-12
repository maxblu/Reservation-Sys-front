import React, { useState } from "react";
import {
  Button,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  subBanner: {
    marginBottom: "3%",
  },
  buttonAction: {
    color: "white",
    backgroundColor: " rgb(173, 173, 173)",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

const SubBannerCreate = (props) => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (e, value) => {
    console.log(e);
  };

  return (
    <Grid
      container
      item
      justify="center"
      alignContent="center"
      alignItems="center"
      className={classes.subBanner}
    >
      <Paper className={classes.subHeader} elevation={0}>
        <Grid
          container
          justify="center"
          alignContent="center"
          alignItems="center"
          className={classes.contentSubHeader}
        >
          <Grid container item xs={12} sm={4} justify="flex-start">
            <Typography variant="h5" color="error" align="left">
              {props.t(props.currentAction)}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={8}
            justify="center"
            // style={{
            //   paddingLeft: "5%",
            // }}
          >
            <Typography paragraph color="textSecondary" align="left">
              sashjdfoiwfghwa ef wefoijashf fwea fkwepfo waefpwefj p
              wergfqerwgsd fwejfpwesf fwe
            </Typography>
          </Grid>
          <Hidden xsDown>
            <Grid container item xs={6} justify="space-around">
              <Button
                name="list"
                className={classes.buttonAction}
                onClick={(e) => props.handleChangeViewButton("list")}
              >
                {props.t("List Contacts")}
              </Button>
            </Grid>
            <Grid container item xs={6} justify="space-around">
              <Button
                name="edit"
                disabled={props.disabled}
                className={classes.buttonAction}
                onClick={() => props.handleChangeViewButton("edit")}
              >
                {props.t("Edit Contact")}
              </Button>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Button
              className={classes.buttonAction}
              onClick={(e) => setDrawer(true)}
            >
              {props.t("Aditional Actions")}
            </Button>
            <SwipeableDrawer
              anchor="top"
              open={drawer}
              onClose={(e) => setDrawer(false)}
              onOpen={(e) => setDrawer(true)}
            >
              <MenuItem
                name="list"
                onClick={(e) => props.handleChangeViewButton("list")}
              >
                {props.t("List Contacts")}
              </MenuItem>
              <MenuItem
                name="edit"
                disabled={props.disabled}
                onClick={(e) => props.handleChangeViewButton("edit")}
              >
                {props.t("Edit Current Contact")}
              </MenuItem>
            </SwipeableDrawer>
          </Hidden>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SubBannerCreate;
