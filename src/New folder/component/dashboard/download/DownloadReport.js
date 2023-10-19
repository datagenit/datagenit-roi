import React, { useState, useEffect } from 'react';
import DashboardSideMenu from '../../navbar/DashboardSideMenu'
import DashboardTopMenu from '../../navbar/DashboardTopMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { URL } from '../../common/Url';
import { userid, token, type, serverip } from '../../common/UserAuth'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DownloadReport = () => {

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [userList, setuserList] = useState([]);

    var date = new Date()
    var todatdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);

    const [DateFrom, setDateFrom] = useState(todatdate);
    const [DateTo, setDateTo] = useState(todatdate);
    const [showDateFrom, setshowDateFrom] = useState(null);
    const [showDateTo, setshowDateTo] = useState(null);

    const createDowloadReport = () => {
        fetch(`${URL}download_centre.php?user_id=${userid}&method=create&startdate=${DateFrom}&enddate=${DateTo}&token=${token}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
                //  console.log(result);
                if (result.success === true) {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-success' });
                    downloadcenter();
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })
    }

    const downloadcenter = () => {
        fetch(`${URL}download_centre.php?user_id=${userid}&method=retrieve&token=${token}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
                // console.log(result);
                if (result.success === true) {
                    setuserList(result.data)
                }
            })
        })
    }

    useEffect(() => {
        downloadcenter();
    }, [])

    const handleDateFrom = (date) => {
        let dated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);
        setDateFrom(dated);
        setshowDateFrom(date);
    };

    const handleDateTo = (date) => {
        let dated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);
        setDateTo(dated);
        setshowDateTo(date)
    };

    const oneDayBefore = new Date();
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);

    const download = (url) => {
        window.location.href = url;
    }

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

                                    {
                                        error.errarStatus ?
                                            <div className={error.bgcolor} role="alert">
                                                <strong>Alert!</strong> {error.errorMessage}
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            :
                                            null
                                    }

                                    <div className="card mb-4">
                                        <h5 className="card-header">Request New Download</h5>
                                        <div className="card-body">
                                            <div className='row gy-3'>

                                                <div className="col-md-3">
                                                    <div className="input-group">
                                                        <select className='form-select'>
                                                            <option>Select Account</option>
                                                            <option>Account</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="input-group">
                                                        <button className="btn btn-outline-primary" type="button" id="button-addon2"> From </button>
                                                        <DatePicker className="form-control btn-block"
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
                                                        <button className="btn btn-outline-primary" type="button" id="button-addon2"> To</button>
                                                        <DatePicker className="form-control btn-block"
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
                                                        <button onClick={createDowloadReport} className="btn btn-block btn-primary me-1" to="/admin/add-user">
                                                            <FontAwesomeIcon icon={faDownload} /> Request For Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-4 order-1">
                                    <div className="">
                                        <div className="card">
                                            <h5 className="card-header">Download Report</h5>
                                            <div className="table-responsive text-nowrap">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Account</th>
                                                            <th>From Data</th>
                                                            <th>To Date </th>
                                                            <th>Status </th>
                                                            <th>Download</th>
                                                            <th>Created Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-border-bottom-0">
                                                        {userList.map((items, i) =>
                                                            <tr key={i}>
                                                                <td> <strong> {items.id}</strong></td>
                                                                <td>  {items.user_id}</td>
                                                                <td>{items.startdate}</td>
                                                                <td>
                                                                    {items.enddate}
                                                                </td>
                                                                <td>{items.status === 0 ? <span className='badge badge-sm bg-info mr-2'>Pending </span> : <span className='badge badge-sm bg-success mr-2'>Active </span>}</td>
                                                                <td>
                                                                    {items.status === 1 ?
                                                                        <button className='badge badge-sm bg-primary border-0 mr-2' onClick={() => download(`${serverip === '13.126.120.252' ? 'https://smsc.datagenit.com' : `http://${serverip}`}/report/downloadcenter/${items.linkfordownload}`)}><FontAwesomeIcon icon={faDownload} /> Download   </button>

                                                                        : <span className='badge badge-sm bg-danger'>  <FontAwesomeIcon icon={faDownload} /> Not Active </span>}
                                                                </td>
                                                                <td>{items.created_date}</td>
                                                            </tr>
                                                        )}
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

export default DownloadReport;