import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./screens/Login/Login";
import Markets from "./screens/Markets/Markets";
import Market from "./screens/Market/Market";
import Listing from "./screens/Listing/Listing";
import Orders from "./screens/Orders/Orders";
import Profile from "./screens/Profile/Profile";
import Basket from "./screens/Basket/Basket";
import Signup from "./screens/Signup/Signup";
import Favorites from "./screens/Favorites/Favorites";

function isAuthenticated() {
  return localStorage.getItem("authorization");
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
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
            <Route exact path="/" component={Markets} />
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/markets" component={Markets} />
            <Route path="/market/:id" component={Market} />
            <Route path="/product/:id" component={Listing} />
            <PrivateRoute path="/orders" component={Orders} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/basket" component={Basket} />
            <PrivateRoute path="/favorites" component={Favorites} />

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
