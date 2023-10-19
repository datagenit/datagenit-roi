import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../navbar/AdminSideMenu'
import AdminTopMenu from '../navbar/AdminTopMenu'
import { Link } from 'react-router-dom';
import { URL, URLEC2 } from '../common/Url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { userid, token, type } from '../common/AdminAuth';

const Index = () => {

  const [error, seterror] = useState({
    errarStatus: false,
    errorMessage: '',
    bgcolor: ''
  });

  var date = new Date()
  var todatdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);
  const [DateFrom, setDateFrom] = useState(todatdate);
  const [DateTo, setDateTo] = useState(todatdate);
  const [isloading, setisloading] = useState(false);
  const [report, setreport] = useState('all');
  const [messageCount, setmessageCount] = useState({
    totalSuccess: 0,
    totalFaild: 0,
    totalTotal: 0
  });


  const adminDashboardData = async () => {
    setisloading(true)
    switch (report) {
      case "do":
        var url = [
          fetch(`${URL}report.php?user_id=${userid}&method=admin_dashboard_count&date_from=${DateFrom}&date_to=${DateTo}&token=${token}&user_type=${type}`)
        ]
        break;
      case 'ec2':
        var url = [
          fetch(`${URLEC2}ec2/report.php?user_id=${userid}&method=admin_dashboard_count&date_from=${DateFrom}&date_to=${DateTo}&token=${token}&user_type=${type}`)
        ]
        break;
      default:
        var url = [
          fetch(`${URL}report.php?user_id=${userid}&method=admin_dashboard_count&date_from=${DateFrom}&date_to=${DateTo}&token=${token}&user_type=${type}`),
          fetch(`${URLEC2}ec2/report.php?user_id=${userid}&method=admin_dashboard_count&date_from=${DateFrom}&date_to=${DateTo}&token=${token}&user_type=${type}`)
        ]
    }
    try {
      let result = await Promise.all(url);
      let data = await Promise.all(result.map((items) => {
        return items.json();
      }))
      var totalSuccess = 0;
      var totalFaild = 0;
      var totalTotal = 0;
      data.map((items) => {
        if (items.success === true) {
          totalSuccess = totalSuccess + parseInt(items.data.delivered)
          totalFaild = totalFaild + parseInt(items.data.failed)
          totalTotal = totalTotal + parseInt(items.data.other) + parseInt(items.data.failed) + parseInt(items.data.delivered)
        } else {
          setmessageCount({
            totalSuccess: '0',
            totalFaild: '0',
            totalTotal: '0',
          })
        }
      })
      setmessageCount({
        totalSuccess: totalSuccess,
        totalFaild: totalFaild,
        totalTotal: totalTotal,
      })
      setisloading(false);
    } catch (e) {
      console.log('error', e);
    }
  }

  const reportHandler = (e) => {
    setreport(e.target.value)
    setmessageCount({
      totalSuccess: '',
      totalFaild: '',
      totalTotal: '',
    })
  }

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        <AdminSideMenu />

        <div className="layout-page">

          <AdminTopMenu />

          <div className="content-wrapper ">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className=''>
                {
                  error.errarStatus ?
                    <div className={error.bgcolor} role="alert">
                      <strong>Alert!</strong> {error.errorMessage}

                    </div>
                    :
                    null
                }
              </div>

              <div className="row">
                <div className='container-p-y'>

                  <div className='d-flex justify-content-between'>
                    <h4 className="fw-bold pb-3"><span className="text-muted fw-light">Today </span> Report</h4>

                    {/* <div className="col-md-2">
                      <div className="input-group">
                        <select onChange={reportHandler} name='selected-user' className='form-select'>
                          <option value="all">All </option>
                          <option value="do"> Report DO Only </option>
                          <option value="ec2">Report EC2 Only </option>
                        </select>
                      </div>
                    </div> */}
                  </div>

                  <div className="row">
                    <div className='container-p-y'>
                      <div className="row">
                        <div className="col-lg-4 col-md-12 col-12 mb-4">
                          <div className="card">
                            <div className="card-body">

                              <span className="fw-semibold d-block mb-1">Total </span>
                              {isloading ?
                                <div className="spinner-grow text-primary" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                                :
                                <h3 className="card-title mb-2">{messageCount.totalTotal ? messageCount.totalTotal : <FontAwesomeIcon onClick={() => adminDashboardData()} role='button' icon={faRedoAlt} />}</h3>
                              }

                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-12 col-12 mb-4">
                          <div className="card">
                            <div className="card-body">
                              <span className='fw-semibold d-block mb-1'> Delivered</span>
                              {isloading ?
                                <div className="spinner-grow text-success" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                                :
                                <h3 className="card-title text-success text-nowrap mb-1">{messageCount.totalSuccess ? messageCount.totalSuccess : <FontAwesomeIcon onClick={() => adminDashboardData()} role='button' icon={faRedoAlt} />}</h3>
                              }
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-12 col-12 mb-4">
                          <div className="card">
                            <div className="card-body">
                              <span className='fw-semibold d-block mb-1'>Failed</span>
                              {isloading ?
                                <div className="spinner-grow text-danger" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                                :
                                <h3 className="card-title text-nowrap text-danger mb-1">{messageCount.totalFaild ? messageCount.totalFaild : <FontAwesomeIcon onClick={() => adminDashboardData()} role='button' icon={faRedoAlt} />}</h3>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-4 order-0">
                  <div className="card">
                    <div className="d-flex align-items-end row">
                      <div className="col-sm-7">
                        <div className="card-body">
                          <h5 className="card-title text-primary">Welcome Admin! 🎉</h5>
                          <p className="mb-4">
                            Quick Access Of <span className="fw-bold"> User </span>
                          </p>
                          <Link to="/admin/user-list" className="btn btn-sm btn-primary mr-1">View All User List</Link>
                          <Link to="/admin/summary-report" className="btn btn-sm btn-primary mr-1">User Summary</Link>
                          <Link to="/admin/add-user" className="btn btn-sm btn-primary mr-1">Add User</Link>
                        </div>
                      </div>
                      <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                          <img
                            src="../img/illustrations/man-with-laptop-light.png"
                            height="140"
                            alt="View Badge User"
                            data-app-dark-img="illustrations/man-with-laptop-dark.png"
                            data-app-light-img="illustrations/man-with-laptop-light.png"
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
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

export default Index;