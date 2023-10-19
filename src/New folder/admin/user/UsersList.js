import React, { useState, useEffect } from "react";
import AdminSideMenu from "../../navbar/AdminSideMenu";
import AdminTopMenu from "../../navbar/AdminTopMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faBan,
  faPlus,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { URL } from "../../common/Url";
import { userid, token, type } from "../../common/AdminAuth";

const UsersList = () => {
  let { id } = useParams();

  const [error, seterror] = useState({
    errarStatus: false,
    errorMessage: "",
    bgcolor: "",
  });

  const [permisionDetails, setPermisionDetails] = useState({
    create_user: "",
    view_user: "",
    update_user: "",
    delete_user: "",
  });

  const [userList, setuserList] = useState([]);

  const getUserDetails = () => {
    fetch(
      `${URL}users-as.php?user_id=${userid}&method=retrieve_new&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        console.log("user List", result);
        if (result.success === true) {
          setuserList(result.data);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  const FilterUsersDetails = (id) => {
    fetch(
      `${URL}users-as.php?user_id=${userid}&method=retrieve_new&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        //console.log('FilterUsersDetails',result);
        if (result.success === true) {
          setuserList(
            result.data.filter(function (freelancer) {
              return freelancer.manager_id == id;
            })
          );
        } else {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  useEffect(() => {
    if (id) {
      FilterUsersDetails(id);
    } else {
      getUserDetails();
    }
    getPermisionDetails();
  }, []);

  const getPermisionDetails = () => {
    fetch(
      `${URL}manager.php?user_id=${userid}&method=retrieveid&id=${userid}&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        //console.log(result);
        if (result.success === true) {
          setPermisionDetails({
            create_user: result.data[0].create_user,
            view_user: result.data[0].view_user,
            update_user: result.data[0].update_user,
            delete_user: result.data[0].delete_user,
          });
        } else {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  const login = (e) => {
    fetch(
      `${URL}users.php?user_id=${userid}&method=retrieve_profile&id=${e}&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        //console.log('result', result);
        if (result.success === true) {
          loginAction(result.data[0].username, result.data[0].password);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  const loginAction = (username, password) => {
    let loginDetal = {
      username: username,
      password: password,
      token: token,
      user_type: type,
    };

    fetch(`${URL}login.php`, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(loginDetal),
    }).then((result) => {
      result.json().then((result) => {
        if (result.success === true) {
          seterror({
            errarStatus: true,
            errorMessage: "Success",
            bgcolor: "alert alert-success",
          });
          sessionStorage.setItem("user", JSON.stringify(result));
          setTimeout(function () {
            window.location = "/dashboard";
          }, 1000);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  const userDisable = (id, status) => {
    seterror({ errarStatus: false });
    fetch(
      `${URL}users-as.php?user_id=${userid}&method=change_status&id=${id}&status=${status}`
    ).then((response) => {
      response.json().then((result) => {
        // console.log(result);
        if (result.success === true) {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-success",
          });
          setTimeout(function () {
            getUserDetails();
          }, 1000);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AdminSideMenu />

        <div className="layout-page">
          <AdminTopMenu />

          <div className="content-wrapper">
            <div className="container-xxl container-p-y">
              {permisionDetails.create_user === 1 ? (
                <p className="demo-inline-spacing text-right ">
                  <Link className="btn btn-primary me-1" to="/admin/add-user">
                    <FontAwesomeIcon icon={faPlus} /> Add New User
                  </Link>
                </p>
              ) : null}

              <div className="row">
                <div className="col-lg-12 col-md-4 order-1">
                  {error.errarStatus ? (
                    <div className={error.bgcolor} role="alert">
                      <strong>Alert!</strong> {error.errorMessage}
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  ) : null}

                  <div className="">
                    <div className="card">
                      <h5 className="card-header">User List</h5>
                      <div className="table-responsive text-nowrap">
                        <table className="table">
                          <thead>
                            <tr>
                              {type === "Admin" ? <th> Login </th> : null}
                              <th> User Name</th>
                              <th> Manager </th>
                              <th>Active Server IP</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody className="table-border-bottom-0">
                            {userList.map((items, i) => (
                              <tr key={i}>
                                {type === "Admin" ? (
                                  <td width={"5%"} className="border-right">
                                    {" "}
                                    <FontAwesomeIcon
                                      onClick={() => login(items.username)}
                                      title="Login to user account"
                                      className="login-button"
                                      icon={faLockOpen}
                                      color="green"
                                    />{" "}
                                  </td>
                                ) : null}

                                <td>
                                  {" "}
                                  <span className="text-primary">
                                    {items.username}{" "}
                                  </span>
                                </td>

                                <td>
                                  <span className="text-primary">
                                    {items.manager}{" "}
                                  </span>
                                </td>

                                <td>{items.server_ip}</td>
                                <td>
                                  {items.status === 1 ? (
                                    <span className="badge bg-label-primary me-1">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge bg-label-danger me-1">
                                      Inactive
                                    </span>
                                  )}
                                </td>

                                <td>
                                  {permisionDetails.update_user === 1 ? (
                                    <span className="badge bg-primary mr-2">
                                      {" "}
                                      <Link
                                        to={`/admin/add-user/edit/${items.username}/${items.server_ip}`}
                                      >
                                        {" "}
                                        <FontAwesomeIcon icon={faEdit} />{" "}
                                      </Link>{" "}
                                    </span>
                                  ) : null}

                                  {permisionDetails.view_user === 1 ? (
                                    <span className="badge bg-info mr-2">
                                      {" "}
                                      <Link
                                        to={
                                          "/admin/add-user/view/" +
                                          items.username
                                        }
                                      >
                                        {" "}
                                        <FontAwesomeIcon icon={faEye} />{" "}
                                      </Link>{" "}
                                    </span>
                                  ) : null}

                                  {permisionDetails.delete_user === 1 ? (
                                    <span
                                      role="button"
                                      className="badge bg-danger mr-2"
                                    >
                                      {" "}
                                      <FontAwesomeIcon
                                        onClick={() =>
                                          userDisable(
                                            items.username,
                                            items.status
                                          )
                                        }
                                        icon={faBan}
                                      />{" "}
                                    </span>
                                  ) : null}

                                  {type === "Admin" ? (
                                    <span
                                      role="button"
                                      className="badge bg-info "
                                    >
                                      {" "}
                                      <Link
                                        to={
                                          "/admin/add-balance/" +
                                          items.username +
                                          "/" +
                                          items.credit
                                        }
                                      >
                                        {" "}
                                        <FontAwesomeIcon icon={faPlus} /> Add
                                        Balance{" "}
                                      </Link>{" "}
                                    </span>
                                  ) : null}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
