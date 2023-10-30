import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const Protected = ({ component: Cmp, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            sessionStorage.getItem("user") ? (
                <Cmp {...props} />
            ) :
                <Navigate to='/logout' />
        }
    />
)

export default Protected;