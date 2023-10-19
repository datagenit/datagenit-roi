import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChartArea } from '@fortawesome/free-solid-svg-icons'
import { URL } from '../../common/Url';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import { customTableStylesForSummery } from '../../common/customTableStyles';
import { userid, token, type } from '../../common/AdminAuth';
import { Link, useParams } from 'react-router-dom';


const SummarySernderWiseReport = () => {

    const { username, dateform, dateto } = useParams()

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    var date = new Date()
    var todatdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);

    const [DateFrom, setDateFrom] = useState(dateform);
    const [DateTo, setDateTo] = useState(dateto);
    const [showDateFrom, setshowDateFrom] = useState(null);
    const [showDateTo, setshowDateTo] = useState(null);
    const [dateRange, setDateRange] = useState('today');
    const [showDateRnage, SetshowDateRnage] = useState(false);
    const [filterUser, SetfilterUser] = useState(false);
    const [userList, setuserList] = useState([]);
    const [selectUser, setselectUser] = useState(username);
    const [pending, setPending] = React.useState(true);
    const [summaryReportData, setsummaryReportData] = useState([]);
    const [newSummeryData, setnewSummeryData] = useState([]);
    const [sernderIdlist, setsernderIdlist] = useState([]);
    const [modelActive, setModelActive] = useState(false);
    const [top10Report, settop10Report] = useState([]);

    const summaryReport = () => {
        seterror({ errarStatus: false });
        fetch(`${URL}report.php?user_id=${userid}&method=summarynew&date_from=${DateFrom}&date_to=${DateTo}&search_user_id=${selectUser}&token=${token}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
                // console.log('summaryReport', result);                
                if (result.success === true) {
                    setsummaryReportData(result.data)
                    ShowsummaryReportData(result.data);
                    setPending(false)
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                    setPending(false)
                    ShowsummaryReportData('');

                }
            })
        })
    }

    useEffect(() => {
        summaryReport();
        getUserDetails();
    }, [])


    const OnhoverShowTenReports = (semderid, username) => {
        fetch(`${URL}report.php?user_id=${userid}&method=details&date_from=${DateFrom}&date_to=${DateTo}&search_user_id=${username}&senderid=${semderid}&mobile=&token=${token}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
                console.log(result);
                if (result.success === true) {
                    seterror({ errarStatus: false });
                    setTimeout(() => {
                        setModelActive(true);
                    }, 500);
                    settop10Report(result.message)
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })

    }

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

    const totalSent = () => {
        let tot = 0;
        newSummeryData.map(function (arr) {
            tot = tot + parseInt(arr.count.delivered || 0) + parseInt(arr.count.failed || 0) + parseInt(arr.count.other || 0);
        });
        return tot;
    }

    const totalDelivered = () => {
        let tot = 0;
        newSummeryData.map(function (arr) {
            tot = tot + parseInt(arr.count.delivered || 0)
        });
        return tot;
    }

    const totalFailed = () => {
        let tot = 0;
        newSummeryData.map(function (arr) {
            tot = tot + parseInt(arr.count.failed || 0)
        });
        return tot;
    }

    const getUserDetails = () => {
        fetch(`${URL}users.php?user_id=${userid}&method=retrieve&token=${token}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
                // console.log('user List',result);
                if (result.success === true) {
                    setuserList(result.data)
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })
    }

    const accountTyeHandlar = (e) => {
        setselectUser(e.target.value);
    }

    const SelectuserWiseHandlar = (e) => {
        if (e.target.value === 'AccountWise') {
            SetfilterUser(true);
            setDateRange(e.target.value);
        } else {
            SetfilterUser(false);
            setDateRange(e.target.value);
        }
    }

    const ShowsummaryReportData = (data) => {
        let DataMap = [];
        let userwise = [];
        Object.keys(data).forEach((username) =>
            // DataMap.push({'username':username})
            Object.keys(data[username]).forEach((date) =>
                //  DataMap.push({'date':date})
                Object.keys(data[username][date]).forEach((sernderID) =>
                    DataMap.push(Object.assign({ 'username': username, 'sernderid': sernderID, 'date': date, count: data[username][date][sernderID] }))
                )
            )
        );
        setnewSummeryData(DataMap)
    }

    const columns = [
        {
            name: 'S.Report',
            cell: (item) => <span role="button" onClick={() => OnhoverShowTenReports(item.sernderid, item.username)} className='text-primary'><FontAwesomeIcon icon={faChartArea} /> </span>,
            width: "100px",
        },
        {
            name: 'User Name',
            cell: (item) => <Link to={'/admin/details-report/' + item.username + '/' + item.sernderid + '/' + dateform + '/' + dateto} className='text-primary'>{item.username} </Link>,
            selector: row => row.username,
            sortable: true,

        },
        {
            name: 'Sender ID',
            cell: (item) => <Link to={'/admin/details-report/' + item.username + '/' + item.sernderid + '/' + dateform + '/' + dateto} className='text-primary'>{item.sernderid} </Link>,
            selector: row => row.sernderid,
            sortable: true,

        },
        {
            name: 'Total Sent',
            cell: (item) => <span className='text-primary'>{parseInt(item.count.delivered || 0) + parseInt(item.count.failed || 0) + parseInt(item.count.other || 0)} </span>,
            selector: row => parseInt(row.count.delivered || 0) + parseInt(row.count.failed || 0) + parseInt(row.count.other || 0),
            sortable: true,

        },
        {
            name: 'Total Delivered',
            cell: (item) => <span className='text-success'>{item.count.delivered || 0} </span>,
            selector: row => parseInt(row.count.delivered || 0),
            sortable: true,

        },
        {
            name: 'Total Failed',
            cell: (e) => <span className='text-danger'>{e.count.failed || 0} </span>,
            selector: row => parseInt(row.count.failed || 0),
            sortable: true,

        },
        {
            name: 'Submit Date',
            selector: row => row.date,
            sortable: true,
            wrap: true,
        },
    ];

    const modelHide = () => {
        setModelActive(false)
    }

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
                                    <div className="card mb-4">
                                        <h5 className="card-header">Filter Options</h5>

                                        <div className="card-body">
                                            <div className='row gy-3'>

                                                <div className="col-md-3">
                                                    <label>Date Type</label>
                                                    <div className="input-group">
                                                        <select className='form-select'>
                                                            <option value='customdata'>Date Range </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <label>From Date</label>
                                                    <div className="input-group">
                                                        <button className="btn btn-outline-primary" type="button" id="button-addon2"> From </button>
                                                        <DatePicker className="form-control btn-block"
                                                            dateFormat="MM/dd/yyyy"
                                                            selected={showDateFrom}
                                                            onChange={handleDateFrom}
                                                            placeholderText={dateform}

                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <label>To Date</label>
                                                    <div className="input-group">
                                                        <button className="btn btn-outline-primary" type="button" id="button-addon2"> To</button>
                                                        <DatePicker className="form-control btn-block"
                                                            dateFormat="MM/dd/yyyy"
                                                            selected={showDateTo}
                                                            onChange={handleDateTo}
                                                            placeholderText={dateto}

                                                        />
                                                    </div>
                                                </div>



                                                <div className="col-md-3">
                                                    <label>Select User</label>
                                                    <div className="input-group">
                                                        <select value={selectUser} onChange={accountTyeHandlar} name='smsc' className='form-select'>
                                                            <option value="">All User </option>
                                                            {userList.map((items, i) =>
                                                                <option value={items.system_id}>{items.system_id}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="text-right">
                                                        <button onClick={summaryReport} className="btn btn-primary me-1">
                                                            <FontAwesomeIcon icon={faSearch} /> Search
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="">
                                    <div className='container-p-y'>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-12 col-12 mb-4">
                                                <div className="card">
                                                    <div className="card-body">

                                                        <span className="fw-semibold d-block mb-1">Total Sent </span>
                                                        <h3 className="card-title mb-2">{totalSent()}</h3>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-12 col-12 mb-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <span className='fw-semibold d-block mb-1'> Delivered</span>
                                                        <h3 className="card-title text-success text-nowrap mb-1">{totalDelivered()}</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-12 col-12 mb-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <span className='fw-semibold d-block mb-1'>Failed</span>
                                                        <h3 className="card-title text-nowrap text-danger mb-1">{totalFailed()}</h3>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>





                                <div className="col-lg-12 col-md-4 order-1">

                                    {
                                        error.errarStatus ?
                                            <div className={error.bgcolor} role="alert">
                                                <strong>Alert!</strong> {error.errorMessage}

                                            </div>
                                            :
                                            null
                                    }

                                    <div className="">
                                        <div className="card pb-5">
                                            <h5 className="card-header">Summary Report</h5>
                                            <DataTable
                                                pagination
                                                handleSort
                                                columns={columns}
                                                data={newSummeryData}
                                                progressPending={pending}
                                                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                                customStyles={customTableStylesForSummery}
                                                noDataComponent={' No record on this Date ' + todatdate}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {top10Report ?



                        <div style={{ 'display': modelActive ? 'block' : null }} className="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title mb-3" id="exampleModalLabel">Delivery Report</h5>
                                        <button type="button" className="close  mb-3" onClick={() => modelHide()}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div style={{'height':'500px','overflow-y':'scroll'}} className="">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Mobile</th>
                                                    <th scope="col">Submit Time</th>
                                                    <th scope="col">Message</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {top10Report.map((items, i) =>
                                                    <>
                                                        <tr style={{ 'fontSize': '13px' }} key={i}>
                                                            <td>{items.msisdn}</td>
                                                            <td>{items.sent_date}</td>
                                                            <td>{items.message_text}</td>
                                                        </tr>
                                                    </>
                                                )}
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            </div>
                        </div>
                        :
                        null
                    }

                </div>
            </div>
        </div>
    );
};

export default SummarySernderWiseReport;