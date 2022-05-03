import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../Component/Login/Login.jsx';
import ChonPhong from "../Component/Login/ChonPhong.jsx";

function RouterAuth() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/chonphong" component={ChonPhong} />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterAuth;