import React,{useState,useEffect,useCallback} from 'react'
import axios from 'axios';
import ShowAmenities from './ShowAmenities';

const GetAmenities = (props) => {

    const [amenities,SetAmenities] = useState(null);

    const fetchAmenitiesHandler = useCallback(async () => {
        try {
          const response = await axios.get("http://54.164.240.76:8000/get_current_VT_amenities", {
            params: { tour_id: props.vid },
          });
          SetAmenities(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }, [props.vid]);
    
      useEffect(() => {
        fetchAmenitiesHandler();
      }, [fetchAmenitiesHandler]);

  return (
    <>
    {amenities && <ShowAmenities data={amenities} vid={props.vid}/>}
    </>
  )
}

export default GetAmenities