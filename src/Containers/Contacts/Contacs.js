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
import { formatDate } from "../../helpers/helpers";
import { format } from "date-fns";

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
  // const [page, setPage] = React.useState(1);

  const classes = useStyles();

  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 2,
    firstPage: null,
    lastPage: null,
    totalPages: 0,
    totalRecords: 0,
    nextPage: null,
    previousPage: null,
  });

  useEffect(() => {
    setLoading(true);
    // console.log("Llame a esto");

    axios
      .get(
        `/Contact/?pageNumber=${pageData.pageNumber}&pageSize=${pageData.pageSize}`
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setContacts(res.data.data);
        setPageData({
          ...pageData,
          lastPage: res.data.lastPage,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
          nextPage: res.data.nextPage,
          previousPage: res.data.previousPage,
        });
      })
      .catch((e) => {
        setLoading(false);
        console.log("ERROR", e);
        // setLoading(false);
      });
  }, [pageData.pageNumber, pageData.pageSize]);

  const handlePage = (params) => {
    setPageData({
      ...pageData,
      pageNumber: params.page,
    });
  };
  // React.useEffect(() => {
  //   let active = true;

  //   (async () => {
  //     setLoading(true);
  //     const newRows = await loadServerRows(page, data);

  //     if (!active) {
  //       return;
  //     }

  //     setRows(newRows);
  //     setLoading(false);
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [page, data]);

  // const handlePagination = (params) => {
  //   // console.log("safwdsfgasgagaw", e);

  //   axios
  //     .get(`/Contact/?pageNumber=${params.page}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setContacts(res.data.data);
  //       setPageData({
  //         ...pageData,
  //         pageSize: res.data.pageSize,
  //         pageNumber: res.data.pageNumber,
  //         lastPage: res.data.lastPage,
  //         totalPages: res.data.totalPages,
  //         totalRecords: res.data.totalRecords,
  //         nextPage: res.data.nextPage,
  //         previousPage: res.data.previousPage,
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       // setLoading(false);
  //     });
  // };

  console.log(pageData.totalRecords);
  const columns = [
    { field: "id", hide: true, headerName: "Index" },
    { field: "contactName", headerName: "Contact Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "birthDate", headerName: "Birthdate", flex: 1 },
    { field: "type", headerName: "Contact Type", flex: 1 },
  ];

  const rows = contacts.map((el, index) => {
    return {
      id: index,
      contactName: el.name,
      phone: el.phone,
      birthDate: format(new Date(el.birthDate), "MM/dd/yyyy"),
      type: el.type.name,
    };
  });

  console.log(rows);

  return (
    <Grid container justify="center">
      <Grid item xs={12} container justify="flex-start"></Grid>
      <Grid item xs={12} sm={11}>
        <List>
          <Grid
            item
            container
            justify="center"
            className={classes.gridListItem}
          >
            <Grid item xs={12} sm={12} style={{ height: 400 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pagination={true}
                rowCount={pageData.totalRecords}
                pageSize={pageData.pageSize}
                page={pageData.pageNumber}
                rowsPerPageOptions={[2, 4, 5]}
                onPageSizeChange={(params) => {
                  setPageData({ ...pageData, pageSize: params.pageSize });
                }}
                paginationMode="server"
                onPageChange={handlePage}
                // loading={loading}
              ></DataGrid>
            </Grid>
          </Grid>
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
