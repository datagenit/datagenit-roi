import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const AdminProtected = ({ component: Cmp, ...rest }) => (
    <Route
        {...rest}
        render={(props) => localStorage.getItem("admin") || localStorage.getItem("emp") ? (
            <Cmp {...props} />
        ) :
            <Navigate to='/' />
        }
    />
)

export default AdminProtected;