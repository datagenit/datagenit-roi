import React, { useState } from 'react';
import Logoimg from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faUser, faUsers, faAssistiveListeningSystems, faChartBar, faCreditCard, faBroadcastTower, faAtom, faBan, faPlus, faTicketAlt, faPhotoVideo, faInbox, faBlog, faStarOfLife } from '@fortawesome/free-solid-svg-icons'

const DashboardSideMenu = () => {
  const [menuId, setMenuId] = useState('sidebar');
  const [pName, setPName] = useState('');
  const [empMenu, setempMenu] = useState(true);

  const lStorage = JSON.parse(localStorage.getItem("admin")) || JSON.parse(localStorage.getItem("emp"));
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
    // console.log(pathname);
    setPName(pathname);
  }

  const menuHideShow = () => {

    if (menuId === 'sidebar') {
      setMenuId('sidebar collapsed');
    } else {
      setMenuId('sidebar');
    }
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


          <li className={pName === '/admin' ? 'sidebar-item active' : 'sidebar-item'}>
            <NavLink className="sidebar-link" isActive={checkActive} to="/admin">
              <FontAwesomeIcon icon={faAlignJustify} />  <span className="align-middle"> {isAdmin === 'emp' ? '' : 'Admin'} Dashboard</span>
            </NavLink>
          </li>

          <li className={pName === '/dashboard/add-event' ? 'sidebar-item active' : 'sidebar-item'}>
            <NavLink className="sidebar-link" isActive={checkActive} to="/dashboard/add-event">
              <FontAwesomeIcon icon={faUsers} />  <span className="align-middle"> {isAdmin === 'emp' ? '' : 'Admin'} Add Event</span>
            </NavLink>
          </li>
          <li className={pName === '/dashboard/list-event' ? 'sidebar-item active' : 'sidebar-item'}>
            <NavLink className="sidebar-link" isActive={checkActive} to="/dashboard/list-event">
              <FontAwesomeIcon icon={faAssistiveListeningSystems} />  <span className="align-middle"> {isAdmin === 'emp' ? '' : 'Admin'} List Event</span>
            </NavLink>
          </li>




          {/* 

          <li className={pName === '/admin/user-management' || pName === '/admin/all-user-management' ? 'sidebar-item active' : 'sidebar-item'}>
            <a href="#userManagement" data-target="#userManagement" data-toggle="collapse" className="sidebar-link collapsed">
              <FontAwesomeIcon icon={faUser} /> <span className="align-middle">User Management  </span>
            </a>
            <ul id="userManagement" className={pName === '/admin/user-management' || pName === '/admin/all-user-management' ? 'sidebar-dropdown list-unstyled collapse show' : 'sidebar-dropdown list-unstyled collapse'} data-parent="#sidebar">

              <li className={pName === '/admin/user-management' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/user-management"> Users List </Link></li>

              <li className={pName === '/admin/all-user-management' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/all-user-management">All Users list</Link></li>

            </ul>
          </li>
*/}




          {/* 					
					<li  className={pName==='/admin/traffic-management'?'sidebar-item active':'sidebar-item '}>
						<NavLink className="sidebar-link " isActive={checkActive} to="/admin/traffic-management">
						<FontAwesomeIcon icon={faGlobe} />  <span className="align-middle">Traffic Management</span>
			            </NavLink>
					</li> */}

          {empMenu ?
            <>
              <li className={pName === '/admin' ? 'sidebar-item active' : 'sidebar-item'}>
                <NavLink className="sidebar-link" isActive={checkActive} to="/admin">
                  <FontAwesomeIcon icon={faUsers} />  <span className="align-middle">Employee Management</span>
                </NavLink>
              </li>


            </>

            :

            null
          }



        </ul>
      </div>

    </aside>

  );
};

export default DashboardSideMenu;