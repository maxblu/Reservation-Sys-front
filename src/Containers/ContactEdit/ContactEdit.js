import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "../../axiosInstance";
import { format } from "date-fns";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
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
  editor: {
    width: "99%",
    marginLeft: ".5%",
  },
  form: {
    width: "inherit",
  },
}));

const ContactEdit = (props) => {
  const classes = useStyles();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [allContactTypes, setAllContactTypes] = useState();
  const [creation, setCreation] = useState();

  const [serverError, setServerError] = useState(false);
  const [original, setOriginal] = useState(
    props.history.location.state.contact.contactName
  );

  const validationSchema = Yup.object({
    contactName: Yup.string().max(10, "10 characters max").required("Required"),
    contactType: Yup.string().required("Required"),
    phone: Yup.string()
      .min(5, "That is not a valid phone number")
      .matches(phoneRegExp, "That is not a valid phone number"),
    birthday: Yup.date()
      .max(new Date(), "You are from the future get the reservations there!")
      .required("Required"),
  });

  const formick = useFormik({
    initialValues: {
      contactId: "",
      contactName: "",
      contactType: "",
      phone: "",
      birthday: "",
      loading: false,
      block: true,
    },
    onSubmit: (values) => {
      let current = null;
      allContactTypes.forEach((el) => {
        if (el.name === formick.values.contactType) {
          current = el.id;
        }
      });

      const contact = {
        id: formick.values.contactId,
        name: formick.values.contactName,
        phone: formick.values.phone,
        birthDate: formick.values.birthday,
        typeId: current,
      };

      axios
        .put(`/contact/${contact.id}`, contact)
        .then((resp) => {
          if (creation) {
            props.history.push("/reservation/create");
          } else {
            props.history.push("/contacts");
          }
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    validationSchema: validationSchema,
  });

  useEffect(() => {
    const data = props.history.location.state;
    setCreation(data.creation);

    axios
      .get("/contactType")
      .then((resp) => {
        setAllContactTypes(resp.data);
        if (data.creation) {
          formick.setValues({ ...formick.values, ...data.contact });
        } else {
          formick.setValues({
            ...formick.values,
            ...data.contact,
            contactType: data.contact.contactType.name,
          });

          // }
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const handleChangeContactName = (e) => {
    // formick.setValues({...formick.values,})
    formick.setValues({
      ...formick.values,
      loading: true,
      contactName: e.target.value,
    });
    if (e.target.value === original) {
      return;
    }

    axios
      .get(`/Contact/lookup?name=${e.target.value}`)
      .then((resp) => {
        if (resp.data[0].typeId) {
          formick.setErrors({
            ...formick.errors,
            contactName: "Already exist a contact with that name!",
          });

          setServerError("Already exist a contact with that name!");
        }

        //   setServerError("Already exist a contact with that name!")}
      })
      .catch((e) => {
        formick.setErrors({
          ...formick.errors,
          contactName: null,
        });
        setServerError(null);
        console.log(e.response);
      });
  };

  const handleChangeViewButton = (action) => {
    // console.log(props.history);
    props.history.goBack();
  };

  console.log(formick.values);
  console.log(serverError);
  return (
    <React.Fragment>
      <SubBanner
        nextAction="Go Back"
        currentAction="Edit Reservation"
        handleChangeViewButton={handleChangeViewButton}
      />
      <Paper>
        <Grid container justify="center">
          {allContactTypes && (
            <form className={classes.form} onSubmit={formick.handleSubmit}>
              <Grid item xs={12} sm={12} container justify="space-evenly">
                <Grid item xs={12} sm={3} container justify="flex-start">
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
                      (formick.touched.contactName &&
                        Boolean(formick.errors.contactName)) ||
                      (formick.touched.contactName && Boolean(serverError))
                    }
                    helperText={
                      (formick.touched.contactName &&
                        formick.errors.contactName) ||
                      (formick.touched.contactName && serverError)
                    }
                  />
                </Grid>
                <Grid item container xs={12} sm={3} justify="center">
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
                <Grid item xs={12} sm={3} container justify="flex-end">
                  <TextField
                    className={classes.formControl}
                    name="phone"
                    variant="outlined"
                    label="Phone"
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
                <Grid container item xs={12} sm={3} justify="flex-end">
                  <TextField
                    className={classes.formControl}
                    id="birthday"
                    name="birthday"
                    label="Birthday"
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
                      formick.values.birthday.split("T")[0]
                      //   formick.touched.birthday
                      // ? format(
                      //     new Date(
                      //       new Date(formick.values.birthday)
                      //         .toISOString()
                      //         .split("T")[0]
                      //     ),
                      //     "yyyy-MM-dd"
                      //   )
                      // : formick.values.birthday
                      //   first
                      //     ? format(
                      //         new Date(formick.values.birthday.split("T")[0]),
                      //         "yyyy-MM-dd"
                      //       )
                      //     : formick.values.birthday
                      // :
                      //   formick.touched.birthday
                      // ? formick.values.birthday
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
                <Hidden xsDown>
                  <Button
                    disabled={!formick.isValid}
                    className={classes.buttomSend}
                    type="submit"
                  >
                    Send
                  </Button>
                </Hidden>
                <Hidden smUp>
                  <Button
                    disabled={!formick.isValid}
                    className={classes.buttomSend}
                    style={{
                      width: "100%",
                    }}
                    type="submit"
                  >
                    Edit
                  </Button>
                </Hidden>
              </Grid>
            </form>
          )}
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default ContactEdit;
