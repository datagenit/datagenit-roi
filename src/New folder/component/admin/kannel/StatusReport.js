import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { type } from '../../common/AdminAuth';
import { URL_SMSC } from '../../common/Url'
const StatusReport = () => {

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [filtersmscdata, setfiltersmscdata] = useState([]);
    const [smsc, setsmsc] = useState([]);
    const [UniqueData, setUniqueData] = useState([]);
    const [totalInstances, settotalInstances] = useState('');

    const [smscStatus, setsmscStatus] = useState({
        totalReceived: '',
        totalqueee: '',
        totalsend: '',
    })
    useEffect(() => {
        getallStatus();
    }, [])
    // https://smppintl.datagenit.com/apismpp/v1/kannel_control.php?user_id=1&method=status&token=b8860908f2cf45f721a40d23f2e291f9  New 
    // https://smsc.datagenit.com/apismpp/kannel_control.php?user_id=1&method=status OLD
    const getallStatus = () => {
        fetch(`https://smppintl.datagenit.com/apismpp/v1/kannel_control.php?user_id=1&method=status&token=b8860908f2cf45f721a40d23f2e291f9`).then((response) => {
            response.json().then((result) => {
                console.log('ESME result', result)

                if (result.success === true) {
                    unoqueData([result.message.smscs.smsc]);
                    setsmscStatus({
                        totalReceived: result.message.dlr.received.total,
                        totalqueee: result.message.dlr.queued,
                        totalsend: result.message.sms.sent.total,
                    })
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }

            })

        })
    }

    const unoqueData = (data) => {
        setsmsc(data);
        let newUniqueData = []
        data.map((item) => {
            let valueOfIndexOf = newUniqueData.map(el => el.id).indexOf(item.id);
            if (valueOfIndexOf >= 0) {
                newUniqueData[valueOfIndexOf].dlr.received = parseInt(newUniqueData[valueOfIndexOf].dlr.received) + parseInt(item.dlr.received)
                console.log('text');
                //console.log(newUniqueData[valueOfIndexOf].dlr.received, item.dlr.received)
            } else {
                newUniqueData.push(item);
                console.log('text 2');
            }
        })
        console.log('newUniqueData', newUniqueData);

        setUniqueData(newUniqueData)
    }

    const toHHMMSS = (secs) => {
        var secs = secs.slice(0, -1);
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var day = Math.round(hours / 24);
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        var time = [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")

        return (day + 'd ' + time)
    }

    const checkTxRX = (txrx) => {
        var tx = txrx.split('/')[0];
        var rx = txrx.split('/')[1];
        if (tx > 0 && rx > 0) {
            return 'TRX';
        } else if (tx > 0) {
            return 'TX';
        } else if (rx > 0) {
            return 'RX';
        }
    }

    const smscCount = (id, statusmatch) => {
        var arr = smsc;
        var numBoys = arr.reduce(function (n, person) {
            if (person.id === id) {
                return person.status.match('online');
            }
        }, 0);
        return numBoys;
    }

    console.log('smsc', smsc)


    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <AdminSideMenu />

                <div className="layout-page">

                    <AdminTopMenu />

                    <div className="content-wrapper">
                        {type === 'Admin' ?
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
                                    </div>

                                    <div className="col-lg-12 col-md-4 order-1">
                                        <div className="kannel-report">
                                            <div className="card">

                                                <h5 className="card-header">SMSC Report
                                                    <span className="demo-inline-spacing float-right ">
                                                        <Link className="btn btn-primary me-1" to="/admin/add-smsc">
                                                            <FontAwesomeIcon icon={faPlus} /> Add New SMSC
                                                        </Link>
                                                    </span>
                                                </h5>

                                                <hr className='mt-0 mb-0' />

                                                <div className=''>

                                                    <p className='text-primary p-3 pb-0'>SMSC Report Status </p>


                                                    <div className='table-responsive'>
                                                        <table className="table text-center  table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sent</th>
                                                                    <th>Received</th>
                                                                    <th>queued </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="table-border-bottom-0">

                                                                <tr>
                                                                    <td> <span className='text-success'> {smscStatus.totalsend || 0} </span> </td>
                                                                    <td> <span className='text-primary'> {smscStatus.totalReceived || 0} </span> </td>
                                                                    <td> <span className='text-danger'> {smscStatus.totalqueee || 0} </span> </td>
                                                                </tr>


                                                            </tbody>
                                                        </table>

                                                    </div>

                                                    <p className='text-primary p-3 pb-0'>Configured Instances : {totalInstances}</p>

                                                    <div className='table-responsive'>
                                                        <table className="table text-center  table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th width="15%">Name</th>
                                                                    <th>Status</th>

                                                                    <th>Uptime </th>
                                                                    <th className='text-center'>SMS (MO)</th>
                                                                    <th className='text-center'>SMS (MT/TPS)</th>
                                                                    <th className='text-center'>DLR (MO)</th>
                                                                    <th className='text-center'>DLR (MT)</th>
                                                                    <th>Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody className="table-border-bottom-0">

                                                                {UniqueData.map((items, i) =>

                                                                    <tr key={i}>
                                                                        <td> <span className='text-danger'> {items.id} </span> </td>
                                                                        <td> {items.status.match("online") ? <span className='text-success'> Running </span> : <span className='text-success'> Stopped </span>}  </td>

                                                                        <td>{items.status.match("online") ? toHHMMSS(items.status.split(" ")[1]) : '0'}</td>
                                                                        <td>{items.sms.inbound}</td>
                                                                        <td>{items.sms.outbound}</td>
                                                                        <td>{items.dlr.inbound}</td>
                                                                        <td>{items.dlr.outbound}</td>

                                                                        <td>


                                                                            <div className="dropdown">
                                                                                <span className="dropdown-toggle" type="button" data-toggle="dropdown"> <FontAwesomeIcon icon={faEdit} /></span>
                                                                                <ul className="dropdown-menu p-2">
                                                                                    <li> <Link to="/"> Suspend </Link></li>
                                                                                    <li><Link to="/">isolate </Link></li>
                                                                                    <li><Link to="/">resume </Link></li>
                                                                                    <li><Link to="/"> flush-dlr </Link></li>
                                                                                    <li><Link to="/">shutdown </Link></li>
                                                                                    <li><Link to="/">restart </Link></li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                )}

                                                            </tbody>
                                                        </table>

                                                    </div>

                                                    <p className='text-primary p-3 pb-0'>Overall SMS traffic</p>
                                                    <div className='table-responsive'>
                                                        <table className="table table-bordered text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th>Instance</th>
                                                                    <th>Received (MO)</th>
                                                                    <th> Received (DLR) </th>
                                                                    <td>Sent (MT)</td>
                                                                    <td>Sent (DLR)</td>
                                                                    <td>Queued</td>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="table-border-bottom-0">

                                                                {UniqueData.map((items, i) =>

                                                                    <tr key={i}>
                                                                        <td>{items.id}</td>
                                                                        <td>{items.sms.received}</td>
                                                                        <td>{items.dlr.received}</td>
                                                                        <td>{items.sms.sent}</td>
                                                                        <td>{items.dlr.sent}</td>
                                                                        <td>{items.queued}</td>
                                                                    </tr>
                                                                )}




                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <p className='text-primary p-3 pb-0'>SMSC connections</p>
                                                    <div className='table-responsive'>
                                                        <table className="table table-bordered text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th>Instance</th>
                                                                    <th>Links </th>
                                                                    <th>Online </th>
                                                                    <th>Disconnected</th>
                                                                    <th>Connecting</th>
                                                                    <th>Re-Connecting</th>
                                                                    <th>Dead</th>
                                                                    <th>Unknown</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="table-border-bottom-0">
                                                                {
                                                                    UniqueData.map((items, i) =>
                                                                        <tr key={i}>
                                                                            <td>{items.id}</td>
                                                                            <td>{items.link}</td>
                                                                            <td>{items.status.match("online") ? <span className='text-success'> Running </span> : <span className='text-success'> Stopped </span>} </td>
                                                                            <td>{smscCount(items.id, 'online')}</td>
                                                                            <td>0</td>
                                                                            <td>0</td>
                                                                            <td>0</td>
                                                                            <td className='text-danger'>none</td>
                                                                        </tr>
                                                                    )}
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                    <p className='text-primary p-3 pb-0'>SMSC connection details</p>
                                                    <div className='table-responsive'>
                                                        <table className="table table-bordered text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th>Instance</th>

                                                                    <th>Status </th>
                                                                    <th>Uptime</th>
                                                                    <th>Received (MO)</th>
                                                                    <th>Received (DLR)</th>
                                                                    <th>Sent (MT)</th>
                                                                    <th>Sent (DLR)</th>
                                                                    <th>Failed (MT)</th>
                                                                    <th>Queued (MT)</th>
                                                                    <th>Type</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="table-border-bottom-0">

                                                                {
                                                                    smsc.map((items, i) =>

                                                                        <tr key={i}>
                                                                            <td>{items.id}</td>
                                                                            <td className='text-primary'>{items.status.match("online") ? <span className='text-success'> Running </span> : <span className='text-danger'> Stopped </span>}</td>
                                                                            <td>{items.status.match('online') ? toHHMMSS(items.status.split(" ")[1]) : '0'}</td>
                                                                            <td>{items.sms.received}</td>
                                                                            <td>{items.dlr.received}</td>
                                                                            <td>{items.sms.sent}</td>
                                                                            <td>{items.dlr.sent}</td>
                                                                            <td>{items.failed}</td>
                                                                            <td>{items.queued}</td>
                                                                            <td>{checkTxRX(items.name.split(":")[2])}</td>
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
                            :
                            <div className='alert  m-5  alert-danger'>
                                You don't have permission to access this page.
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusReport;