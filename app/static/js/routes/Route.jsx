import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import DefaultLayout from "../components/layouts/default";

export default function RouteWrapper(
    {component: Component, ...rest}
){

    const Layout = DefaultLayout;

    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};
