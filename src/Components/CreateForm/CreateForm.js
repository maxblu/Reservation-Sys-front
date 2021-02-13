import React, { useEffect } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";

import * as actions from "../../store/actions";

const CreateForm = (props) => {
  const contactTypes = useSelector((state) => state.contactTypes, shallowEqual);
  const currentContactType = useSelector((state) => state.typeName);
  const dispatch = useDispatch();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    contactName: Yup.string().max(10, "10 characters max").required("Required"),
    contactTypeName: Yup.string().required("Required"),
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
      contactTypeName: "",
      phone: "",
      birthday: "",
      date: "",
      description: "",
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: {},
  });

  useEffect(() => {
    const data = props.loaction.state;

    if (data) {
      dispatch(actions.getContactTypes(data.contact.typeId));
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
      });
    } else {
      dispatch(actions.getContactTypes());
    }
  }, []);

  return (
    <form>
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
              formick.touched.contactName && Boolean(formick.errors.contactName)
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
              helpertext={
                formick.touched.contactType && formick.errors.contactType
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
            error={formick.touched.birthday && Boolean(formick.errors.birthday)}
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
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              formick.setValues({
                ...formick.values,
                description: data,
              });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          ></CKEditor>
        </Grid>

        <Button className={classes.buttomSend} type="submit">
          Edit
        </Button>

        <Button className={classes.buttomSend} onClick={() => setDel(true)}>
          Delete
        </Button>
        {del && (
          <Dialog open={del} onClose={() => setDel(false)}>
            <Grid container justify="center">
              <Grid container item xs={12} justify="center">
                <DialogTitle>Are you sure this can't be undone</DialogTitle>
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
      </Grid>
    </form>
  );
};

export default CreateForm;
