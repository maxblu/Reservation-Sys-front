import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Menu,
  Select,
  TextField,
} from "@material-ui/core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  useEffect(() => {
    const data = props.history.location.state.reservation;
    formick.setValues({
      ...formick.values,
      contactName: data.contact.name,
      contactTypeId: data.contact.typeId,
      phone: data.contact.phone,
      birthday: data.contact.birthDate,
    });
    setReservation(props.history.location.state.reservation);
    axios
      .get("/contactType")
      .then((resp) => {
        console.log(resp);
        setAllContactTypes(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  console.log(reservation);
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
      block: false,
    },
    validationSchema: validationSchema,
    onReset: {
      contactName: "",
      contactType: "",
      phone: "",
      birthday: "",
      date: "",
      description: "",
      title: " ",
      contactTypeId: " ",
      loading: false,
    },
    onSubmit: (values) => {
      // let reservation = null;
      // if (inputs.block) {
      //   reservation = {
      //     title: formick.values.title,
      //     description: formick.values.description,
      //     contactId: inputs.contactId,
      //     date: formick.values.date,
      //     creationDate: new Date(),
      //   };
      //   setInputs({ ...inputs, loading: true });
      //   saveReservation(reservation);
      // } else {
      //   let current = null;
      //   allContactTypes.forEach((el) => {
      //     if (el.name === formick.values.contactType) {
      //       current = el.id;
      //     }
      //   });
      //   const contact = {
      //     name: formick.values.contactName,
      //     phone: formick.values.phone,
      //     typeId: current,
      //     birthDate: formick.values.birthday,
      //   };
      //   console.log(contact);
      //   setInputs({ ...inputs, loading: true });
      //   axios
      //     .post("/Contact", contact)
      //     .then((resp) => {
      //       const reservation = {
      //         title: formick.values.title,
      //         description: formick.values.description,
      //         date: formick.values.date,
      //         creationDate: new Date(),
      //         contactId: resp.data.id,
      //       };
      //       saveReservation(reservation);
      //     })
      //     .catch((err) => {
      //       console.log(err.response.data);
      //       // console.log(resp);
      //     });
      // }
    },
    validateOnChange: true,
    isInitialValid: true,
  });

  // const saveReservation = (reservation) => {
  //   axios
  //     .post("/Reservation", reservation)
  //     .then((resp) => {
  //       setInputs({ ...inputs, loading: false, errors: false });
  //       setOpen(true);
  //       props.history.push("/Reservations");
  //     })
  //     .catch((e) => {
  //       setInputs({ ...inputs, loading: false, errors: true });
  //       setOpen(true);

  //       // console.log("Check server validation errors");
  //     });
  // };

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

  return (
    <Grid justify="center">
      {reservation && (
        <form className={classes.form}>
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
                  formick.setTouched({ ...formick.touched, contactName: true });
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
                <InputLabel id="select-filled-label">Contact Type</InputLabel>
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
                  helperText={
                    formick.touched.contactType && formick.errors.contactType
                  }
                >
                  {allContactTypes.map((elm) => {
                    return (
                      <Menu key={elm.name} value={elm.name}>
                        {elm.name}
                      </Menu>
                    );
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
                error={formick.touched.phone && Boolean(formick.errors.phone)}
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
                  formick.setTouched({ ...formick.touched, birthday: true });
                }}
                onChange={formick.handleChange}
                value={formick.values.birthday}
                InputLabelProps={{
                  shrink: true,
                }}
                error={
                  formick.touched.birthday && Boolean(formick.errors.birthday)
                }
                helperText={formick.touched.birthday && formick.errors.birthday}
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
                error={formick.touched.title && Boolean(formick.errors.title)}
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
          </Grid>
        </form>
      )}
    </Grid>
  );
};

export default ReservationEdit;
