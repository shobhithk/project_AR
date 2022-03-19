import React,{useCallback,useState,useEffect} from 'react'
import axios from 'axios';
import Getlinks from './Getlinks';
import { useParams } from 'react-router-dom';

const GetImages = (props) => {

    const params = useParams()
    const [imageState,setImageState] = useState()

    useEffect(()=>{
      const interval = setInterval(()=>{
        Object.keys(imageState).map((imageId)=>{
          if(localStorage.getItem(imageId)){
            localStorage.removeItem(imageId)
          }
        })
      }, 240000);
     return () => clearInterval(interval);
    })
    


    const fetchImageHandler = useCallback(async () => {
        try {
          const response = await axios.get("http://54.164.240.76:8000/get_images", {
            params: { virtual_tour_id: params.vid },
          });
          setImageState(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }, [params]);
    
      useEffect(() => {
        fetchImageHandler();
      }, [fetchImageHandler]);

  return (
    <>
    {imageState && <Getlinks imageData={imageState} />}
    </>
  )
}

export default GetImages