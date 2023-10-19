import React,{useState} from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faBars } from '@fortawesome/free-solid-svg-icons'
import {name} from '../common/AdminAuth';

const DashboardTopMenu = () => {

  const sideBartoggle = () => {
    let menubar = document.getElementById("mobile-menu"); 
    menubar.classList.add('layout-menu-expanded');
  }


  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="d-flex align-items-center justify-content-between">
        <FontAwesomeIcon onClick={sideBartoggle} icon={faBars} />
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
       <div className="menu-inner-shadow"></div>
        <ul className="navbar-nav flex-row align-items-center ms-auto">
        <span className='mr-2'>Welcome : {name}</span>
          <li className="nav-item navbar-dropdown dropdown-user border-left dropdown">
            <Link className="nav-link dropdown-toggle pl-3 hide-arrow" to="/logout">
              <FontAwesomeIcon  icon={faPowerOff} />
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default DashboardTopMenu;