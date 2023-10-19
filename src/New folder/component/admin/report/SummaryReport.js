import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { URL } from '../../common/Url';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userid, token, type } from '../../common/AdminAuth';
import { Link } from 'react-router-dom';


const SummaryReport = () => {

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    var date = new Date()
    var todatdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);

    const [DateFrom, setDateFrom] = useState(todatdate);
    const [DateTo, setDateTo] = useState(todatdate);
    const [showDateFrom, setshowDateFrom] = useState(null);
    const [showDateTo, setshowDateTo] = useState(null);
    const [dateRange, setDateRange] = useState('today');
    const [showDateRnage, SetshowDateRnage] = useState(false);
    const [filterUser, SetfilterUser] = useState(false);
    const [userList, setuserList] = useState([]);
    const [selectUser, setselectUser] = useState('');
    const [summaryReportData, setsummaryReportData] = useState([]);
    const [newSummeryData, setnewSummeryData] = useState([]);
    const [uniqueData, setUniqueData] = useState([]);
    const [isloading, setisloading] = useState(false);

    useEffect(()=>{
        getUserDetails();
    },[])
    
    const summaryReport = () => {
        seterror({ errarStatus: false });
        setisloading(true);
        ShowsummaryReportData('');
        fetch(`${URL}report.php?user_id=${userid}&method=summarynew&date_from=${DateFrom}&date_to=${DateTo}&search_user_id=${selectUser}&token=${token}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
                 console.log('summaryReport', result);                
                if (result.success === true) {
                    setsummaryReportData(result.data)
                    ShowsummaryReportData(result.data);
                    setisloading(false);
                } else {
                    setisloading(false);
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                    ShowsummaryReportData('');

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

    const dateRangeHandlar = (e) => {
        if (e.target.value === 'customdata') {
            SetshowDateRnage(true);
            setDateRange(e.target.value);
        } else {
            SetshowDateRnage(false);
            setDateRange(e.target.value);
        }
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
        setnewSummeryData(DataMap);
        getuserIDwise(DataMap);
    }

    const getuserIDwise = (data) => {

        let newData = []

        data.map((item) => {

            let valueOfIndexOf = newData.map(el => el.username).indexOf(item.username);
            // console.log(valueOfIndexOf);

            if (valueOfIndexOf >= 0) {

                newData[valueOfIndexOf].count.other = parseInt(newData[valueOfIndexOf].count.other ? newData[valueOfIndexOf].count.other : 0) + parseInt(item.count.other ? item.count.other : 0)

                newData[valueOfIndexOf].count.delivered = parseInt(newData[valueOfIndexOf].count.delivered ? newData[valueOfIndexOf].count.delivered : 0) + parseInt(item.count.delivered ? item.count.delivered : 0)

                newData[valueOfIndexOf].count.failed = parseInt(newData[valueOfIndexOf].count.failed ? newData[valueOfIndexOf].count.failed : 0) + parseInt(item.count.failed ? item.count.failed : 0)

            } else {
                newData.push(item)
            }

        })

        setUniqueData(newData)
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
                                                        <select value={dateRange} onChange={dateRangeHandlar} className='form-select'>
                                                            <option value='today'>Today</option>
                                                            <option value='customdata'>Custom Data </option>
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
                                                            placeholderText={todatdate}
                                                            disabled={showDateRnage ? false : true}
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
                                                            placeholderText={todatdate}
                                                            disabled={showDateRnage ? false : true}
                                                        />
                                                    </div>
                                                </div>

                                             

                                                <div className="col-md-3">
                                                    <label>Select User</label>
                                                    <div className="input-group">
                                                        <select defaultValue={selectUser} onChange={accountTyeHandlar} name='smsc' className='form-select'>
                                                            <option value="">All User </option>
                                                            {userList.map((items, i) =>
                                                                <option value={items.system_id}>{items.system_id}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>



                                                <div className="col-md-12">
                                                    <div className="text-right">

                                                        {isloading ?

                                                            <button className="btn btn-primary" type="button" disabled>
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                                                            </button>

                                                            :

                                                            <button onClick={summaryReport} className="btn btn-primary me-1">
                                                                <FontAwesomeIcon icon={faSearch} /> Search
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="">
                                    <div className='container-p-y'>


                                        {
                                            error.errarStatus ?
                                                <div className={error.bgcolor} role="alert">
                                                    <strong>Alert!</strong> {error.errorMessage}

                                                </div>
                                                :
                                                null
                                        }

                                        <div className="">
                                            <div className="card">
                                                <h5 className="card-header">Account Wise Summary</h5>
                                                <div className="table-responsive text-nowrap">

                                                {uniqueData.length === 0 ? 
                                                     <div className='text-center bb-5'>
                                                      <p className='font-weight-bold'>Select user / Date range  </p>
                                                    </div>
                                                    : 
                                                    <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>User Name</th>
                                                                    <th>Total Sent</th>
                                                                    <th>Total Delivered</th>
                                                                    <th>Total Failed</th>
                                                                    <th>Sender ID Wise </th>
                                                                    <th>Date ID Wise </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="table-border-bottom-0">

                                                                {uniqueData.map((item, i) =>

                                                                    <tr key={i}>

                                                                        <td>
                                                                            <span className='text-primary'><Link to={'/admin/summary-sender-report/' + item.username+'/'+DateFrom+'/'+DateTo}>{item.username} </Link> </span>
                                                                        </td>

                                                                        <td> <Link to={'/admin/summary-sender-report/' + item.username+'/'+DateFrom+'/'+DateTo}>
                                                                            <span className='text-primary'>
                                                                                {parseInt(item.count.delivered || 0) + parseInt(item.count.failed || 0) + parseInt(item.count.other || 0)}
                                                                            </span> </Link> </td>
                                                                        <td>
                                                                            <Link to={'/admin/summary-sender-report/' + item.username+'/'+DateFrom+'/'+DateTo}><span className='text-success'> {item.count.delivered || 0} </span></Link>
                                                                        </td>
                                                                        <td>
                                                                            <Link to={'/admin/summary-sender-report/' + item.username+'/'+DateFrom+'/'+DateTo}><span className='text-danger'> {item.count.failed || 0} </span></Link>
                                                                        </td>
                                                                        <td>
                                                                            <span className='badge bg-primary mr-2'> <Link to={'/admin/summary-sender-report/' + item.username+'/'+DateFrom+'/'+DateTo}> View </Link> </span>
                                                                           
                                                                        </td>

                                                                        <td>
                                            
                                                                            <span className='badge bg-info mr-2'> <Link to={'/admin/summary-date-report/' + item.username+'/'+DateFrom+'/'+DateTo}> View </Link> </span>
                                                                        </td>

                                                                        

                                                                    </tr>
                                                                )}

                                                            </tbody>
                                                    </table>
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
            </div>
        </div>
    );
};

export default SummaryReport;