import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./screens/Login/Login";
import Markets from "./screens/Markets/Markets";
import Market from "./screens/Market/Market";
import Listing from "./screens/Listing/Listing";
import Orders from "./screens/Orders/Orders";
import Profile from "./screens/Profile/Profile";
import Payments from "./screens/Payments/Payments";
import Basket from "./screens/Basket/Basket";
import Signup from "./screens/Signup/Signup";
import Favorites from "./screens/Favorites/Favorites";
import Updates from "./screens/Updates/Updates";
import Inventory from "./screens/Inventory/Inventory";
import Help from "./screens/Help/Help";
import Farm from "./screens/Farm/Farm";

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
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute exact path="/" component={Markets} />
            <PrivateRoute exact path="/markets" component={Markets} />
            <PrivateRoute path="/market/:id" component={Market} />
            <PrivateRoute path="/product/:id" component={Listing} />
            <PrivateRoute path="/orders" component={Orders} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path="/basket" component={Basket} />
            <PrivateRoute path="/favorites" component={Favorites} />
            <PrivateRoute exact path="/profile/payments" component={Payments} />
            <PrivateRoute path="/updates" component={Updates} />
            <PrivateRoute path="/inventory" component={Inventory} />
            <PrivateRoute path="/help/:id" component={Help} />
            <PrivateRoute path="/farm/:id" component={Farm} />

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
