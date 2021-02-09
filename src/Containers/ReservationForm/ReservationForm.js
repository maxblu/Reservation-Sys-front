import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
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
import { Form, useFormik } from "formik";
import * as Yup from "yup";

import axios from "../../axiosInstance";
import Spinner from "../../Components/Spinner/Spinner";

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
    height: "50%",
    width: "75%",
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
}));

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
  // const [errors, setErrors] = useState({
  //   contactName: {
  //     touch: false,
  //     error: false,
  //     eroorMsg: "",
  //   },
  //   contactType: {
  //     touch: false,
  //     error: false,
  //     eroorMsg: "",
  //   },
  //   phone: {
  //     touch: false,
  //     error: false,
  //     eroorMsg: "",
  //   },
  //   birthDate: {
  //     touch: false,
  //     error: false,
  //     eroorMsg: "",
  //   },
  //   date: {
  //     touch: false,
  //     error: false,
  //     eroorMsg: "",
  //   },
  //   title: {
  //     touch: false,
  //     error: false,
  //     eroorMsg: "",
  //   },
  // });
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleOpenSnack = () => {
    setOpen(true);
  };

  const ExampleCustomInput = ({ value, onClick, tipo, block }) => (
    <TextField
      required
      error
      helperText
      label={tipo}
      variant="outlined"
      value={value}
      disabled={block}
      onClick={onClick}
    ></TextField>
  );

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

  useEffect(() => {}, [loading]);

  console.log(inputs);

  // const handleSave = (values) => {
  //   let reservation = null;

  //   if (inputs.block) {
  //     reservation = {
  //       title: formick.,
  //       description: inputs.description,
  //       contactId: inputs.contactId,
  //       date: inputs.date,
  //       creationDate: new Date(),
  //     };

  //     setInputs({ ...inputs, loading: true });
  //     saveReservation(reservation);
  //   } else {
  //     let current = null;
  //     allContactTypes.forEach((el) => {
  //       if (el.name === inputs.contactType) {
  //         current = el.id;
  //       }
  //     });

  //     const contact = {
  //       name: inputs.contactName,
  //       phone: inputs.phone,
  //       typeId: current,
  //       birthDate: inputs.birthDate,
  //     };
  //     console.log(contact);

  //     setInputs({ ...inputs, loading: true });
  //     axios
  //       .post("/Contact", contact)
  //       .then((resp) => {
  //         const reservation = {
  //           title: inputs.title,
  //           description: inputs.description,
  //           contactId: resp.data.id,
  //           date: inputs.date,
  //           creationDate: new Date(),
  //         };

  //         saveReservation(reservation);
  //       })
  //       .catch((err) => {
  //         console.log(err.response.data);
  //         // console.log(resp);
  //       });
  //   }
  // };

  const saveReservation = (reservation) => {
    axios
      .post("/Reservation", reservation)
      .then((resp) => {
        setInputs({ ...inputs, loading: false, errors: false });
        setOpen(true);
      })
      .catch((e) => {
        setInputs({ ...inputs, loading: false, errors: true });
        setOpen(true);

        // console.log("Check server validation errors");
      });
  };

  const handleChangeContactName = (e) => {
    // formick.setValues({...formick.values,})
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
    },
    validationSchema: validationSchema,
    onReset: {
      contactName: "",
      contactType: "",
      phone: "",
      birthday: new Date(),
      date: new Date(),
      description: "",
    },
    onSubmit: (values) => {
      let reservation = null;

      if (inputs.block) {
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
          if (el.name === inputs.contactType) {
            current = el.id;
          }
        });

        const contact = {
          name: formick.values.contactName,
          phone: formick.values.phone,
          typeId: current,
          birthDate: formick.values.birthday,
        };

        setInputs({ ...inputs, loading: true });
        axios
          .post("/Contact", contact)
          .then((resp) => {
            const reservation = {
              title: formick.values.title,
              description: formick.values.description,
              contactId: inputs.contactId,
              date: formick.values.date,
              creationDate: new Date(),
              contactId: resp.data.id,
              creationDate: new Date(),
            };

            saveReservation(reservation);
          })
          .catch((err) => {
            console.log(err.response.data);
            // console.log(resp);
          });
      }
    },
    validateOnChange: true,
    isInitialValid: true,
  });
  console.log(formick);
  return (
    <Grid container justify="center">
      <form onSubmit={() => formick.handleSubmit}>
        {loading ? (
          <Spinner />
        ) : (
          // <Form>
          <Grid item xs={12} sm={12} container justify="space-evenly">
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="contactName"
                className={classes.formControl}
                variant="outlined"
                name="contactName"
                label="Contact Name"
                // error={true}
                // value={fo}
                // helperText={"fgaf"}
                // onChange={handleChange}
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
            <Grid item xs={12} sm={3}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="select-filled-label">Contact Type</InputLabel>
                <Select
                  required
                  id="contactType"
                  name="contactType"
                  // value={inputs.contactType}
                  // onChange={handleChange}
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
                    formick.touched.contactType && formick.errors.contactType
                  }
                >
                  {allContactTypes.map((elm) => {
                    return <MenuItem value={elm.name}>{elm.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className={classes.formControl}
                name="phone"
                variant="outlined"
                label="Phone"
                disabled={inputs.block}
                // value={inputs.phone}
                // onChange={handleChange}
                onBlur={() => {
                  formick.setTouched({ ...formick.touched, phone: true });
                }}
                value={formick.values.phone}
                onChange={formick.handleChange}
                error={formick.touched.phone && Boolean(formick.errors.phone)}
                helperText={formick.touched.phone && formick.errors.phone}
              />
            </Grid>
            <Grid container item xs={5} sm={5}>
              <TextField
                className={classes.formControl}
                id="birthday"
                name="birthday"
                label="Birthday"
                disabled={inputs.block}
                variant="outlined"
                type="date"
                required
                defaultValue="2017-05-24"
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
            <Grid container item xs={5} sm={5}>
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

            <Grid item xs={12} sm={3}>
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
          </Grid>
          // </Form>
        )}
        <Grid item className={classes.editor} xs={12}>
          {/* <Paper > */}

          <CKEditor
            editor={ClassicEditor}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setInputs({ ...inputs, description: data });
              // console.log( { event, editor, data } );
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          ></CKEditor>
          {/* </Paper> */}
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
          {/* <Button className={classes.buttomSend} onClick={handleSave}>
            Send
          </Button> */}
          <Button
            disabled={!formick.isValid}
            className={classes.buttomSend}
            type="submit"
            onClick={formick.handleSubmit}
          >
            Send
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default ReservationForm;
