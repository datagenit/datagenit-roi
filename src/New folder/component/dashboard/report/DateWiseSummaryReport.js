import React, { useState, useEffect } from "react";
import DashboardSideMenu from "../../navbar/DashboardSideMenu";
import DashboardTopMenu from "../../navbar/DashboardTopMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { URL } from "../../common/Url";
import { Link } from "react-router-dom";
import { userid, token, type } from "../../common/UserAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import { customTableStylesForSummery } from "../../common/customTableStyles";

const DateWiseSummaryReport = () => {
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
  const [pending, setPending] = React.useState(true);
  const [summaryReportData, setsummaryReportData] = useState([]);
  const [selectedSernderId, setselectedSernderId] = useState("");
  const [sernderIdlist, setsernderIdlist] = useState([]);
  const [newSummeryData, setnewSummeryData] = useState([]);
  const [datewiseSummeryData, setdatewiseSummeryData] = useState([]);
  const [isloading, setisloading] = useState(false);

  const summaryReport = () => {
    seterror({ errarStatus: false });
    setisloading(true);
    ShowsummaryReportData("");
    fetch(
      `${URL}report.php?user_id=${userid}&method=summarynew&date_from=${DateFrom}&date_to=${DateTo}&senderid=${selectedSernderId}&token=${token}&user_type=${type}`
    ).then((response) => {
      response.json().then((result) => {
        // console.log('summaryReport', result);
        if (result.success === true) {
          setsummaryReportData(result.data);
          ShowsummaryReportData(result.data);
          // getSenderIDList(result.data);
          setPending(false);
          setisloading(false);
        } else {
          setisloading(false);
          seterror({
            errarStatus: true,
            errorMessage: result.message,
            bgcolor: "alert alert-danger",
          });
          setPending(false);
          ShowsummaryReportData("");
        }
      });
    });
  };

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

  const ShowsummaryReportData = (data) => {
    let DataMap = [];
    Object.keys(data).forEach((username) =>
      // DataMap.push({'username':username})
      Object.keys(data[username]).forEach((date) =>
        //  DataMap.push({'date':date})
        Object.keys(data[username][date]).forEach((sernderID) =>
          DataMap.push(
            Object.assign({
              username: username,
              sernderid: sernderID,
              date: date,
              count: data[username][date][sernderID],
            })
          )
        )
      )
    );
    summerywiseData(DataMap);
  };

  const summerywiseData = (DataMap) => {
    console.log("DataMap", DataMap);
    let dateWiseUniqueData = [];

    DataMap.map((item) => {
      let valueOfIndexOf = dateWiseUniqueData
        .map((el) => el.date)
        .indexOf(item.date);
      if (valueOfIndexOf >= 0) {
        dateWiseUniqueData[valueOfIndexOf].count.delivered =
          parseInt(
            dateWiseUniqueData[valueOfIndexOf].count.delivered
              ? dateWiseUniqueData[valueOfIndexOf].count.delivered
              : 0
          ) + parseInt(item.count.delivered ? item.count.delivered : 0);

        dateWiseUniqueData[valueOfIndexOf].count.failed =
          parseInt(
            dateWiseUniqueData[valueOfIndexOf].count.failed
              ? dateWiseUniqueData[valueOfIndexOf].count.failed
              : 0
          ) + parseInt(item.count.failed ? item.count.failed : 0);

        dateWiseUniqueData[valueOfIndexOf].count.other =
          parseInt(
            dateWiseUniqueData[valueOfIndexOf].count.other
              ? dateWiseUniqueData[valueOfIndexOf].count.other
              : 0
          ) + parseInt(item.count.other ? item.count.other : 0);
      } else {
        dateWiseUniqueData.push(item);
      }
    });

    setnewSummeryData(dateWiseUniqueData);
    setdatewiseSummeryData(dateWiseUniqueData);
  };

  const columnsDatewise = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      wrap: true,
    },
    {
      name: "User Name",
      cell: (item) => (
        <Link
          to={
            "/dashboard/serderid-details-report/" +
            item.sernderid +
            "/" +
            DateFrom +
            "/" +
            DateTo
          }
          className="text-primary"
        >
          {item.username}{" "}
        </Link>
      ),
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Sender ID",
      cell: (item) => (
        <Link
          to={
            "/dashboard/serderid-details-report/" +
            item.sernderid +
            "/" +
            DateFrom +
            "/" +
            DateTo
          }
          className="text-primary"
        >
          {item.sernderid}{" "}
        </Link>
      ),
      selector: (row) => row.sernderid,
      sortable: true,
    },
    {
      name: "Total Sent",
      cell: (item) => (
        <span className="text-success">
          {parseInt(item.count.delivered || 0) +
            parseInt(item.count.failed || 0) +
            parseInt(item.count.other || 0)}{" "}
        </span>
      ),
      selector: (row) =>
        parseInt(row.count.delivered || 0) +
        parseInt(row.count.failed || 0) +
        parseInt(row.count.other || 0),
      sortable: true,
    },
    {
      name: "Total Delivered",
      cell: (e) => (
        <span className="text-success">{e.count.delivered || 0} </span>
      ),
      selector: (row) => parseInt(row.count.delivered || 0),
      sortable: true,
    },
    {
      name: "Total Failed",
      selector: "dateOfAction",
      cell: (e) => <span className="text-danger">{e.count.failed || 0} </span>,
      selector: (row) => parseInt(row.count.failed || 0),
      sortable: true,
    },
  ];

  const totalSent = () => {
    let tot = 0;
    newSummeryData.map(function (arr) {
      tot =
        tot +
        parseInt(arr.count.delivered || 0) +
        parseInt(arr.count.failed || 0) +
        parseInt(arr.count.other || 0);
    });
    return tot;
  };

  const totalDelivered = () => {
    let tot = 0;
    newSummeryData.map(function (arr) {
      tot = tot + parseInt(arr.count.delivered || 0);
    });
    return tot;
  };

  const totalFailed = () => {
    let tot = 0;
    newSummeryData.map(function (arr) {
      tot = tot + parseInt(arr.count.failed || 0);
    });
    return tot;
  };

  const oneDayBefore = new Date();
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);

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
                            <select disabled className="form-select">
                              <option value="datewise">Date Wise </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="text-right">
                            {isloading ? (
                              <button
                                className="btn btn-primary"
                                type="button"
                                disabled
                              >
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>{" "}
                                Loading...
                              </button>
                            ) : (
                              <button
                                onClick={summaryReport}
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

                <div className="row">
                  <div className="container-p-y">
                    <div className="row">
                      <div className="col-lg-4 col-md-12 col-12 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <span className="fw-semibold d-block mb-1">
                              Total Sent{" "}
                            </span>

                            <h3 className="card-title mb-2">{totalSent()}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-12 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <span className="fw-semibold d-block mb-1">
                              {" "}
                              Delivered
                            </span>
                            <h3 className="card-title text-success text-nowrap mb-1">
                              {totalDelivered()}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12 col-12 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <span className="fw-semibold d-block mb-1">
                              Failed
                            </span>
                            <h3 className="card-title text-nowrap text-danger mb-1">
                              {totalFailed()}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-4 order-1">
                  {error.errarStatus ? (
                    <div className={error.bgcolor} role="alert">
                      <strong>Alert!</strong> {error.errorMessage}
                    </div>
                  ) : null}

                  <div className="">
                    <div className="card pb-5">
                      <h5 className="card-header">Summary Report</h5>
                      <DataTable
                        pagination
                        handleSort
                        columns={columnsDatewise}
                        data={datewiseSummeryData}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        customStyles={customTableStylesForSummery}
                        noDataComponent={
                          "Click on search button to get data Date Wise"
                        }
                      />
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

export default DateWiseSummaryReport;
