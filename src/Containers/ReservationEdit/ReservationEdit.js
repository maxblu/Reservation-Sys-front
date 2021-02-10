import React, { useState, useEffect } from "react";

import { Grid, makeStyles } from "@material-ui/core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form } from "formik";

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

  useEffect(() => {
    setReservation(props.history.location.state.reservation);
  }, []);

  return (
    <Grid container justify="center">
      {reservation && (
        <form className={classes.form}>
          <Grid item className={classes.editor} xs={12} md={12}>
            {/* <Paper > */}

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
        </form>
      )}
    </Grid>
  );
};

export default ReservationEdit;
