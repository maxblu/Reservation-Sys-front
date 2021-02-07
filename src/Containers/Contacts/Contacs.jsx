import React,{useEffect,useState} from 'react';
import axios from "../../axiosInstance";
import Spinner from "../../Components/Spinner/Spinner";



const Contactos = (props) => {

    const [contacs, setContacs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    setLoading(true);


    axios
      .get("/Contact")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setContacs(res.data.data);
      })
      .catch((e) => {
        console.log(e);
        // setLoading(false);
      });
  }, []);


    return ( 
        <div>
            <h4>Contactos</h4>
            {loading?<Spinner/>:contacs.map(el=>{
                return <div>{el.name}</div>
            })}
            
        </div>
     );
}
 
export default Contactos;