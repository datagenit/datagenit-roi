import React, { useState } from 'react';
import Logoimg from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faCalendar, faAdd, faList, faStore } from '@fortawesome/free-solid-svg-icons'

const DashboardSideMenu = () => {
  const [pName, setPName] = useState('');
  const [empMenu, setempMenu] = useState(true);

  const lStorage = JSON.parse(localStorage.getItem("admin")) || JSON.parse(localStorage.getItem("emp")) || JSON.parse(localStorage.getItem("client"));
  const isAdmin = lStorage.user.isAdmin;


  const checkActive = (match, location) => {

    if (isAdmin === 'emp') {
      setempMenu(false)
    } else {
      setempMenu(true)
    }

    //some additional logic to verify you are in the home URI
    if (!location) return false;
    const { pathname } = location;
    console.log(pathname);
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


      <div class="collapse navbar-collapse w-auto " id="sidenav-collapse-main">
        <ul class="navbar-nav">


          <li>
            <NavLink className="sidebar-link" isActive={checkActive} to="/admin">
              <FontAwesomeIcon icon={faTable} />  <span className="align-middle">  Dashboard</span>
            </NavLink>
          </li>


          <li class="nav-item">
            <a data-bs-toggle="collapse" href="#navexample" class="nav-link text-white opacity-10 collapsed" aria-controls="navexample" role="button" aria-expanded="false">
              <div class="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">

              </div>
              <span class="nav-link-text ms-1"><FontAwesomeIcon icon={faCalendar} /> Sale Event</span>
            </a>
            <div class="collapse" id="navexample">
              <ul class="nav border-start ms-4">
                <li class="nav-item active">
                  <Link className="nav-links text-white" to="/dashboard/add-event">
                    <span class="sidenav-normal"><FontAwesomeIcon icon={faAdd} /> Add Event</span>
                  </Link>
                </li>
                <li class="nav-item active">
                  <Link className="nav-links text-white" to="/dashboard/list-event">
                    <span class="sidenav-normal"><FontAwesomeIcon icon={faList} /> List Event</span>
                  </Link>

                </li>
              </ul>
            </div>
          </li>


          <li class="nav-item">
            <a data-bs-toggle="collapse" href="#navexample1" class="nav-link text-white opacity-10 collapsed" aria-controls="navexample1" role="button" aria-expanded="false">
              <div class="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">

              </div>
              <span class="nav-link-text ms-1"><FontAwesomeIcon icon={faStore} /> Store</span>
            </a>
            <div class="collapse" id="navexample1">
              <ul class="nav border-start ms-4">
                <li class="nav-item active">
                  <Link className="nav-links text-white" to="/dashboard/add-store">
                    <span class="sidenav-normal"><FontAwesomeIcon icon={faAdd} /> Add Store</span>
                  </Link>
                </li>
                <li class="nav-item active">
                  <Link className="nav-links text-white" to="/dashboard/list-store">
                    <span class="sidenav-normal"><FontAwesomeIcon icon={faList} /> List Store</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>


        </ul>
      </div>

    </aside>

  );
};

export default DashboardSideMenu;