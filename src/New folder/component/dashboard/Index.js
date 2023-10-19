import React, { useState, useEffect } from 'react';
import DashboardSideMenu from '../navbar/DashboardSideMenu'
import DashboardTopMenu from '../navbar/DashboardTopMenu'
import { userid, token, name, type } from '../common/UserAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

import { URL } from '../common/Url';

const Index = () => {

  const [error, seterror] = useState({
    errarStatus: false,
    errorMessage: '',
    bgcolor: ''
  });

  const [messageCount, setmessageCount] = useState({
    totalSuccess: 0,
    totalFaild: 0,
    totalTotal: 0
  });

  var date = new Date()
  var todatdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);
  const [DateFrom, setDateFrom] = useState(todatdate);
  const [DateTo, setDateTo] = useState(todatdate);
  const [isloading, setisloading] = useState(false);

  const dashboardData = () => {
    setisloading(true)
    fetch(`${URL}report.php?user_id=${userid}&method=user_dashboard_count&message_id=${userid}&date_from=${DateFrom}&date_to=${DateTo}&token=${token}&user_type=${type}`).then((response) => {
      response.json().then((result) => {
         console.log(result);
        if (result.success === true) {
          setmessageCount({
            totalSuccess: result.data.delivered,
            totalFaild: result.data.failed,
            totalTotal: parseInt(result.data.other) + parseInt(result.data.failed) + parseInt(result.data.delivered),
          })
          setisloading(false)
        }else{
          setmessageCount({
            totalSuccess: '0',
            totalFaild: '0',
            totalTotal: '0',
          })
          setisloading(false)
        }
      })
    })
  }


  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        <DashboardSideMenu />

        <div className="layout-page">

          <DashboardTopMenu />

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-12 mb-4 order-0">
                  <div className="card">
                    <div className="d-flex align-items-end row">
                      <div className="col-sm-7">
                        <div className="card-body">
                          <h5 className="card-title m-0 text-primary">Welcome {name} ! 🎉</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="fw-bold m-0"><span className="text-muted fw-light">Today </span> Report</h4>

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
                          <h3 className="card-title mb-2">{messageCount.totalTotal ? messageCount.totalTotal : <FontAwesomeIcon onClick={()=> dashboardData()} role='button'  icon={faRedoAlt} />
                          } </h3> 
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
                          :<h3 className="card-title text-success text-nowrap mb-1">{messageCount.totalSuccess ? messageCount.totalSuccess : <FontAwesomeIcon  onClick={()=> dashboardData()} role='button' icon={faRedoAlt} />}</h3>
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
                          <h3 className="card-title text-nowrap text-danger mb-1">{messageCount.totalFaild ? messageCount.totalFaild :  <FontAwesomeIcon onClick={()=> dashboardData()} role='button'  icon={faRedoAlt} />}</h3>
                          }
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