import {
  Button,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

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

const SubBanner = (props) => {
  const classes = useStyles();

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
          <Grid container item xs={12} sm={2} justify="center">
            <Typography variant="h5" color="error" align="left">
              {props.currentAction}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={7}
            justify="flex-end"
            style={{
              paddingLeft: "5%",
            }}
          >
            <Typography paragraph color="textSecondary" align="left">
              sashjdfoiwfghwa ef wefoijashf fwea fkwepfo waefpwefj p
              wergfqerwgsd fwejfpwesf fwe jfwejf fwejfp wjf fjwep fwfpwq wqefjwp
              fjf wef jwqpf{" "}
            </Typography>
          </Grid>
          <Hidden xsDown>
            <Grid container item xs={3} justify="flex-end">
              <Button
                className={classes.buttonAction}
                onClick={(e) => props.handleChangeViewButton(e)}
              >
                {props.nextAction}
              </Button>
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SubBanner;
