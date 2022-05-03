import React, { useState,useEffect } from "react";
import axios from "axios";
import "./App.css";
import ImageHandle from "./components/mark/ImageHandle";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListImages from "./components/Linking/ListImages";
import FetchImageDetails from "./components/Linking/FetchImageDetails";
import GetImages from "./components/Tour/GetImages";
import VirtualName from "./components/Tour/VirtualName";
import InitPlan from "./components/Plan/InitPlan";
import GetVid from "./components/Plan/GetVid";
import ChoosePlan from "./components/Plan/ChoosePlan";
import LinkPlan from "./components/Plan/LinkPlan";
import Images from "./components/images";
import ChooseUpload from "./components/Upload/ChooseUpload";
import UploadPano from "./components/Upload/UploadPano";
import UploadPlan from "./components/Upload/UploadPlan";
import Select from "./components/Upload/Select";
import GetMarkVid from "./components/mark/GetMarkVid";
import GetLinkVid from "./components/Linking/GetLinkVid";
import GetPlanVid from "./components/Plan/GetPlanVid";

function App() {
  window.onbeforeunload = function () {
    localStorage.clear();
    return "";
  };

 
  const [ip, setIP] = useState('');

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }
  
  useEffect( () => {
    getData()
  }, [])

  return (
    <>
      <Switch>
       
          <Route exact path="/:vid_name/tour">
            <GetImages />
          </Route>
          <div>
            <Navbar />
            <Route exact path="/:vid/mark">
              <ListImages />
            </Route>
            <Route exact path="/mark">
              <GetMarkVid />
            </Route>
            <Route exact path="/link">
              <GetLinkVid />
            </Route>
            <Route exact path="/mark/:id">
              <ImageHandle />
            </Route>
            <Route exact path="/:vid/link">
              <ListImages />
            </Route>
            <Route exact path="/vid">
              <VirtualName />
            </Route>
            <Route exact path="/link/:vid_id">
              <FetchImageDetails />
            </Route>
            <Route exact path="/plan">
              <GetPlanVid />
            </Route>
            <Route exact path="/:vid/plan">
              <ChoosePlan />
            </Route>
            <Route exact path="/:vid/planmark">
              <InitPlan />
            </Route>
            <Route exact path="/:vid/planlink">
              <LinkPlan />
            </Route>
            <Route exact path="/test">
              <Images />
            </Route>
            <Route exact path="/upload">
              <ChooseUpload />
            </Route>
            <Route exact path="/:vid/select">
              <Select />
            </Route>
            <Route exact path="/:vid/uploadimage">
              <UploadPano />
            </Route>
            <Route exact path="/:vid/uploadplan">
              <UploadPlan />
            </Route>
          </div>
        
      </Switch>
    </>
  );
}

export default App;
