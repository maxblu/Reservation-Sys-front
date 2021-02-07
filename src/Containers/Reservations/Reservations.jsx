import React, {useEffect,useState} from 'react';
import Spinner from "../../Components/Spinner/Spinner";
import axios from '../../axiosInstance';

const Reservations = (props) => {
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
    
    return (
        <div>
            <h4>Reservations</h4>
            {loading?<Spinner/>:reservations.map(el=>{
                return <div>{el.title}</div>
            })}
            
        </div>
      );
}
 
export default Reservations;