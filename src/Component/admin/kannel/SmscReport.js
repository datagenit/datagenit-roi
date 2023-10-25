import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { type } from '../../common/AdminAuth';
import { URL } from '../../common/Url'
const SmscReport = () => {

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [smscDetailsData, setsmscDetailsData] = useState('');

    const [kanneldata, setkanneldata] = useState({
        esmedata: [],
        summary: [],
    })
    //https://smppintl.datagenit.com/apismpp/kannel_control.php?user_id=1&method=status New 
    //https://smsc.datagenit.com/apismpp/kannel_control.php?user_id=1&method=esme OLD
    useEffect(() => {
        fetch(`https://smppintl.datagenit.com/apismpp/kannel_control.php?user_id=1&method=esme`).then((response) => {
            response.json().then((result) => {
                console.log('ESME result', result);
                if (result.success === true) {
                    setkanneldata({
                        esmedata: [result.message.esme],
                        summary: [result.message.summary],
                    })
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })
    }, [])

    const maxBindDetails = (index) => {
        if (Array.isArray(kanneldata.esmedata[index].bind) === true) {
            setsmscDetailsData(kanneldata.esmedata[index].bind)
        } else {
            setsmscDetailsData([kanneldata.esmedata[index].bind])
        }
    }

    const toHHMMSS = (secs) => {
        console.log(secs)
        if (secs === undefined) {
            return ('No time')
        } else {
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

    }

    console.log('kanneldata', kanneldata.esmedata);


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
                                                <h5 className="card-header">Kannel ESME Report</h5>




                                                <hr className='mt-0 mb-0' />


                                                <div className='table-responsive'>

                                                    <p className='text-primary p-3 pb-0'>ESME Summary</p>

                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>unique</th>
                                                                <th>inbound-processed</th>
                                                                <th>Inbound Load</th>
                                                                <td>outbound-processed</td>
                                                                <td>outbound-load</td>

                                                            </tr>
                                                        </thead>
                                                        <tbody className="table-border-bottom-0">

                                                            {kanneldata.summary.map((items, i) =>

                                                                <tr key={i}>
                                                                    <td>{items['unique']}</td>
                                                                    <td>{items['inbound-processed']}</td>
                                                                    <td>{items['inbound-load']}</td>
                                                                    <td>{items['outbound-processed']}</td>
                                                                    <td>{items['outbound-load']}</td>

                                                                </tr>
                                                            )}

                                                        </tbody>
                                                    </table>
                                                </div>


                                                <div className='table-responsive'>

                                                    <p className='text-primary p-3 pb-0'>ESME</p>

                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>User</th>
                                                                <th>Bind Count</th>
                                                                <th>MAX Binds </th>
                                                                <th>Inbound Load</th>
                                                                <td>MAX Inbound Load</td>
                                                                <td>dlr</td>
                                                                <td>MO</td>
                                                                <td>MT</td>
                                                                <td>Outbound Load</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="table-border-bottom-0">

                                                            {kanneldata.esmedata.map((items, i) =>

                                                                <tr key={i}>
                                                                    <td>{items['system-id']}</td>
                                                                    <td>{items['bind-count']}</td>
                                                                    <td><span onClick={() => maxBindDetails(i)} className="text-success" data-toggle="modal" role="button" data-target="#exampleModal">{items['max-binds']}</span></td>
                                                                    <td>{items['inbound-load']}</td>
                                                                    <td>{items['max-inbound-load']}</td>
                                                                    <td>{items.dlr}</td>
                                                                    <td>{items.mo}</td>
                                                                    <td>{items.mt}</td>
                                                                    <td>{items['outbound-load']}</td>
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
                            :
                            <div className='alert  m-5  alert-danger'>
                                You don't have permission to access this page.
                            </div>

                        }
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delivery Report</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='table-responsive'>
                                {smscDetailsData ?

                                    <table className="table table-striped">
                                        <thead>
                                            <tr style={{ 'fontSize': '12px', 'whiteSpace': 'nowrap' }}>
                                                <th scope="col">Uptime</th>
                                                <th scope="col">IP</th>
                                                <th scope="col">Inbound / Outbound Processed</th>
                                                <th scope="col">Inbound / Outbound Queued</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {smscDetailsData.map((items, i) =>
                                                <>
                                                    <tr style={{ 'fontSize': '13px' }} key={i}>
                                                        <td>{toHHMMSS(items.uptime)}</td>
                                                        <td>{items.ip}</td>
                                                        <td>{items['inbound-processed']} / {items['outbound-processed']}</td>
                                                        <td>{items['inbound-queued']} / {items['outbound-queued']}</td>
                                                    </tr>
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                    :

                                    null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmscReport;