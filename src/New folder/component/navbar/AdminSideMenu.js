import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faChartLine,
  faChartArea,
  faChartBar,
  faChartPie,
  faHistory,
  faTimesCircle,
  faCalendar,
  faGlobe,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import { type } from "../common/AdminAuth";

const DashboardSideMenu = () => {
  const [pName, setPName] = useState("");
  const [menuHide, setmenuHide] = useState("");

  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    //console.log("location", location);
    setPName(pathname);
  };

  const menuHideShow = () => {
    let menubar = document.getElementById("mobile-menu");
    menubar.classList.remove("layout-menu-expanded");
  };

  return (
    <div id="mobile-menu">
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <span className="app-brand-text demo menu-text fw-bolder ms-2">
            SMPP{" "}
          </span>
          <button className="menu-btn" onClick={menuHideShow}>
            {" "}
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
        <ul className="menu-inner py-1">
          <li className={pName === "/admin" ? "menu-item active" : "menu-item"}>
            <NavLink className="menu-link" isActive={checkActive} to="/admin">
              <FontAwesomeIcon
                className="menu-icon tf-icons bx bx-home-circle"
                icon={faHome}
              />
              <div data-i18n="Analytics"> Dashboard </div>
            </NavLink>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text"> User Report</span>
          </li>
          <li
            className={
              pName.includes("/admin/summary-report")
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Link to="/admin/summary-report" className="menu-link">
              <FontAwesomeIcon
                className="menu-icon tf-icons bx bx-home-circle"
                icon={faChartPie}
              />
              <div data-i18n="Basic"> Summary Report </div>
            </Link>
          </li>
          <li
            className={
              pName.includes("/admin/details-report")
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Link to="/admin/details-report" className="menu-link">
              <FontAwesomeIcon
                className="menu-icon tf-icons bx bx-home-circle"
                icon={faChartArea}
              />
              <div data-i18n="Basic"> Details Report </div>
            </Link>
          </li>

          <li
            className={
              pName.includes("/admin/summary-date-wise")
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Link to="/admin/summary-date-wise" className="menu-link">
              <FontAwesomeIcon
                className="menu-icon tf-icons bx bx-home-circle"
                icon={faCalendar}
              />
              <div data-i18n="Basic"> Date Wise Report </div>
            </Link>
          </li>
          {type === "Admin" && (
            <li
              className={
                pName === "/admin/global-search"
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              <Link to="/admin/global-search" className="menu-link">
                <FontAwesomeIcon
                  className="menu-icon tf-icons bx bx-home-circle"
                  icon={faGlobe}
                />
                <div data-i18n="Basic"> Global Search </div>
              </Link>
            </li>
          )}



          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Company Management</span>
          </li>
          <li
            className={
              pName === "/admin/company" ? "menu-item active" : "menu-item"
            }
          >
            <Link to="/admin/company" className="menu-link">
              <FontAwesomeIcon icon={faBuilding} className="mr-2" />
              <div data-i18n="Support">Company</div>
            </Link>
          </li>


          {type === "Admin" ? (
            <>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">SMSC Report</span>
              </li>
              <li
                className={
                  pName === "/admin/smsc-report" || pName === "/admin/add-smsc"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <Link to="/admin/smsc-report" className="menu-link">
                  <FontAwesomeIcon
                    className="menu-icon tf-icons bx bx-home-circle"
                    icon={faChartBar}
                  />
                  <div data-i18n="Basic"> SMSC Report </div>
                </Link>
              </li>
              <li
                className={
                  pName === "/admin/esme-report"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <Link to="/admin/esme-report" className="menu-link">
                  <FontAwesomeIcon
                    className="menu-icon tf-icons bx bx-home-circle"
                    icon={faChartLine}
                  />
                  <div data-i18n="Basic"> ESME Report </div>
                </Link>
              </li>

              {/* <li
                className={
                  pName === "/admin/smsc-report-ec2" ||
                    pName === "/admin/add-smsc"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <Link to="/admin/smsc-report-ec2" className="menu-link">
                  <FontAwesomeIcon
                    className="menu-icon tf-icons bx bx-home-circle"
                    icon={faChartBar}
                  />
                  <div data-i18n="Basic"> SMSC Report EC2 </div>
                </Link>
              </li> */}
              {/* <li
                className={
                  pName === "/admin/esme-report-ec2"
                    ? "menu-item active"
                    : "menu-item"
                }
              >
                <Link to="/admin/esme-report-ec2" className="menu-link">
                  <FontAwesomeIcon
                    className="menu-icon tf-icons bx bx-home-circle"
                    icon={faChartLine}
                  />
                  <div data-i18n="Basic"> ESME Report EC2 </div>
                </Link>
              </li> */}
            </>
          ) : null}

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">User Management</span>
          </li>
          <li
            className={
              pName.includes("/admin/user-list") ||
                pName.includes("/admin/add-user")
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Link to="/admin/user-list" className="menu-link">
              <FontAwesomeIcon
                className="menu-icon tf-icons bx bx-home-circle"
                icon={faUser}
              />
              <div data-i18n="Basic">All User list </div>
            </Link>
          </li>

          <li
            className={
              pName === "/admin/balance-history"
                ? "menu-item active"
                : "menu-item"
            }
          >
            <Link to="/admin/balance-history" className="menu-link">
              <FontAwesomeIcon
                className="menu-icon tf-icons bx bx-home-circle"
                icon={faHistory}
              />
              <div data-i18n="Basic"> Balance History </div>
            </Link>
          </li>

          {type === "Admin" ? (
            <>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Mamager Add / List</span>
              </li>
              <li
                className={
                  pName === "/admin/manager" ? "menu-item active" : "menu-item"
                }
              >
                <Link to="/admin/manager" className="menu-link">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <div data-i18n="Support">Manager</div>
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </aside>
    </div>
  );
};

export default DashboardSideMenu;
