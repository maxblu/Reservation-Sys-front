import React, {useEffect,useState} from 'react';

import { FormControl, Grid, Hidden, InputLabel, List, ListItem, makeStyles, MenuItem, Select } from '@material-ui/core';

import axios from '../../axiosInstance';


import Spinner from "../../Components/Spinner/Spinner";

const useStyles = makeStyles((theme)=>({
    formControl: {
      margin: theme.spacing(4),
      minWidth: 120,
      width:'30%',

    },
    formControlMovil:{
      margin: theme.spacing(4),
      minWidth: 120,
      width:'100%',
    },
    gridListItemMovil:{
        width:"100%",
        backgroundColor:"rgb(223, 223, 223)",
        marginBottom:theme.spacing(2),
        // marginLeft:theme.spacing(2),
    },
    gridListItem:{
      width:"100%",
      backgroundColor:"rgb(223, 223, 223)",
      marginBottom:theme.spacing(2),
      // marginLeft:theme.spacing(2),
      // marginRight:theme.spacing(2),
    }

}));



const Reservations = (props) => {
    const classes = useStyles();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
    setLoading(true);

    
    axios
      .get("/Reservation")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setReservations(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        // setLoading(false);
      });
  }, []);
    

    const handleSort =() =>{};




    return (
        <Grid container justify='center' >
          <Grid item xs={12} container justify='flex-start'  >
                <Hidden xsDown>

                      <FormControl variant="filled" className={classes.formControl} >
                          <InputLabel id="select-filled-label">Sort by</InputLabel>
                          <Select
                            value={""}
                            onChange={handleSort}
                            variant='outlined'
                          >
                              
                                <MenuItem value={10}>By Date Ascending  </MenuItem>
O                               <MenuItem value={20}>By Date Descending </MenuItem>
                                <MenuItem value={10}>By Alphabetic Ascending  </MenuItem>
O                               <MenuItem value={30}>By Alphabetic Descending </MenuItem>
                                <MenuItem value={10}>By Ranking  </MenuItem>
                          </Select>
                      </FormControl>

                </Hidden>

                
                <Hidden smUp>
                          <FormControl variant="filled" className={classes.formControlMovil} >
                              <InputLabel id="select-filled-label">Sort by</InputLabel>
                              <Select
                                value={""}
                                onChange={handleSort}
                                variant='outlined'
                              >
                                  
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                          </FormControl>`

                </Hidden>

          </Grid>
          <Grid  item xs={12} sm={11}   >
            <List > 
                  {loading?<Spinner/>:reservations.map(reser=>{
                        return <Grid item  className={classes.gridListItem}>
                                    <ListItem  > {reser.title}</ListItem>
                              </Grid>


                  })}



              </List>
          </Grid>
            
            
        </Grid>
      );
}
 
export default Reservations;