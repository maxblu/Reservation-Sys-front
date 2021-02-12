import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import "react-datepicker/dist/react-datepicker.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "../../axiosInstance";
import Spinner from "../../Components/Spinner/Spinner";

import SubBannerCreate from "../../Components/SubBannerCreate/SubBannerCreate";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  gridControls: {
    margin: theme.spacing(2),
  },
  formControl: {
    minWidth: 0,
    width: "100%",
    margin: theme.spacing(1),
  },
  editor: {
    width: "99%",
    marginLeft: ".5%",
  },
  buttomSend: {
    backgroundColor: "red",
    color: "white",
    margin: theme.spacing(4),
    position: "static",
    top: "90%",
    right: "10%",
    width: "15%",

    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  },

  buttonAction: {
    color: "white",
    backgroundColor: " rgb(173, 173, 173)",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  form: {
    width: "inherit",
  },
}));

/**
 * Reservation form where you create new reservations and contacts
 * if they not exist. Manage forma validation with formick and server side
 * for the case that  contactName exist auto fill the realted fill that the database bring
 * Have to action beside create
 * Contant List and Edit Contact
 * In a movil this button are sustituted by one that display a top drower for the same actions.
 * The action of edit is only avalidable if you select a contact that is already in the databse
 * The contact list lead you to the List of all contacts
 */

const ReservationForm = (props) => {
  const [inputs, setInputs] = useState({
    contactName: "",
    contactId: "",
    contactType: "",
    phone: "",
    birthDate: "",
    date: "",
    description: "",
    title: "",
    block: false,
    errors: false,
    loading: false,
  });
  const [allContactTypes, setAllContactTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleOpenSnack = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get("/contactType")
      .then((resp) => {
        setAllContactTypes(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const saveReservation = (reservation) => {
    axios
      .post("/Reservation", reservation)
      .then((resp) => {
        setInputs({ ...inputs, loading: false, errors: false });
        setOpen(true);
        props.history.push("/Reservations");
      })
      .catch((e) => {
        setInputs({ ...inputs, loading: false, errors: true });
        setOpen(true);
      });
  };

  const handleChangeContactName = (e) => {
    setInputs({
      ...inputs,

      loading: true,
      block: false,
    });
    formick.setValues({ ...formick.values, contactName: e.target.value });
    axios
      .get(`/Contact/lookup?name=${e.target.value}`)
      .then((resp) => {
        let current = null;
        allContactTypes.forEach((el) => {
          if (el.id === resp.data[0].typeId) {
            current = el.name;
          }
        });

        formick.setValues({
          ...formick.values,
          contactName: resp.data[0].name,
          contactType: current,
          phone: resp.data[0].phone,
          birthday: resp.data[0].birthDate,
        });

        setInputs({
          ...inputs,
          contactId: resp.data[0].id,
          contactName: resp.data[0].name,
          contactType: current,
          phone: resp.data[0].phone,
          birthDate: new Date(resp.data[0].birthDate),
          block: true,
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    contactName: Yup.string().max(10, "10 characters max").required("Required"),
    contactType: Yup.string().required("Required"),
    title: Yup.string().max(15, "15 characters max").required("Required"),
    phone: Yup.string()
      .min(5, "That is not a valid phone number")
      .matches(phoneRegExp, "That is not a valid phone number"),
    birthday: Yup.date()
      .max(new Date(), "You are from the future get the reservations there!")
      .required("Required"),
    date: Yup.date()
      .min(new Date(), "You can't make a reservation in the past")
      .required("Required"),
  });

  const formick = useFormik({
    initialValues: {
      contactName: "",
      contactType: "",
      phone: "",
      birthday: "",
      date: "",
      description: "",
      title: "",
    },
    validationSchema: validationSchema,
    onReset: {
      contactName: "",
      contactType: "",
      phone: "",
      birthday: "",
      date: "",
      description: "",
    },
    onSubmit: (values) => {
      let reservation = null;

      if (inputs.block) {
        console.log(formick.values);
        reservation = {
          title: formick.values.title,
          description: formick.values.description,
          contactId: inputs.contactId,
          date: formick.values.date,
          creationDate: new Date(),
        };

        setInputs({ ...inputs, loading: true });
        saveReservation(reservation);
      } else {
        let current = null;

        allContactTypes.forEach((el) => {
          if (el.name === formick.values.contactType) {
            current = el.id;
          }
        });

        const contact = {
          name: formick.values.contactName,
          phone: formick.values.phone,
          typeId: current,
          birthDate: formick.values.birthday,
        };

        console.log(contact);
        setInputs({ ...inputs, loading: true });
        axios
          .post("/Contact", contact)
          .then((resp) => {
            const reservation = {
              title: formick.values.title,
              description: formick.values.description,
              date: formick.values.date,
              creationDate: new Date(),
              contactId: resp.data.id,
            };

            saveReservation(reservation);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    },
    validateOnChange: true,
    isInitialValid: false,
  });

  const handleChangeViewButton = (action) => {
    if (action === "edit") {
      props.history.push("/contact/edit", {
        contact: {
          contactId: inputs.contactId,
          contactName: formick.values.contactName,
          contactType: formick.values.contactType,
          phone: formick.values.phone,
          birthday: formick.values.birthday,
        },
        creation: true,
      });
    } else {
      props.history.replace("/contacts");
    }
  };

  console.log(formick);

  return (
    <React.Fragment>
      <SubBannerCreate
        disabled={!inputs.block}
        nextAction="List Reservation"
        currentAction="Create Reservation"
        handleChangeViewButton={handleChangeViewButton}
      />
      <Paper>
        <Grid container justify="center">
          <form onSubmit={() => formick.handleSubmit} className={classes.form}>
            {loading ? (
              <Spinner />
            ) : (
              <Grid item xs={12} sm={12} container justify="center">
                <Grid container item xs={12} sm={3} justify="flex-start">
                  <TextField
                    required
                    id="contactName"
                    className={classes.formControl}
                    variant="outlined"
                    name="contactName"
                    label="Contact Name"
                    onBlur={() => {
                      formick.setTouched({
                        ...formick.touched,
                        contactName: true,
                      });
                    }}
                    value={formick.values.contactName}
                    onChange={handleChangeContactName}
                    error={
                      formick.touched.contactName &&
                      Boolean(formick.errors.contactName)
                    }
                    helperText={
                      formick.touched.contactName && formick.errors.contactName
                    }
                  />
                </Grid>
                <Grid container item xs={12} sm={3} justify="center">
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="select-filled-label">
                      Contact Type
                    </InputLabel>
                    <Select
                      required
                      id="contactType"
                      name="contactType"
                      variant="outlined"
                      disabled={inputs.block}
                      value={formick.values.contactType}
                      onBlur={() => {
                        formick.setTouched({
                          ...formick.touched,
                          contactType: true,
                        });
                      }}
                      onChange={formick.handleChange}
                      error={
                        formick.touched.contactType &&
                        Boolean(formick.errors.contactType)
                      }
                      helperText={
                        formick.touched.contactType &&
                        formick.errors.contactType
                      }
                    >
                      {allContactTypes.map((elm) => {
                        return <MenuItem value={elm.name}>{elm.name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid container justify="flex-end" item xs={12} sm={3}>
                  <TextField
                    className={classes.formControl}
                    name="phone"
                    variant="outlined"
                    label="Phone"
                    disabled={inputs.block}
                    onBlur={() => {
                      formick.setTouched({ ...formick.touched, phone: true });
                    }}
                    value={formick.values.phone}
                    onChange={formick.handleChange}
                    error={
                      formick.touched.phone && Boolean(formick.errors.phone)
                    }
                    helperText={formick.touched.phone && formick.errors.phone}
                  />
                </Grid>
                <Grid container item xs={5} sm={5} justify="flex-end">
                  <TextField
                    className={classes.formControl}
                    id="birthday"
                    name="birthday"
                    label="Birthday"
                    disabled={inputs.block}
                    variant="outlined"
                    type="date"
                    required
                    onBlur={() => {
                      formick.setTouched({
                        ...formick.touched,
                        birthday: true,
                      });
                    }}
                    onChange={formick.handleChange}
                    value={formick.values.birthday.split("T")[0]}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={
                      formick.touched.birthday &&
                      Boolean(formick.errors.birthday)
                    }
                    helperText={
                      formick.touched.birthday && formick.errors.birthday
                    }
                  />
                </Grid>
                <Grid container item xs={5} sm={5} justify="flex-start">
                  <TextField
                    className={classes.formControl}
                    name="date"
                    id="date"
                    label="Date"
                    variant="outlined"
                    type="datetime-local"
                    required
                    onBlur={() => {
                      formick.setTouched({ ...formick.touched, date: true });
                    }}
                    onChange={formick.handleChange}
                    value={formick.values.date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={formick.touched.date && Boolean(formick.errors.date)}
                    helperText={formick.touched.date && formick.errors.date}
                  />
                </Grid>

                <Grid container justify="center" item xs={12} sm={3}>
                  <TextField
                    className={classes.formControl}
                    required
                    name="title"
                    variant="outlined"
                    label="Title"
                    onBlur={() => {
                      formick.setTouched({ ...formick.touched, title: true });
                    }}
                    value={formick.values.title}
                    onChange={formick.handleChange}
                    error={
                      formick.touched.title && Boolean(formick.errors.title)
                    }
                    helperText={formick.touched.title && formick.errors.title}
                  />
                </Grid>
              </Grid>
            )}
            <Grid item className={classes.editor} xs={12}>
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formick.setValues({ ...formick.values, description: data });
                  setInputs({ ...inputs, description: data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              ></CKEditor>
            </Grid>
            <Grid item xs={10} md={8}>
              <Snackbar open={open} autoHideDuration={5000}>
                {!inputs.errors ? (
                  <Alert severity="success">Reservation saved</Alert>
                ) : (
                  <Alert severity="error">Some errors</Alert>
                )}
              </Snackbar>
            </Grid>
            <Grid
              item
              container
              justify="flex-end"
              alignContent="space-around"
              xs={12}
            >
              <Hidden xsDown>
                <Button
                  className={classes.buttomSend}
                  type="submit"
                  onClick={formick.handleSubmit}
                >
                  Send
                </Button>
              </Hidden>
              <Hidden smUp>
                <Button
                  className={classes.buttomSend}
                  style={{
                    width: "100%",
                  }}
                  type="submit"
                  onClick={formick.handleSubmit}
                >
                  Send
                </Button>
              </Hidden>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default ReservationForm;
