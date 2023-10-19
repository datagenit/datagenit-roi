import React, { useState, useEffect } from "react";
import AdminSideMenu from "../../navbar/AdminSideMenu";
import AdminTopMenu from "../../navbar/AdminTopMenu";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { URL } from "../../common/Url";
import { useSelector } from "react-redux";
import { userid, token, type } from "../../common/AdminAuth";

const AddUser = () => {
  const { username, ip } = useParams();
  const [userParent, setuserParent] = useState([]);
  const [smsc, setSmsc] = useState([]);
  const [AWSsmsc, setAWSsmsc] = useState([]);
  const [server, setServer] = useState();
  const [view, setview] = useState(false);

  const [error, seterror] = useState({
    errarStatus: false,
    errorMessage: "",
    bgcolor: "",
  });

  const [addUser, setaddUser] = useState({
    userName: "",
    password: "",
    throughput: "",
    smsc: "",
    server_ip: "",
    enablePrepaid: "",
    creditAmount: "",
    maxBinds: "",
    WhiteListIP: "",
    alt_route: "",
    name: "",
    email: "",
    mobile: "",
    company: "",
    address: "",
    Parent_id: "",
    send_alt_route: 0,
  });

  let name, value;

  const inputsHandler = (e) => {
    name = e.target.name;
    value = e.target.value;
    setaddUser({ ...addUser, [name]: value });
  };

  const submitButton = () => {
    seterror({
      errarStatus: false,
    });

    fetch(
      `${URL}users-as.php?user_id=${userid}&method=create&alt_route=${addUser.alt_route}&send_alt_route=${addUser.send_alt_route}&system_id=${addUser.userName}&server_ip=${addUser.server_ip}&password=${addUser.password}&throughput=${addUser.throughput}&default_smsc=${addUser.smsc}&enable_prepaid_billing=${addUser.enablePrepaid}&credit=${addUser.creditAmount}&max_binds=${addUser.maxBinds}&connect_allow_ip=${addUser.WhiteListIP}&name=${addUser.name}&email=${addUser.email}&mobile=${addUser.mobile}&company=${addUser.company}&address=${addUser.address}&parent_id=${addUser.Parent_id}&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        if (result.success === true) {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-success",
          });
          window.scrollTo(0, 0);
          setTimeout(function () {
            window.location = "/admin/user-list";
          }, 2000);
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

  const getUserDetails = () => {
    if (username) {
      fetch(
        `${URL}users-as.php?user_id=${userid}&method=retrieveid&id=${username}&token=${token}&user_type=${type}`
      ).then((response) => {
        response.json().then((result) => {
          console.log("result", result);
          if (result.success === true) {
            setaddUser({
              userName: result.data[0].system_id,
              password: result.data[0].password,
              throughput: result.data[0].throughput,
              smsc: result.data[0].default_smsc,
              enablePrepaid: result.data[0].enable_prepaid_billing,
              creditAmount: result.data[0].credit,
              maxBinds: result.data[0].max_binds,
              WhiteListIP: result.data[0].connect_allow_ip,
              name: result.data[0].name,
              email: result.data[0].email,
              mobile: result.data[0].mobile,
              company: result.data[0].company,
              address: result.data[0].address,
              Parent_id: result.data[0].parent_id,
              server_ip: ip,
              send_alt_route: result.data[0].send_alt_route,
              alt_route: result.data[0].ip_route,
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
    }
  };

  const getParentID = () => {
    fetch(
      `${URL}manager.php?user_id=${userid}&method=retrieve&token=${token}`
    ).then((response) => {
      response.json().then((result) => {
        // console.log(result);
        if (result.success === true) {
          setuserParent(result.data);
        } else {
        }
      });
    });
  };

  useEffect(() => {
    let url = window.location.pathname;
    if (url.search("view") >= 0) {
      setview(false);
    } else {
      setview(true);
    }
    getUserDetails();
    getParentID();
    getSMSEDetails();
    getSERVERDetails();
    getawsSMSEDetails();
  }, [username]);

  const updateUserDetails = () => {
    seterror({
      errarStatus: false,
    });

    window.scrollTo(0, 0);

    const UserDetails = {
      user_id: userid,
      system_id: addUser.userName,
      password: addUser.password,
      throughput: addUser.throughput,
      default_smsc: addUser.smsc,
      enable_prepaid_billing: addUser.enablePrepaid,
      credit: addUser.creditAmount,
      max_binds: addUser.maxBinds,
      connect_allow_ip: addUser.WhiteListIP,
      name: addUser.name,
      email: addUser.email,
      mobile: addUser.mobile,
      company: addUser.company,
      id: username,
      address: addUser.address,
      parent_id: addUser.Parent_id,
      server_ip: ip,
      send_alt_route: addUser.send_alt_route,
      alt_route: addUser.alt_route,
      method: "update",
      token: token,
      user_type: type,
    };

    //console.log(UserDetails);

    fetch(`${URL}users-as.php`, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(UserDetails),
    }).then((result) => {
      result.json().then((result) => {
        // console.log(result)
        if (result.success === true) {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-success",
          });
          setTimeout(function () {
            window.location = "/admin/user-list";
          }, 2000);
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

  //const smsc = useSelector((state)=>state.allSMSC.smsc);

  const getSMSEDetails = () => {
    fetch(
      `${URL}smsc.php?user_id=${userid}&method=retrieve&status=1&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        //console.log(result);
        if (result.success === true) {
          setSmsc(result.data);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: "No SMSC Found",
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  const getawsSMSEDetails = () => {
    fetch(
      `${URL}smsc_ec2.php?user_id=${userid}&method=retrieve&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        //console.log(result);
        if (result.success === true) {
          setAWSsmsc(result.data);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: "No SMSC Found",
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  const getSERVERDetails = () => {
    fetch(
      `${URL}server_ip.php?user_id=${userid}&method=retrieve&&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        //console.log(result);
        if (result.success === true) {
          setServer(result.data);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: "No SMSC Found",
            bgcolor: "alert alert-danger",
          });
        }
      });
    });
  };

  const routeHandler = (e) => {
    if (e.target.checked == true) {
      setaddUser({
        ...addUser,
        send_alt_route: 1,
      });
    } else {
      setaddUser({
        ...addUser,
        send_alt_route: 0,
      });
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AdminSideMenu />

        <div className="layout-page">
          <AdminTopMenu />

          <div className="content-wrapper">
            {type === "Admin" ? (
              <div className="container-xxl flex-grow-1 container-p-y">
                <p className="demo-inline-spacing text-right ">
                  <Link className="btn btn-primary me-1" to="/admin/user-list">
                    <FontAwesomeIcon icon={faArrowLeft} /> Go Back
                  </Link>
                </p>

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

                <div className="row">
                  <div className="col-md-12">
                    <div className="card mb-4">
                      <h5 className="card-header">Add New User</h5>
                      <hr className="m-0" />
                      <div className="card-body">
                        <div className="row">
                          {server && (
                            <div className="col-md-6 mb-3">
                              <label
                                htmlFor="defaultFormControlInput"
                                className="form-label"
                              >
                                Server
                              </label>
                              <select
                                name="server_ip"
                                value={addUser.server_ip}
                                onChange={inputsHandler}
                                className="form-select"
                              >
                                <option value="">Select Server </option>
                                {server.map((items, i) => (
                                  <option key={i} value={items.ip}>
                                    {items.server_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div className="col-md-6 mb-3">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              {" "}
                              Select Parent
                            </label>
                            <select
                              name="Parent_id"
                              value={addUser.Parent_id}
                              onChange={inputsHandler}
                              className="form-select"
                            >
                              <option value="">Select Parent </option>
                              {userParent.map((items, i) => (
                                <option key={i} value={items.id}>
                                  {items.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              User Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="userName"
                              disabled={username ? true : false}
                              value={addUser.userName}
                              onChange={inputsHandler}
                              id="defaultFormControlInput"
                              placeholder="username"
                              aria-describedby="defaultFormControlHelp"
                            />
                          </div>

                          <div className="col-md-6">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              Password
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="password"
                              value={addUser.password}
                              onChange={inputsHandler}
                              id="defaultFormControlInput"
                              placeholder="Enter Password"
                              aria-describedby="defaultFormControlHelp"
                            />
                            <div
                              id="defaultFormControlHelp"
                              className="form-text text-info"
                            >
                              Password length should be min 4 and max 8
                              Characters.
                            </div>
                          </div>

                          <div className="col-md-6 mt-3">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              Throughput(TPS)
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="throughput"
                              value={addUser.throughput}
                              onChange={inputsHandler}
                              id="defaultFormControlInput"
                              placeholder="Example : 1, 20"
                              aria-describedby="defaultFormControlHelp"
                            />
                            <div
                              id="defaultFormControlHelp"
                              className="form-text text-info"
                            >
                              Throughput should be between 1 and 500
                            </div>
                          </div>

                          <div className="col-md-6  mt-3">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              {" "}
                              Default SMSC
                            </label>

                            {addUser.server_ip === "13.126.120.252" && (
                              <select
                                name="smsc"
                                value={addUser.smsc}
                                onChange={inputsHandler}
                                className="form-select"
                              >
                                <option value="">Select SMSC </option>
                                {smsc.map((items, i) => (
                                  <option key={i} value={items.username}>
                                    {items.title}
                                  </option>
                                ))}
                              </select>
                            )}

                            {addUser.server_ip === "52.66.197.178" && (
                              <select
                                name="smsc"
                                value={addUser.smsc}
                                onChange={inputsHandler}
                                className="form-select"
                              >
                                <option value="">Select SMSC </option>
                                {AWSsmsc.map((items, i) => (
                                  <option key={i} value={items.username}>
                                    {items.title}
                                  </option>
                                ))}
                              </select>
                            )}

                            <div
                              id="defaultFormControlHelp"
                              className="form-text"
                            >
                              Please select server
                            </div>
                          </div>

                          {addUser.smsc === "IPRoute" && (
                            <div className="options-box">
                              <div className="col-md-6">
                                <div className="form-check">
                                  <input
                                    onChange={routeHandler}
                                    defaultChecked={
                                      addUser.send_alt_route ? true : false
                                    }
                                    name="send_alt_route"
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexCheckChecked"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="flexCheckChecked"
                                  >
                                    Send from other route
                                  </label>
                                </div>
                              </div>

                              {addUser.send_alt_route === 1 && (
                                <div className="col-md-6">
                                  {addUser.server_ip === "13.126.120.252" && (
                                    <select
                                      name="alt_route"
                                      value={addUser.alt_route}
                                      onChange={inputsHandler}
                                      className="form-select"
                                    >
                                      <option value="">Select SMSC </option>
                                      {smsc.map((items, i) => (
                                        <option key={i} value={items.username}>
                                          {items.title}
                                        </option>
                                      ))}
                                    </select>
                                  )}

                                  {addUser.server_ip === "52.66.197.178" && (
                                    <select
                                      name="alt_route"
                                      value={addUser.alt_route}
                                      onChange={inputsHandler}
                                      className="form-select"
                                    >
                                      <option value="">Select SMSC </option>
                                      {AWSsmsc.map((items, i) => (
                                        <option key={i} value={items.username}>
                                          {items.title}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          <div className="col-md-6  mt-3">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              {" "}
                              Billing Type
                            </label>
                            <select
                              name="enablePrepaid"
                              value={addUser.enablePrepaid}
                              onChange={inputsHandler}
                              className="form-select"
                            >
                              <option>Select Billing </option>
                              <option value="1">Prepaid</option>
                              <option value="0">Postpaid</option>
                            </select>
                          </div>

                          <div className="col-md-6 mt-3">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              Credit Amount
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="creditAmount"
                              value={addUser.creditAmount}
                              onChange={inputsHandler}
                              id="defaultFormControlInput"
                              placeholder="Amount 10000"
                              aria-describedby="defaultFormControlHelp"
                            />
                          </div>

                          <div className="col-md-6 mt-3">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              Max Binds
                            </label>
                            <select
                              name="maxBinds"
                              value={addUser.maxBinds}
                              onChange={inputsHandler}
                              className="form-select"
                            >
                              <option>Max Binds </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </div>

                          <div className="col-md-6 mt-3">
                            <label
                              htmlFor="defaultFormControlInput"
                              className="form-label"
                            >
                              White list IP Address
                            </label>
                            <input
                              name="WhiteListIP"
                              value={addUser.WhiteListIP}
                              onChange={inputsHandler}
                              type="text"
                              className="form-control"
                              id="defaultFormControlInput"
                              placeholder="Example : 10.126.3.4"
                              aria-describedby="defaultFormControlHelp"
                            />
                          </div>
                        </div>

                        <hr className="mt-5" />
                        <div className="row">
                          <div className="col-md-6 mt-3">
                            <label>Full Name</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                readOnly={username ? true : false}
                                value={addUser.name}
                                onChange={inputsHandler}
                                placeholder="Enter Full Name"
                              />
                            </div>
                          </div>

                          <div className="col-md-6 mt-3">
                            <label>Email Address</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                name="email"
                                readOnly={username ? true : false}
                                value={addUser.email}
                                onChange={inputsHandler}
                                placeholder="Example:www@gmail.com "
                              />
                            </div>
                          </div>

                          <div className="col-md-6 mt-3">
                            <label>Mobile Number</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                name="mobile"
                                value={addUser.mobile}
                                onChange={inputsHandler}
                                placeholder="+91 XXXXXXXX"
                                readOnly={username ? true : false}
                              />
                            </div>
                          </div>

                          <div className="col-md-6 mt-3">
                            <label>Company Name</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                name="company"
                                value={addUser.company}
                                onChange={inputsHandler}
                                readOnly={username ? true : false}
                                placeholder="Company Private Limited"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 mt-3">
                            <label>Address In Detail</label>
                            <div className="input-group">
                              <textarea
                                className="form-control"
                                name="address"
                                value={addUser.address}
                                readOnly={username ? true : false}
                                onChange={inputsHandler}
                                placeholder="Please Enter Full Address"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 text-right">
                          {username ? (
                            <>
                              {view ? (
                                <button
                                  type="button"
                                  onClick={updateUserDetails}
                                  className="btn btn-primary mt-5"
                                >
                                  Update Details
                                </button>
                              ) : null}
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={submitButton}
                              className="btn btn-primary mt-5"
                            >
                              Add User
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
