import "./App.css";
import ImageHandle from "./components/ImageHandle";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListImages from './components/Linking/ListImages'
import FetchImageDetails from "./components/Linking/FetchImageDetails";
import GetImages from "./components/Tour/GetImages";

function App() {
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
        <Route exact path="/tour">
          <GetImages />
        </Route>
        <Route exact path="/link/:id">
          <FetchImageDetails/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
