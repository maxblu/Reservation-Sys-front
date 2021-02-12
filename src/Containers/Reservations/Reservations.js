import React, { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import StarRatingComponent from "react-star-rating-component";

import axios from "../../axiosInstance";
import { formatDate } from "../../helpers/helpers";

import Spinner from "../../Components/Spinner/Spinner";
import {
  ArrowBack,
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
  ArrowRight,
  Delete,
  Favorite,
} from "@material-ui/icons";
import SubBanner from "../../Components/SubBanner/SubBanner";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
    width: "30%",
  },
  formControlMovil: {
    margin: theme.spacing(4),
    minWidth: 120,
    width: "100%",
  },
  gridListItemMovil: {
    width: "100%",
    backgroundColor: "rgb(223, 223, 223)",
    marginBottom: theme.spacing(2),
    // marginLeft:theme.spacing(2),
  },
  gridListItem: {
    width: "100%",
    backgroundColor: "#f7f7f7",
    marginBottom: theme.spacing(2),
    // marginLeft:theme.spacing(2),
    // marginRight:theme.spacing(2),
  },
  activeFavorite: {
    color: "red",
    "&:hover": {
      color: "rgb(223, 223, 223)",
    },
  },
  disableFavorite: {
    color: "rgb(223, 223, 223)",
    "&:hover": {
      color: "red",
    },
  },
  favoriteText: {
    color: "black",
  },
  favoriteTextDisable: {
    color: "rgb(223, 223, 223)",
  },
  buttonAction: {
    color: "white",
    backgroundColor: " rgb(173, 173, 173)",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  buttonDelete: {
    color: "red",
    backgroundColor: "inherit",
  },
}));

const Reservations = (props) => {
  const classes = useStyles();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState("");
  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 5,
    firstPage: null,
    lastPage: null,
    totalPages: 0,
    totalRecords: 0,
    nextPage: null,
    previousPage: null,
  });

  console.log(pageData);
  console.log(reservations);

  useEffect(() => {
    setLoading(true);

    axios
      .get("/Reservation")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setReservations(res.data.data);
        setPageData({
          ...pageData,
          pageSize: res.data.pageSize,
          pageNumber: res.data.pageNumber,
          lastPage: res.data.lastPage,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
          nextPage: res.data.nextPage,
          previousPage: res.data.previousPage,
        });
      })
      .catch((e) => {
        console.log(e);
        // setLoading(false);
      });
  }, []);

  const handleSort = (e) => {
    console.log(e.target);
    const by = e.target.value.split(" ")[0];
    const sortOrder = e.target.value.split(" ")[1];

    setCurrentOrder(e.target.value);

    setLoading(true);
    axios
      .get(`/Reservation/?by=${by}&sortOrder=${sortOrder}`)
      .then((res) => {
        setLoading(false);
        setReservations(res.data.data);
        setPageData({
          ...pageData,
          pageSize: res.data.pageSize,
          pageNumber: res.data.pageNumber,
          lastPage: res.data.lastPage,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
          nextPage: res.data.nextPage,
          previousPage: res.data.previousPage,
        });
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  const handlePagination = (e, direct) => {
    setLoading(true);
    axios
      .get(
        `/Reservation/?pageNumber=${
          direct ? pageData.pageNumber + 1 : pageData.pageNumber - 1
        }`
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setReservations(res.data.data);
        setPageData({
          ...pageData,
          pageSize: res.data.pageSize,
          pageNumber: res.data.pageNumber,
          lastPage: res.data.lastPage,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
          nextPage: res.data.nextPage,
          previousPage: res.data.previousPage,
        });
      })
      .catch((e) => {
        console.log(e);
        // setLoading(false);
      });
  };

  const sendPutUpdate = (updatedData, index) => {
    const reservationToSend = {
      id: updatedData[index].id,
      title: updatedData[index].title,
      ranking: updatedData[index].ranking,
      contactId: updatedData[index].contactId,
      isFavorite: updatedData[index].isFavorite,
      description: updatedData[index].description,
      date: updatedData[index].date,
      creationDate: updatedData[index].creationDate,
    };

    axios
      .put(`/Reservation/${reservations[index].id}`, reservationToSend)
      .then((res) => {
        setReservations(updatedData);
        console.log("Change done!");
      })
      .catch((er) => console.log("error"));
  };

  const handleRatingChange = (nextV, prevV, index) => {
    const auxR = [...reservations];

    auxR[index].ranking = nextV;

    sendPutUpdate(auxR, index);
  };

  const handleFavoriteChange = (e, index) => {
    const auxR = [...reservations];
    console.log(index);

    auxR[index].isFavorite = !auxR[index].isFavorite;

    sendPutUpdate(auxR, index);
  };

  const handlerEdit = (e, index) => {
    props.history.push("/Reservation/edit", {
      reservation: reservations[index],
    });
  };

  const handleChangeViewButton = () => {
    props.history.push("/reservations/create");
  };

  console.log("Re render");
  return (
    <React.Fragment>
      <SubBanner
        nextAction="Create Reservation"
        currentAction="Reservation List"
        handleChangeViewButton={handleChangeViewButton}
      />
      <Paper>
        <Grid container justify="center">
          <Grid item xs={12} container justify="flex-start">
            <Hidden xsDown>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="select-filled-label">Sort by</InputLabel>
                <Select
                  name="sort"
                  value={currentOrder}
                  onChange={handleSort}
                  variant="outlined"
                >
                  <MenuItem value={"Date asc"}> Date Ascending </MenuItem>
                  <MenuItem value={"Date dsc"}> Date Descending </MenuItem>
                  <MenuItem value={"Title asc"}>
                    {" "}
                    Alphabetic Ascending{" "}
                  </MenuItem>
                  <MenuItem value={"Title dsc"}>
                    {" "}
                    Alphabetic Descending{" "}
                  </MenuItem>
                  <MenuItem value={"Ranking"}> Ranking </MenuItem>
                </Select>
              </FormControl>
            </Hidden>

            <Hidden smUp>
              <FormControl
                variant="filled"
                className={classes.formControlMovil}
              >
                <InputLabel id="select-filled-label">Sort By </InputLabel>
                <Select value={""} onChange={handleSort} variant="outlined">
                  <MenuItem value={"Date asc"}> Date Ascending </MenuItem>
                  <MenuItem value={"Date dsc"}> Date Descending </MenuItem>
                  <MenuItem value={"Title asc"}>
                    {" "}
                    Alphabetic Ascending{" "}
                  </MenuItem>
                  <MenuItem value={"Title dsc"}>
                    {" "}
                    Alphabetic Descending{" "}
                  </MenuItem>
                  <MenuItem value={"Ranking"}> Ranking </MenuItem>
                </Select>
              </FormControl>
              `
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={11}>
            <List>
              {loading ? (
                <Spinner />
              ) : (
                reservations.map((reser, index) => {
                  return (
                    <Grid
                      key={reser.id}
                      item
                      container
                      justify="center"
                      className={classes.gridListItem}
                    >
                      <ListItem>
                        <Grid item xs={5} sm={3} container justify="flex-start">
                          <ListItemText
                            primary={reser.title}
                            secondary={formatDate(reser.date)}
                          ></ListItemText>
                        </Grid>
                        <Hidden xsDown>
                          <Grid item sm={3} container justify="center">
                            <StarRatingComponent
                              name={index}
                              starCount={5}
                              value={reser.ranking}
                              onStarClick={(nextV, prevV) => {
                                handleRatingChange(nextV, prevV, index);
                              }}
                            />
                          </Grid>
                        </Hidden>
                        <Grid item xs={5} sm={3} container justify="center">
                          <IconButton
                            // className={
                            //   reser.isFavorite
                            //     ? classes.activeFavorite
                            //     : classes.disableFavorite
                            // }
                            onClick={(e) => handleFavoriteChange(e, index)}
                          >
                            <Typography
                              variant="caption"
                              className={
                                reser.isFavorite
                                  ? classes.favoriteText
                                  : classes.favoriteTextDisable
                              }
                            >
                              Add Favorites
                            </Typography>
                            <Favorite
                              className={
                                reser.isFavorite
                                  ? classes.activeFavorite
                                  : classes.disableFavorite
                              }
                            />
                          </IconButton>
                        </Grid>
                        {/* 
                        <Grid item xs={1} sm={3} container justify="flex-end">
                          <IconButton
                            size="small"
                            className={classes.buttonDelete}
                            onClick={(e) => handlerEdit(e, index)}
                          >
                            <Delete />
                          </IconButton>
                        </Grid> */}
                        <Grid item xs={2} sm={3} container justify="flex-end">
                          <Button
                            className={classes.buttonAction}
                            onClick={(e) => handlerEdit(e, index)}
                          >
                            Editar
                          </Button>
                        </Grid>
                      </ListItem>
                    </Grid>
                  );
                })
              )}
            </List>
            <Grid item container justify="center">
              <IconButton
                disabled={pageData.pageNumber <= 1}
                onClick={(e) => {
                  handlePagination(e, false);
                }}
              >
                <ArrowBackIos />
              </IconButton>
              <ListItemText primary={pageData.pageNumber} />
              <IconButton
                disabled={pageData.pageNumber >= pageData.totalPages}
                onClick={(e) => {
                  handlePagination(e, true);
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Grid>

            {/* <Grid
              item
              container
              justify="space-around"
              style={{
                paddingBottom: "5%",
                paddingTop: "5%",
              }}
            >
              <Button
                className={classes.buttonAction}
                onClick={(e) => {
                  props.history.push("/contacts");
                }}
              >
                Contact List
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Reservations;
