import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './CSS/custom.css';
import Auth from './Router/RouterAuth';
import Admin from './Router/RouterAdmin';
import Page404 from './Layout/Page404';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/404" component={Page404} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin1" render={() => {
            return localStorage.getItem("accessToken") ? Admin : <Redirect to='/' />
          }} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
