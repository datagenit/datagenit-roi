import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const AdminProtected = ({ component: Cmp, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            sessionStorage.getItem("admin") || sessionStorage.getItem("manager") ? (
                <Cmp {...props} />
            ) :
                <Navigate to='/logout' />
        }
    />
)

export default AdminProtected;