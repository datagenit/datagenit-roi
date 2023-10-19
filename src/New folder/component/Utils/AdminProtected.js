import React from 'react';
import {Redirect,Route} from 'react-router-dom';

const AdminProtected = ({component:Cmp,...rest}) => (
    <Route 
        {...rest}
        render={(props)=>
            sessionStorage.getItem("admin") || sessionStorage.getItem("manager")?(
                <Cmp {...props} />
            ):
            <Redirect to='/logout' />
        }
    />
)

export default AdminProtected;