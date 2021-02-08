import React, {useState,useEffect} from 'react';

import {  Button, FormControl, Grid, IconButton, InputLabel, ListItemText, makeStyles, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import axios from '../../axiosInstance';
import Spinner from '../../Components/Spinner/Spinner';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const useStyles = makeStyles((theme)=>({

    gridControls:{
        margin:theme.spacing(2)
        
    },
    formControl: {
       
        minWidth: 0,
        width:'100%',
        margin:theme.spacing(1)
  
      },
      editor:{

          height:"50%",
          width:"75%"
      },
      buttomSend:{
          backgroundColor:'red',
          color:'white',
          margin:theme.spacing(2),
          position:'static',
          top:"90%",
          right:"10%",
          "&:hover":{
            backgroundColor:'red',
            color:'white',
          }

      }

}));


const MyTextField = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    console.log();
    return (
      <>
        <TextField  {...props}   error={meta.touched&&meta.error?meta.error:null} {...field} {...props}  ></TextField>
      </>
    );
  };




const ReservationForm = (props) => {
    
    const [inputs, setInputs] = useState({contactName:"",
    contactId:"",
    contactType:"",
    phone:"",
    birthDate:"",
    date:"",
    description:"",
    title:"",
    block:false,
    errors:false,
    loading:false,
});
const [allContactTypes, setAllContactTypes] = useState([]);
const [loading, setLoading] = useState(false);
const [open, setOpen] = React.useState(false);

const classes = useStyles();

const handleOpenSnack = () => {
    setOpen(true);
  };

const ExampleCustomInput = ({ value, onClick,tipo,block }) => (
    <TextField label={tipo}  variant='outlined' value={value} disabled={block} onClick={onClick} >
      
    </TextField>
  );


useEffect(() => {
    axios.get("/contactType").then(
        (resp)=>{
            setAllContactTypes(resp.data)
            }
            ).catch(e=>{
                console.log(e);
            })


    }, []);

useEffect(() => {
    


    }, [loading]);


    console.log(inputs);




    const handleSave =()=>{

        const reservation = {
            title: inputs.title,
            description:inputs.description,
            contactId:inputs.contactId,
            date:inputs.date,
            creationDate:new Date().toISOString()


        }
        console.log(reservation);


        if(inputs.block){
            setInputs({...inputs,loading:true})
            axios.post('/Reservation',reservation)
                    .then(resp=>{
                       console.log(props);
                      
                       setInputs({...inputs,loading:false,errors:false})
                        setOpen(true);
                    }).catch((e)=>{
                       setInputs({...inputs,loading:false, errors:true});
                        setOpen(true);
                        console.log("Check server validation errors");
                    });
            
        
        
        
        }

    


    }




    const handleChange= (e,date)=>{
        console.log(e);

        if(e.target.name==="contactName"){
                setInputs({...inputs, contactName:e.target.value,loading:true,block:false});
                axios.get(`/Contact/lookup?name=${e.target.value}`)
                    .then(resp=>{


                        let current=null
                        allContactTypes.forEach(el=>{
                            if(el.id==resp.data[0].typeId){
                                current=el.name
                            }
                        })


                        
                        
                            setInputs({
                                ...inputs,
                                contactId:resp.data[0].id,
                                contactName:resp.data[0].name,
                                contactType:current,
                                phone:resp.data[0].phone,
                                birthDate:new Date(resp.data[0].birthDate),
                                block:true,
                                loading:false,
                            })
                    })
                    .catch(e=>{
                        console.log("asfsdfgasgagawgwg");
                        
                    })

        }
        else{

            setInputs({...inputs,[e.target.name]:e.target.value});
        }



    }

    const handleChangeDate=(date)=>{
        console.log(date);
        setInputs({...inputs,date:date});

    }

    const handleChangeBDate=(date)=>{
        console.log(date);
        setInputs({...inputs,birthDate:date});

    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    

    return ( 
        <Grid container justify="center">
            {/* <Formik
            initialValues={{
           contactName:"",
           contactType:"",
           phone:"",
           birthDate:"",
           date:"",
           description:"",
         }}

         validationSchema={Yup.object({
            contactName: Yup.string()
            .max(10,"Max")
              .required('Required'),
            contactType: Yup.string()
              .required('Required'),
            phone: Yup.string()
              .matches(phoneRegExp,"Not a valid phone")
            ,

            birthDay: Yup.string()
              .required('Required'),
            date: Yup.string()
              .required('Required'),
 
          })}

            >
            <Form>
            <Grid item xs={12} sm={3}>
                


                <MyTextField 
                className={classes.formControl}
                variant='outlined' 
                name="contactName"
                label="Contact Name"
                // value={inputs.contactName}
                // onChange={handleChange}
                
                />


            </Grid>

            </Form>

            </Formik> */}
            {loading?<Spinner/>:<Grid item xs={12} sm={12} container justify='space-evenly' >
           
                  
               <Grid item xs={12} sm={3}>
                


                <TextField 
                className={classes.formControl}
                variant='outlined' 
                name="contactName"
                label="Contact Name"
                value={inputs.contactName}
                onChange={handleChange}
                
                
                />


            </Grid>
            <Grid item xs={12} sm={3}>
            <FormControl variant="filled" className={classes.formControl} >
                          <InputLabel id="select-filled-label">Contact Type</InputLabel>
                        <Select
                            id="contactType"
                            name="contactType"
                            value={inputs.contactType}
                            onChange={handleChange}
                            variant='outlined'
                            disabled={inputs.block}
                          >     
                              {allContactTypes.map((elm)=>{
                                  return <MenuItem   value={elm.name} >{elm.name}</MenuItem>
                              })}
                              
        
                          </Select>
                </FormControl>


            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    className={classes.formControl}
                    name='phone'
                    variant='outlined'
                    label="Phone"
                    disabled={inputs.block}
                    value={inputs.phone}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item  container justify='flex-end'  xs={5} sm={5} className={classes.formControl}>
                        <DatePicker className={classes.formControl} name='birthDate' selected={inputs.birthDate} onChange={(date)=>handleChangeBDate(date)} customInput={<ExampleCustomInput tipo="Birthdate: mm/dd/yyyy" block={inputs.block}/>} />

                        

            </Grid>
            <Grid item  container   justify='flex-start'  xs={5} sm={5} className={classes.formControl}>
                        <DatePicker className={classes.formControl} name='date' selected={inputs.date} onChange={(date)=>handleChangeDate(date)} customInput={<ExampleCustomInput tipo="Date: mm/dd/yyyy" />} />

                        

            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    className={classes.formControl}
                    name='title'
                    variant='outlined'
                    label="Title"
                    value={inputs.title}
                    onChange={handleChange}
                />
            </Grid>
            
               </Grid>}
           <Grid item  className={classes.editor}  xs={12}>
               {/* <Paper > */}


            <CKEditor
                
                editor={ClassicEditor}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setInputs({...inputs,description:data})
                    // console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
                >

            </CKEditor>
               {/* </Paper> */}
           </Grid>
           <Grid item xs={10} md={8}>
           <Snackbar open={open}  autoHideDuration={5000} >
                {!inputs.errors?<Alert  severity="success">
                    Reservation saved
                </Alert>:<Alert severity='error'>Some errors</Alert>}
            </Snackbar>

           </Grid>
           <Grid item container justify="flex-end" alignContent='space-around' xs={12}>
                <Button className={classes.buttomSend} onClick={handleSave} >Send</Button>
           </Grid>

        </Grid>

     );
}
 
export default ReservationForm;