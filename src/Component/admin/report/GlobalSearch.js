import React, { useState, useEffect } from "react";
import AdminSideMenu from "../../navbar/AdminSideMenu";
import AdminTopMenu from "../../navbar/AdminTopMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { URL } from "../../common/Url";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../common/customTableStyles";
import { userid, token, type } from "../../common/AdminAuth";
import { useParams } from "react-router-dom";

const GlobalSearch = () => {
  let { setuserid, setsernderid, dateform, dateto } = useParams();

  const [error, seterror] = useState({
    errarStatus: false,
    errorMessage: "",
    bgcolor: "",
  });

  var date = new Date();
  var todatdate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  const [DateFrom, setDateFrom] = useState(todatdate);
  const [DateTo, setDateTo] = useState(todatdate);
  const [showDateFrom, setshowDateFrom] = useState(null);
  const [showDateTo, setshowDateTo] = useState(null);
  const [userList, setuserList] = useState([]);
  const [selectedUser, setselectedUser] = useState(setuserid || "");
  const [mobile, setmobile] = useState("");
  const [senderid, setsenderid] = useState(setsernderid || "");
  const [detailsReportData, setdetailsReportData] = useState([]);
  const [deliveredReportData, setdeliveredReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [pending, setPending] = React.useState(true);

  const detailsReport = () => {
    setdetailsReportData([]);
    setIsLoading(true);
    fetch(
      `${URL}report.php?user_id=${userid}&method=number_search&date_from=${DateFrom}&date_to=${DateTo}&search_user_id=${selectedUser}&senderid=${senderid}&mobile=${mobile}&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        // console.log(result);
        if (result.success === true) {
          seterror({ errarStatus: false });
          setdetailsReportData(result.message);
          setIsLoading(false);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
          setIsLoading(false);
        }
      });
    });
  };

  const deliveredReport = (message_id, dateTime) => {
    setdeliveredReportData([]);
    fetch(
      `${URL}report.php?user_id=${userid}&method=delivery_status&message_id=${message_id}&token=${token}&user_type=${type}&submit_date=${dateTime}`
    ).then((response) => {
      response.json().then((result) => {
        if (result.success === true) {
          setdeliveredReportData(result.data);
        }
      });
    });
  };

  // const getUserDetails = () => {
  //     fetch(`${URL}users.php?user_id=${userid}&method=retrieve&token=${token}&user_type=${type}`).then((response) => {
  //         response.json().then((result) => {
  //            // console.log('user List', result);
  //             if (result.success === true) {
  //                 setuserList(result.data)
  //                 setPending(false)
  //             } else {
  //                 seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
  //             }
  //         })
  //     })
  // }

  // useEffect(() => {
  //     getUserDetails();
  // }, [])

  const handleDateFrom = (date) => {
    let dated =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    setDateFrom(dated);
    setshowDateFrom(date);
  };

  const handleDateTo = (date) => {
    let dated =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    setDateTo(dated);
    setshowDateTo(date);
  };

  const userhandlar = (e) => {
    setselectedUser(e.target.value);
  };

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.system_id,
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row) => row.msisdn,
      width: "150px",
      sortable: true,
    },
    {
      name: "Route",
      selector: (row) => row.smsc_id,
      sortable: true,
    },
    {
      name: "HEADER",
      selector: (row) => row.sender,
      sortable: true,
    },
    {
      name: "SUBMIT TIME",
      selector: (row) => row.sent_date,
      sortable: true,
      wrap: true,
    },
    {
      name: "Check Report",
      cell: (e) => (
        <span
          onClick={() => deliveredReport(e.message_id, e.sent_date)}
          data-toggle="modal"
          role="button"
          data-target="#exampleModal"
          className="badge bg-info mr-2"
        >
          {" "}
          <FontAwesomeIcon icon={faRedoAlt} /> Report{" "}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Count",
      selector: (row) => (row.sms_split === 0 ? "1" : row.sms_split),
      sortable: true,
      width: "100px",
    },
    {
      name: "MESSAGE",
      selector: (row) => row.message_text,
      wrap: true,
      width: "500px",
      fontSize: "12px",
    },
    {
      name: "Meta Data",
      selector: (row) => row.meta_data,
      wrap: true,
      width: "500px",
      fontSize: "12px",
    },
  ];

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AdminSideMenu />
        <div className="layout-page">
          <AdminTopMenu />
          <div className="content-wrapper">
            <div className="container-xxl container-p-y">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card  mb-4">
                    <h5 className="card-header">Filter Options</h5>

                    <div className="card-body ">
                      <div className="row gy-3">
                        {/* <div className="col-md-2">
                                                <label>Users</label>
                                                    <div className="input-group">

                                                        <select value={selectedUser} onChange={userhandlar} name='selected-user' className='form-select'>
                                                            <option value="">Select User </option>
                                                            {userList.map((items, i) =>
                                                                <option value={items.system_id}>{items.system_id}</option>
                                                            )}
                                                        </select>

                                                    </div>
                                                </div> */}

                        <div className="col-md-2">
                          <label>From Date</label>
                          <div className="">
                            <DatePicker
                              className="form-control btn-block"
                              dateFormat="MM/dd/yyyy"
                              selected={showDateFrom}
                              onChange={handleDateFrom}
                              placeholderText={todatdate}
                            />
                          </div>
                        </div>
                        <div className="col-md-2">
                          <label> Date To</label>
                          <div className="input-group">
                            <DatePicker
                              className="form-control btn-block"
                              dateFormat="MM/dd/yyyy"
                              selected={showDateTo}
                              onChange={handleDateTo}
                              placeholderText={todatdate}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <label>Mobile</label>
                          <div className="input-group">
                            <input
                              type="text"
                              onChange={(e) => setmobile(e.target.value)}
                              className="form-control"
                              placeholder="Enter mobile Number"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <label>Sender ID</label>
                          <div className="input-group">
                            <input
                              type="text"
                              value={senderid}
                              onChange={(e) => setsenderid(e.target.value)}
                              className="form-control"
                              placeholder="Enter Sender ID"
                            />
                          </div>
                        </div>

                        <div className="col-md-9"></div>
                        <div className="col-md-3">
                          <div className="input-group">
                            {isLoading ? (
                              <button className="btn btn-block btn-primary me-1">
                                <FontAwesomeIcon icon={faSearch} /> Loading...
                              </button>
                            ) : (
                              <button
                                onClick={detailsReport}
                                className="btn btn-block btn-primary me-1"
                              >
                                <FontAwesomeIcon icon={faSearch} /> Search
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-4 order-1">
                  <div className="">
                    {error.errarStatus ? (
                      <div className={error.bgcolor} role="alert">
                        <strong>Alert!</strong> {error.errorMessage}
                      </div>
                    ) : null}

                    {detailsReportData.length > 0 && (
                      <div className="card pb-5">
                        <h5 className="card-header">Summary Report</h5>

                        <DataTable
                          pagination
                          handleSort
                          columns={columns}
                          data={detailsReportData}
                          paginationRowsPerPageOptions={[10, 25, 50, 100]}
                          customStyles={customTableStyles}
                          noDataComponent="Please Select Filter Options"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delivery Report
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-striped">
                <thead>
                  <tr style={{ fontSize: "13px" }}>
                    <th scope="col">Delivery Status</th>
                    <th scope="col">Submit Time</th>
                    <th scope="col">Delivery Time</th>
                    <th scope="col">DLR Reason</th>
                    <th scope="col">DLR Code</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveredReportData.length > 0 ? (
                    <>
                      {deliveredReportData.map((items, i) => (
                        <>
                          <tr style={{ fontSize: "13px" }} key={i}>
                            <td>
                              {" "}
                              <strong>
                                {" "}
                                {items.delivery_status === "success" ? (
                                  <span className="text-success">
                                    {items.delivery_status}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    {items.delivery_status}
                                  </span>
                                )}
                              </strong>
                            </td>
                            <td> {items.submit_time}</td>
                            <td>{items.delivery_time}</td>
                            <td>{items.dlr_reason}</td>
                            <td>{items.dlr_code}</td>
                          </tr>
                        </>
                      ))}
                    </>
                  ) : (
                    <tr style={{ fontSize: "13px", textAlign: "center" }}>
                      <td colSpan={5}>
                        {" "}
                        <strong>
                          {" "}
                          <span className="text-info">DLR Awaited....</span>
                        </strong>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
