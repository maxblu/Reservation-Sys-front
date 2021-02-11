import React, { useState } from "react";
import {
  Button,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  makeStyles,
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
              {props.currentAction}
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
                List Contacts
              </Button>
            </Grid>
            <Grid container item xs={6} justify="space-around">
              <Button
                name="edit"
                disabled={props.disabled}
                className={classes.buttonAction}
                onClick={() => props.handleChangeViewButton("edit")}
              >
                Edit Contact
              </Button>
            </Grid>
          </Hidden>
          {/* <Hidden mdUp>
            <Button
              className={classes.buttonAction}
              onClick={(e) => setDrawer(true)}
            >
              Aditional Actions
            </Button>
            <SwipeableDrawer
              anchor="top"
              open={drawer}
              onClose={(e) => setDrawer(false)}
              onOpen={(e) => setDrawer(true)}
            >
              <List>
                <ListItem
                  name="pepe"
                  onClick={(e) => props.handleChangeViewButton(e)}
                >
                  <Grid container justify="center">
                    <ListItemText>List Contacts</ListItemText>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container justify="center">
                    <Button
                      name="edit"
                      disabled={props.block}
                      className={classes.buttonAction}
                      onClick={(e) => props.handleChangeViewButton(e)}
                    >
                      Edit Contact
                    </Button>
                  </Grid>
                </ListItem>
              </List>
            </SwipeableDrawer>
          </Hidden> */}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SubBannerCreate;
