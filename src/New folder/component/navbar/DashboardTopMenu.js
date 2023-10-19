import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faWallet,faTimesCircle, faBars} from '@fortawesome/free-solid-svg-icons'
import { userid, token, name, type  } from '../common/UserAuth'
import { URL } from '../common/Url'

const DashboardTopMenu = () => {
  let history = useHistory();

  let IsAdminlogin;
  if (localStorage.getItem("admin")) {
    IsAdminlogin = true;
  }
  else {
    IsAdminlogin = false;
  }

 
  const goBackToAdmin = () => {
    localStorage.removeItem('user');
    //window.location = "/admin";
    history.push("/admin/user-list");
  }

  const [balance, setbalance] = useState({
    credit: '',
    isPrepaid: ''
  })

  useEffect(() => {
    if (userid) {
      fetch(`${URL}users.php?user_id=${userid}&method=retrieve_profile&id=${userid}&token=${token}&user_type=${type}`).then((response) => {
        response.json().then((result) => {
          //  console.log('balance',result);
          setbalance({
            credit: result.data[0].credit,
            isPrepaid: result.data[0].enable_prepaid_billing

          });
        })
      })
    }
  }, [])


  const sideBartoggle = () => {
    let menubar = document.getElementById("mobile-dashboard-menu"); 
    menubar.classList.add('layout-menu-expanded');
  }

  return (

    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="d-flex align-items-center justify-content-between">
        <FontAwesomeIcon onClick={sideBartoggle}  icon={faBars} />
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className='mr-4'>
            <div className='wallet'><span><FontAwesomeIcon icon={faWallet} /> Credit </span><span className='social-count'> {balance.isPrepaid === 1 ? balance.credit : 'Unlimited' } </span></div>
          </li>

          <li className="nav-item pr-2">
            <Link className="nav-link" to="/logout">
              <FontAwesomeIcon  icon={faPowerOff} />
            </Link>
          </li>

          {IsAdminlogin ?

            <li className="nav-item border-left pl-2">
              <Link className="nav-link">
                <FontAwesomeIcon color='red' onClick={() => goBackToAdmin()} icon={faTimesCircle} />
              </Link>
            </li>
            :
            null
          }



        </ul>
      </div>
    </nav>

  );
};

export default DashboardTopMenu;