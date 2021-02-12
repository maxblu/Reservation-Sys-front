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
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";

import { formatDate } from "../../helpers/helpers";
import axios from "../../axiosInstance";

import StarRatingComponent from "react-star-rating-component";

import SubBanner from "../../Components/SubBanner/SubBanner";
import Spinner from "../../Components/Spinner/Spinner";

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
  },
  gridListItem: {
    width: "100%",
    backgroundColor: "#f7f7f7",
    marginBottom: theme.spacing(2),
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
  pagination: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
}));

/** 
Reservcvations component where reservations list are displayed
From there you can rating add favorite edit reservations. 


reservations manage the states for the reservations
loading for show the spinner on api calls
currentOrder for the order selction option
pageData is the  object that came from the api with the response
have info for easy pagination on server side

*/

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

  useEffect(() => {
    setLoading(true);

    axios
      .get("/Reservation")
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
        console.log(e);
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

  const handlePagination = (e, page) => {
    setLoading(true);
    axios
      .get(`/Reservation/?pageNumber=${page}`)
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
      })
      .catch((er) => console.log(er.response));
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

  return (
    <React.Fragment>
      <SubBanner
        t={props.t}
        nextAction="Create Reservation"
        currentAction="Reservation List"
        handleChangeViewButton={handleChangeViewButton}
      />
      <Paper>
        <Grid container justify="center">
          <Grid item xs={12} container justify="flex-start">
            <Hidden xsDown>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="select-filled-label">
                  {props.t("Sort by")}
                </InputLabel>
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
                <InputLabel id="select-filled-label">
                  {props.t("Sort by")}
                </InputLabel>
                <Select value={""} onChange={handleSort} variant="outlined">
                  <MenuItem value={"Date asc"}>
                    {" "}
                    {props.t("Date Ascending")}
                  </MenuItem>
                  <MenuItem value={"Date dsc"}>
                    {" "}
                    {props.t("Date Descending")}{" "}
                  </MenuItem>
                  <MenuItem value={"Title asc"}>
                    {props.t("Alphabetic Ascending")}
                  </MenuItem>
                  <MenuItem value={"Title dsc"}>
                    {props.t("Alphabetic Descending")}
                  </MenuItem>
                  <MenuItem value={"Ranking"}> {props.t("Ranking")} </MenuItem>
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

                        <Grid item xs={2} sm={3} container justify="flex-end">
                          <Button
                            className={classes.buttonAction}
                            onClick={(e) => handlerEdit(e, index)}
                          >
                            Edit
                          </Button>
                        </Grid>
                      </ListItem>
                    </Grid>
                  );
                })
              )}
            </List>
            <Grid
              item
              container
              justify="flex-start"
              className={classes.pagination}
            >
              <Pagination
                className={classes.pagination}
                count={pageData.totalPages}
                page={pageData.pageNumber}
                variant="outlined"
                onChange={handlePagination}
                shape="rounded"
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Reservations;
