import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { _ } from "lodash"

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { EmployerPage } from "../EmployerPage";
import { EmployeePage } from "../EmployeePage";
import { CustomerPage } from "../CustomerPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <div>
            <PrivateRoute exact path="/" component={EmployerPage} />
            <Route path="/license" component={EmployerPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/registerEmployer" component={RegisterPage} />
            <Route path="/customerManagement" component={EmployeePage} />
            <Route path="/customerBills" component={EmployeePage} />
            <Route path="/customerMain" component={CustomerPage} />
            <Route path="/gstStatus" component={CustomerPage} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
