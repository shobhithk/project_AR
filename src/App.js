import "./App.css";
import ImageHandle from "./components/mark/ImageHandle";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListImages from './components/Linking/ListImages'
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

function App() {
  window.onbeforeunload = function() {
    localStorage.clear();
    return '';
  };
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/mark">
          <ListImages />
        </Route>
        <Route exact path="/mark/:id">
          <ImageHandle />
        </Route>
        <Route exact path="/link">
          <ListImages />
        </Route>
        <Route exact path="/vid" >
          <VirtualName />
        </Route>
        <Route exact path="/:vid_name/tour">
          <GetImages />
        </Route>
        <Route exact path="/link/:id">
          <FetchImageDetails/>
        </Route>
        <Route exact path='/plan'>
          <GetVid />
        </Route>
        <Route exact path='/:vid/plan'>
          <ChoosePlan/>
        </Route>
        <Route exact path='/:vid/planmark'>
          <InitPlan />
        </Route>
        <Route exact path='/:vid/planlink'>
          <LinkPlan/>
        </Route>
        <Route exact path='/test'>
          <Images/>
        </Route>
        <Route exact path='/upload'>
          <ChooseUpload/>
        </Route>
        <Route exact path='/:vid/select'>
          <Select/>
        </Route>
        <Route exact path='/:vid/uploadimage'>
          <UploadPano/>
        </Route>
        <Route exact path='/:vid/uploadplan'>
          <UploadPlan/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
