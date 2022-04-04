import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LayoutLeft from "../Layout/LayoutLeft.jsx";
import Home from '../Component/Home/Home.jsx';
import Role from "../Component/Home/Role.jsx";

function RouterAdmin() {
    return (
        <div className="container">
            <LayoutLeft />
            <Router>
                <Switch>
                    <Route path="/admin" exact component={Home} />
                    <Route path="/admin/role" exact component={Role} />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterAdmin;