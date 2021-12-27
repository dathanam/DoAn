import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from '../Layout/Layout';
import Home from '../Component/Home/Home';

function RouterAdmin() {
    return (
        <div className="container">
            <Layout />
            <Router>
                <Switch>
                    <Route path="/admin" exact component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterAdmin;