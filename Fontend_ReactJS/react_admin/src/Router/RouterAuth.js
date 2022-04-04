import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../Component/Login/Login.jsx'

function RouterAuth() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterAuth;