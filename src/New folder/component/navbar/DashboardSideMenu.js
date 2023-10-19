import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTachometerAlt, faGlobe, faFileDownload, faUser, faHistory, faTimesCircle, faCalendarDay } from '@fortawesome/free-solid-svg-icons'

const DashboardSideMenu = () => {

  const [pName, setPName] = useState('');


  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    //console.log('location',location);
    setPName(pathname);
  }

  const menuHideShow = () => {
    let menubar = document.getElementById("mobile-dashboard-menu");
    menubar.classList.remove('layout-menu-expanded');
  }


  return (
    <div id="mobile-dashboard-menu">
      <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
        <div className="app-brand demo">
          <a href="/dashboard" className="app-brand-link">
            <span className="app-brand-text demo menu-text fw-bolder ms-2">SMPP-SMS</span>
          </a>
          <button className='menu-btn' onClick={menuHideShow}> <FontAwesomeIcon icon={faTimesCircle} /></button>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">

          <li className={pName === '/dashboard' ? 'menu-item active' : 'menu-item'}>
            <NavLink to="/dashboard" isActive={checkActive} className="menu-link">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <div> Dashboard</div>
            </NavLink>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Reporting</span>
          </li>

          <li className={pName === '/dashboard/summary-report' ? 'menu-item active' : 'menu-item'}>
            <Link to="/dashboard/summary-report" className="menu-link">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              <div>Sender ID Wise Report</div>
            </Link>
          </li>

          <li className={pName === '/dashboard/date-wise-summary-report' ? 'menu-item active' : 'menu-item'}>
            <Link to="/dashboard/date-wise-summary-report" className="menu-link">
              <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
              <div>Date Wise Report</div>
            </Link>
          </li>

          

          <li className={pName === '/dashboard/details-report' ? 'menu-item active' : 'menu-item'}>
            <Link to="/dashboard/details-report" className="menu-link">
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              <div>Detailed Report</div>
            </Link>
          </li>

          <li className="menu-header small text-uppercase"><span className="menu-header-text">Download</span></li>
          <li className={pName === '/dashboard/download-report' ? 'menu-item active' : 'menu-item'}>
            <Link to="/dashboard/download-report" className="menu-link">
              <FontAwesomeIcon icon={faFileDownload} className="mr-2" />
              <div data-i18n="Tables">Download Report</div>
            </Link>
          </li>


          <li className="menu-header small text-uppercase"><span className="menu-header-text">My Profile</span></li>
          <li className={pName === '/dashboard/profile' ? 'menu-item active' : 'menu-item'}>
            <Link
              to="/dashboard/profile"
              className="menu-link"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <div data-i18n="Support">Profile</div>
            </Link>
          </li>

          <li className={pName === '/dashboard/balance-history' ? 'menu-item active' : 'menu-item'}>
            <Link
              to="/dashboard/balance-history"
              className="menu-link"
            >
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              <div data-i18n="Support">Balance History</div>
            </Link>
          </li>


        </ul>
      </aside>
    </div>
  );
};

export default DashboardSideMenu;