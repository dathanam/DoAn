import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from './Router/RouterAuth';
import Admin from './Router/RouterAdmin';
import Page404 from './Layout/Page404';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/404" exact component={Page404} />
          <Route path="/admin" render={() => {
            return localStorage.getItem("accessToken")?Admin:<Redirect to='/' />
          }} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
