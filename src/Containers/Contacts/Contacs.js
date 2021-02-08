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
  Select,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "../../axiosInstance";
import Spinner from "../../Components/Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  buttonAction: {
    color: "white",
    backgroundColor: " rgb(173, 173, 173)",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  gridListItem: {
    width: "100%",
    backgroundColor: "#f7f7f7",
    marginBottom: theme.spacing(2),
    // marginLeft:theme.spacing(2),
    // marginRight:theme.spacing(2),
  },
}));

const Contactos = (props) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

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
      .get("/Contact")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setContacts(res.data.data);
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
        setLoading(false);
        console.log(e);
        // setLoading(false);
      });
  }, []);

  const handlePagination = (e) => {
    console.log("safwdsfgasgagaw", e);
    setLoading(true);
    axios
      .get(`/Contact/?pageNumber=${e.page}`)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setContacts(res.data.data);
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

  const columns = [
    { field: "id", headerName: "Index" },
    { field: "contactName", headerName: "Contact Name" },
    { field: "phone", headerName: "Phone" },
    { field: "birthDate", headerName: "Birthdate" },
    { field: "type", headerName: "Contact Type" },
  ];

  const rows = contacts.map((el, index) => {
    return {
      id: index,
      contactName: el.name,
      phone: el.phone,
      birthDate: el.birthDate,
      type: el.type.name,
    };
  });

  console.log(rows);

  return (
    <Grid container justify="center">
      <Grid item xs={12} container justify="flex-start"></Grid>
      <Grid item xs={12} sm={11}>
        <List>
          {loading ? (
            <Spinner />
          ) : (
            <Grid
              item
              container
              justify="center"
              className={classes.gridListItem}
            >
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pagination
                  pageSize={pageData.pageSize}
                  // page={pageData.pageNumber}
                  // paginationMode="server"
                  // onPageChange={(e) => handlePagination(e)}
                ></DataGrid>
              </div>
            </Grid>
          )}
        </List>
        {/* <Grid item container justify="center">
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
          disabled={pageData.pageNumber > pageData.totalPages}
          onClick={(e) => {
            handlePagination(e, true);
          }}
          >
          <ArrowForwardIos />
          </IconButton>
        </Grid> */}

        <Grid
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
              props.history.push("/reservations");
            }}
          >
            Reservation List
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contactos;
