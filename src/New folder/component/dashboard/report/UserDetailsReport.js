import React, { useState, useEffect } from "react";
import DashboardSideMenu from "../../navbar/DashboardSideMenu";
import DashboardTopMenu from "../../navbar/DashboardTopMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { URL } from "../../common/Url";
import { userid, token, type } from "../../common/UserAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../../common/customTableStyles";
import { useParams } from "react-router-dom";

const DetailsReport = () => {
  let { header } = useParams();

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
  const [mobile, setmobile] = useState("");
  const [senderid, setsenderid] = useState("");
  const [detailsReportData, setdetailsReportData] = useState([]);
  const [deliveredReportData, setdeliveredReportData] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [deliveredReportMmobile, setdeliveredReportMmobile] = useState("");

  const detailsReport = () => {
    setPending(true);
    let newmobile = mobile.trim();
    fetch(
      `${URL}report.php?user_id=${userid}&method=details&date_from=${DateFrom}&date_to=${DateTo}&senderid=${senderid}&mobile=${newmobile}&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        // console.log('detailsReport',result);
        if (result.success === true) {
          setPending(false);
          seterror({ errarStatus: false });
          setdetailsReportData(result.message);
        } else {
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
          setdetailsReportData([]);
          setPending(false);
        }
      });
    });
  };

  const deliveredReport = (message_id, dateTime, mobile) => {
    setdeliveredReportData([]);
    setdeliveredReportMmobile(mobile);
    fetch(
      `${URL}report.php?user_id=${userid}&method=delivery_status&message_id=${message_id}&token=${token}&user_type=${type}&submit_date=${dateTime}`
    ).then((response) => {
      response.json().then((result) => {
        if (result.success === true) {
          setdeliveredReportData(result.data);
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
    detailsReport();
  }, []);

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
          onClick={() => deliveredReport(e.message_id, e.sent_date, e.msisdn)}
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
  ];

  const oneDayBefore = new Date();

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <DashboardSideMenu />
        <div className="layout-page">
          <DashboardTopMenu />
          <div className="content-wrapper">
            <div className="container-xxl container-p-y">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card mb-4">
                    <h5 className="card-header">Filter Options</h5>

                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-md-3">
                          <div className="input-group">
                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              id="button-addon2"
                            >
                              {" "}
                              From{" "}
                            </button>
                            <DatePicker
                              className="form-control btn-block"
                              dateFormat="MM/dd/yyyy"
                              selected={showDateFrom}
                              onChange={handleDateFrom}
                              maxDate={oneDayBefore}
                              placeholderText={todatdate}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-group">
                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              id="button-addon2"
                            >
                              {" "}
                              To
                            </button>
                            <DatePicker
                              className="form-control btn-block"
                              dateFormat="MM/dd/yyyy"
                              selected={showDateTo}
                              onChange={handleDateTo}
                              maxDate={oneDayBefore}
                              placeholderText={todatdate}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="input-group">
                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              id="button-addon2"
                            >
                              Mobile
                            </button>
                            <input
                              type="text"
                              onChange={(e) => setmobile(e.target.value)}
                              className="form-control"
                              placeholder="Enter mobile Number"
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="input-group">
                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              id="button-addon2"
                            >
                              Sender ID
                            </button>
                            <input
                              type="text"
                              value={senderid}
                              onChange={(e) => setsenderid(e.target.value)}
                              className="form-control"
                              placeholder="Enter Sender ID"
                            />
                          </div>
                        </div>

                        <div className="col-md-12 text-right">
                          <div className="">
                            <button
                              onClick={detailsReport}
                              className="btn btn-primary me-1"
                            >
                              <FontAwesomeIcon icon={faSearch} /> Search
                            </button>
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

                    <div className="card pb-5">
                      <h5 className="card-header">Details Report</h5>

                      <DataTable
                        pagination
                        handleSort
                        columns={columns}
                        data={detailsReportData}
                        progressPending={pending}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        customStyles={customTableStyles}
                        noDataComponent={" No record on this Date " + todatdate}
                      />
                    </div>
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
              <p className="modal-title" id="exampleModalLabel">
                Delivery Report of <strong>{deliveredReportMmobile}</strong>
              </p>
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
                  {deliveredReportData.length === 0 ? (
                    <>
                      <tr className="text-center">
                        <td colspan="5">Wait for Delivery Report....</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {deliveredReportData.map((items, i) => (
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
                      ))}
                    </>
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

export default DetailsReport;
