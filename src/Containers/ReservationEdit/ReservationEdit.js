import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import SubBanner from "../../Components/SubBanner/SubBanner";

const useStyles = makeStyles((theme) => ({
  gridControls: {
    margin: theme.spacing(2),
  },
  formControl: {
    minWidth: 0,
    width: "100%",
    margin: theme.spacing(1),
  },

  buttomSend: {
    backgroundColor: "red",
    color: "white",
    margin: theme.spacing(2),
    position: "static",
    top: "90%",
    right: "10%",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  },
  buttonAction: {
    color: "white",
    marginBottom: "3%",
    backgroundColor: " rgb(173, 173, 173)",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  editor: {
    width: "99%",
    marginLeft: ".5%",
  },
  form: {
    width: "inherit",
  },
}));

const ReservationEdit = (props) => {
  const classes = useStyles();
  const [reservation, setReservation] = useState();
  const [allContactTypes, setAllContactTypes] = useState([]);
  const [del, setDel] = useState();

  useEffect(() => {
    const data = props.history.location.state.reservation;
    console.log(data);
    setReservation({
      reservationId: data.id,
      contactId: data.contact.id,
      date: data.date,
      title: data.title,
      description: data.description,
      isFavorite: data.isFavorite,
      ranking: data.ranking,
      contact: data.contact,
    });
    axios
      .get("/contactType")
      .then((resp) => {
        console.log(resp);
        setAllContactTypes(resp.data);
        let current = null;
        resp.data.forEach((el) => {
          if (el.id === data.contact.typeId) {
            current = el.name;
          }
        });
        formick.setValues({
          ...formick.values,
          contactName: data.contact.name,
          contactTypeId: data.contact.typeId,
          phone: data.contact.phone,
          birthday: data.contact.birthDate,
          contactId: data.contact.id,
          date: data.date,
          description: data.description,
          reservationId: data.id,
          title: data.title,
          contactType: current,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  console.log(allContactTypes);
  const validationSchema = Yup.object({
    contactName: Yup.string().max(10, "10 characters max").required("Required"),
    contactType: Yup.string().required("Required"),
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
      title: " ",
      contactTypeId: " ",
      loading: false,
      block: true,
    },
    validationSchema: validationSchema,
    isInitialValid: true,
    onSubmit: (values) => {
      let reservationUpd = null;
      reservationUpd = {
        id: reservation.reservationId,
        title: formick.values.title,
        description: formick.values.description,
        date: formick.values.date,
        creationDate: new Date().toISOString(),
        isFavorite: reservation.isFavorite,
        ranking: reservation.ranking,
      };

      if (formick.values.block) {
        reservationUpd = {
          ...reservationUpd,
          contactId: reservation.contactId,
        };

        updateReservation(reservationUpd);
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
        formick.setValues({ ...formick.values, loading: true });
        axios
          .post("/Contact", contact)
          .then((resp) => {
            reservationUpd = {
              ...reservationUpd,
              contactId: resp.data.id,
            };
            updateReservation(reservationUpd);
          })
          .catch((err) => {
            console.log(err.response.data);
            console.log("Check server validation errors");

            // console.log(resp);
          });
      }
    },

    // validateOnChange: true,
    // isInitialValid: true,
  });

  const updateReservation = (reservationUpd) => {
    formick.setValues({ ...formick.values, loading: true });
    console.log(reservationUpd);
    console.log(reservation.reservationId);
    axios
      .put(`/Reservation/${reservation.reservationId}`, reservationUpd)
      .then((resp) => {
        formick.setValues({ ...formick.values, loading: false });

        // setInputs({ ...inputs, loading: false, errors: false });
        // setOpen(true);
        props.history.push("/Reservations");
      })
      .catch((e) => {
        formick.setValues({ ...formick.values, loading: false });
        console.log(e.response);
        // setInputs({ ...inputs, loading: false, errors: true });
        // setOpen(true);

        console.log("Check server validation errors at reservation update");
      });
  };

  const handleChangeContactName = (e) => {
    // formick.setValues({...formick.values,})
    formick.setValues({
      ...formick.values,
      loading: true,
      block: false,
      contactName: e.target.value,
    });

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
          contactId: resp.data[0].id,
          phone: resp.data[0].phone,
          birthday: resp.data[0].birthDate,
          block: true,
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeViewButton = () => {
    props.history.push("/Reservations");
  };

  const handleDeleteClick = () => {
    formick.setValues({ ...formick.values, loading: true });

    axios
      .delete(`/reservation/${reservation.reservationId}`)
      .then((resp) => {
        props.history.replace("/reservation");
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <React.Fragment>
      <SubBanner
        nextAction="List Reservation"
        currentAction="Edit Reservation"
        handleChangeViewButton={handleChangeViewButton}
      />

      <Paper>
        <Grid container justify="center">
          {reservation && (
            <form className={classes.form} onSubmit={formick.handleSubmit}>
              <Grid item xs={12} sm={12} container justify="space-evenly">
                <Grid item xs={12} sm={4} container justify="flex-start">
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
                <Grid item container xs={12} sm={4} justify="center">
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="select-filled-label">
                      Contact Type
                    </InputLabel>
                    <Select
                      required
                      id="contactType"
                      name="contactType"
                      // value={inputs.contactType}
                      // onChange={handleChange}
                      variant="outlined"
                      disabled={formick.values.block}
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
                      helpertext={
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
                <Grid item xs={12} sm={4} container justify="flex-end">
                  <TextField
                    className={classes.formControl}
                    name="phone"
                    variant="outlined"
                    label="Phone"
                    disabled={formick.values.block}
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
                    disabled={formick.values.block}
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
                    value={
                      // formick.values.birthday
                      formick.values.birthday.split("T")[0]
                      // formick.values.block
                      //   ? formick.values.birthday &&
                      //     format(
                      //       new Date(formick.values.birthday),
                      //       "yyyy-MM-dd"
                      //     )
                      //   : formick.values.birthday
                    }
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

                <Grid item xs={12} container sm={5} justify="center">
                  <TextField
                    className={classes.formControl}
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
                <Grid item className={classes.editor} xs={12} md={12}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={reservation.description}
                    onReady={(editor) => {
                      //   editor.setData(reservation.description);

                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      formick.setValues({
                        ...formick.values,
                        description: data,
                      });
                      //   setInputs({ ...inputs, description: data });
                      // console.log( { event, editor, data } );
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      //   editor.setData(reservation.description);
                      console.log("Focus.", editor);
                    }}
                  ></CKEditor>
                  {/* </Paper> */}
                </Grid>
                {/* <Hidden xsDown> */}
                <Button
                  // disabled={!formick.isValid}
                  className={classes.buttomSend}
                  type="submit"
                >
                  Edit
                </Button>
                {/* </Hidden> */}
                {/* <Hidden xsDown> */}
                <Button
                  className={classes.buttomSend}
                  onClick={() => setDel(true)}
                >
                  Delete
                </Button>
                {del && (
                  <Dialog open={del} onClose={() => setDel(false)}>
                    <Grid container justify="center">
                      <Grid container item xs={12} justify="center">
                        <DialogTitle>
                          Are you sure this can't be undone
                        </DialogTitle>
                      </Grid>
                      <Grid container item xs={4} justify="flex-start">
                        <Button
                          className={classes.buttonAction}
                          color="secondary"
                          onClick={handleDeleteClick}
                        >
                          Yes,Delete
                        </Button>
                      </Grid>
                      <Grid container item xs={4} justify="flex-end">
                        <Button
                          className={classes.buttonAction}
                          color="secondary"
                          onClick={() => {
                            setDel(false);
                          }}
                        >
                          No,Wait!
                        </Button>
                      </Grid>
                    </Grid>
                  </Dialog>
                )}
                {/* </Hidden> */}
                {/* <Hidden smUp>
                  <Button
                    disabled={!formick.isValid}
                    className={classes.buttomSend}
                    style={{
                      width: "100%",
                    }}
                    type="submit"
                  >
                    Send
                  </Button>
                </Hidden> */}
              </Grid>
            </form>
          )}
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default ReservationEdit;
