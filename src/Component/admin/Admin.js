import React from 'react';
import AdminHeader from '../Header/AdminHeader';
import AdminFooter from '../Footer/AdminFooter';
import AdminLeftMenu from '../Navbar/AdminLeftMenu';
import Home from '../Admin/Home';

function Dashboard() {
  return (
       	<div className="wrapper">
          <AdminLeftMenu />
            <div className="main">
               <AdminHeader />
                <Home />
               <AdminFooter />
           </div>
       </div>
  );
}
 
export default Dashboard;