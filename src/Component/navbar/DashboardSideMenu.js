import React, { useState } from 'react';
import Logoimg from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';

const DashboardSideMenu = () => {
  const [pName, setPName] = useState('');


  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    //console.log('location',location);
    setPName(pathname);
  }



  return (


    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 bg-slate-900 fixed-start " id="sidenav-main">
      <div class="sidenav-header">
        <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a class="navbar-brand d-flex align-items-center m-0" href="dashboard.php">
          <span class="font-weight-bold text-lg"><img src={Logoimg} /></span>
        </a>
      </div>
      <div class="collapse navbar-collapse px-4  w-auto " id="sidenav-collapse-main">
        <ul class="navbar-nav">
          <li className={pName === '/dashboard' ? 'nav-item active' : 'nav-item'}>
            <NavLink to="/dashboard" isActive={checkActive} className="nav-link">
              <span class="nav-link-text ms-1">Dashboard</span>
            </NavLink>
          </li>
          <li className={pName === '/dashboard/add-event' ? 'nav-item active' : 'nav-item'}>
            <Link to="/dashboard/add-event" className="nav-link">
              <span class="nav-link-text ms-1">Add Event</span>
            </Link>
          </li>
          <li className={pName === '/dashboard/list-event' ? 'nav-item active' : 'nav-item'}>
            <Link to="/dashboard/list-event" className="nav-link">
              <span class="nav-link-text ms-1">List Event</span>
            </Link>
          </li>


        </ul>
      </div>

    </aside>

  );
};

export default DashboardSideMenu;