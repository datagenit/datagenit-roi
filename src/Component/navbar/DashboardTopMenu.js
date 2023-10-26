import React, { useEffect } from 'react';
import Teamimg from '../../assets/img/team-2.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';


const DashboardTopMenu = () => {

  const lStorage = JSON.parse(localStorage.getItem("admin")) || JSON.parse(localStorage.getItem("emp")) || JSON.parse(localStorage.getItem("client"));
  const Id = lStorage.user.userId;
  const name = lStorage.user.name;
  const Token = lStorage.token;
  const type = lStorage.user.isAdmin;

  useEffect(() => {
    const verifyUser = ({ user_id: Id, token: Token, method: 'verify', type: type });
    fetch(`https://authkey.io/api/authentication_data.php`, {
      method: "post",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(verifyUser)
    }).then((result) => {
      result.json().then((resp) => {
        // console.log(resp)
        if (resp.success === true) {
        } else {
          window.location = "/logout";
        }
      })
    })
  }, []);


  return (

    <nav class="navbar navbar-main navbar-expand-lg mx-5 px-0 shadow-none rounded" id="navbarBlur" navbar-scroll="true">
      <div class="container-fluid py-1 px-2">

        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">

          </div>
          <ul class="navbar-nav  justify-content-end">
            <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                </div>
              </a>
            </li>
            <li class="nav-item ps-2 d-flex align-items-center">
              <img src={Teamimg} class="avatar avatar-sm" alt="avatar" /> &nbsp; {name}
            </li>
            <li className="nav-item ps-2 mt-1">
              <Link className="nav-icon" to="/logout">
                <div className="position-relative">
                  <FontAwesomeIcon icon={faPowerOff} />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default DashboardTopMenu;