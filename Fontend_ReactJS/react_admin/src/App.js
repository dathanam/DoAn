import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './CSS/custom.css';
import Auth from './Router/RouterAuth';
import Admin from './Router/RouterAdmin';
import Page404 from './Layout/Page404';
import ChonPhong from "./Component/Login/ChonPhong";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/chonphong" exact component={ChonPhong} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
