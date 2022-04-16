import React,{useCallback,useState,useEffect} from 'react'
import axios from 'axios';
import Getlinks from './Getlinks';
import { useParams } from 'react-router-dom';

const GetImages = (props) => {

    const params = useParams()
    const paramsStr = params.vid_name
    const [vid,vid_name] =  paramsStr.split('&')
    console.log(vid)
    const [imageState,setImageState] = useState()

    // useEffect(()=>{
    //   const interval = setInterval(()=>{
    //     Object.keys(imageState).map((imageId)=>{
    //       if(localStorage.getItem(imageId)){
    //         localStorage.removeItem(imageId)
    //       }
    //     })
    //   }, 120000);
    //  return () => clearInterval(interval);
    // })
    


    const fetchImageHandler = useCallback(async () => {
        try {
          const response = await axios.get("http://54.164.240.76:8000/get_images", {
            params: { virtual_tour_id: +vid },
          });
          setImageState(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }, [vid]);
    
      useEffect(() => {
        fetchImageHandler();
      }, [fetchImageHandler]);

  return (
    <>
    {imageState && <Getlinks imageData={imageState} vid={vid} />}
    </>
  )
}

export default GetImages