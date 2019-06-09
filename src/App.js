import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./screens/Login/Login";

function isAuthenticated() {
  return localStorage.getItem("authorization");
}

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// }
// function DefaultRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         !isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/dashboard", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// }

class Router extends Component {
  render() {
    return (
      <div id="router">
        <BrowserRouter>
          <Switch>
            {/* <DefaultRoute
              exact
              path="/reset/password"
              component={ResetPassword}
            /> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            {/* <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/updates" component={ProductUpdates} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Router;
