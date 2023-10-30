import React, { useState } from 'react';
import Logoimg from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faUser, faUsers, faAssistiveListeningSystems, faChartBar, faCreditCard, faBroadcastTower, faAtom, faBan, faPlus, faTicketAlt, faPhotoVideo, faInbox, faBlog, faStarOfLife } from '@fortawesome/free-solid-svg-icons'

const AdminSideMenu = () => {
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
              <FontAwesomeIcon icon={faAlignJustify} />  <span className="align-middle">  Dashboard</span>
            </NavLink>
          </li>


          <li class="nav-item">
            <a data-bs-toggle="collapse" href="#navexample" class="nav-link text-white opacity-10 collapsed" aria-controls="navexample" role="button" aria-expanded="false">
              <div class="icon icon-shape icon-sm px-0 text-center d-flex align-items-center justify-content-center">

              </div>
              <span class="nav-link-text ms-1">Event</span>
            </a>
            <div class="collapse" id="navexample">
              <ul class="nav border-start ms-4">
                <li class="nav-item active">
                  <a class="nav-links text-white opacity-9" href="add-event.php">

                    <span class="sidenav-normal">&nbsp;Add Events</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-links text-white opacity-9" href="list-event.php">
                    <span class="sidenav-mini-icon"></span>
                    <span class="sidenav-normal">&nbsp;&nbsp;List Event</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>



          <li>
            <NavLink className="sidebar-link" isActive={checkActive} to="/admin">
              <FontAwesomeIcon icon={faAlignJustify} />  <span className="align-middle">Dashboard</span>
            </NavLink>
          </li>


          <li className={pName === '/dashboard/list-event' ? 'sidebar-item active' : 'sidebar-item'}>
            <NavLink className="sidebar-link" isActive={checkActive} to="/dashboard/list-event">
              <FontAwesomeIcon icon={faAssistiveListeningSystems} />  <span className="align-middle">User Event</span>
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
                  <FontAwesomeIcon icon={faUsers} />  <span className="align-middle">User Management</span>
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

export default AdminSideMenu;