import React,{useState,useEffect} from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faBan, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { URL } from '../../common/Url';
import {getSMSC} from '../../../redux/actions/smscActions'
import { useDispatch, useSelector } from 'react-redux';

import {type} from '../../common/AdminAuth';

const Smsc = () => {

    const smsc = useSelector((state)=>state.allSMSC.smsc);
    const dispatch = useDispatch();
    
   // console.log('Redux SMSC',smsc);

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const getSMSEDetails = () => {
        fetch(`${URL}smsc.php?user_id=1&method=retrieve`).then((response) => {
            response.json().then((result) => {
              //  console.log(result);
              if (result.success === true) {
                dispatch(getSMSC(result.data))
              } else {
                seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
              }
            })
          })
    }

    useEffect(() => {
        getSMSEDetails();
    },[])

    const smscDisable = (id,status) =>{
        seterror({ errarStatus: false});
        fetch(`${URL}smsc.php?user_id=1&method=change_status&id=${id}&status=${status}`).then((response) => {
            response.json().then((result) => {
               // console.log(result);
              if (result.success === true) {
                seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-success' });
                setTimeout(function () { getSMSEDetails();}, 1000);
                
              } else {
                seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
              }
            })
          })

    }

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <AdminSideMenu />

                <div className="layout-page">

                    <AdminTopMenu />

                    <div className="content-wrapper">



                    { type==='Admin'? 
                        <div className="container-xxl container-p-y">

                            <p className="demo-inline-spacing text-right ">
                                <Link className="btn btn-primary me-1"  to="/admin/add-smsc">
                                  <FontAwesomeIcon icon={faPlus} /> Add New SMSC
                                </Link>
                            </p>

                            <div className="row">
                                <div className="col-lg-12 col-md-4 order-1">

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

                                    <div className="">
                                        <div className="card">
                                            <h5 className="card-header">SMSC List</h5>
                                            <div className="table-responsive text-nowrap">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>User Name</th>
                                                            <th>IP ADDRESS</th>
                                                            <th>Port </th>
                                                            <th>TRX S. COUNT</th>
                                                            <th>TX S. COUNT</th>
                                                            <th>RX  S. COUNT</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-border-bottom-0">

                                                    {smsc.map((items,i) => 

                                                        <tr key={i}>

                                                            <td> <strong> {items.title}</strong></td>
                                                            <td> {items.username}</td>
                                                            <td>{items.ip_address}</td>
                                                            <td>{items.port}</td>
                                                            <td>{items.trx || 'NA'}</td>
                                                            <td>{items.tx  || 'NA' }</td>
                                                            <td>{items.rx || 'NA' }</td>

                                                            <td>{items.status===1 ? <span className="badge bg-label-primary me-1">Active</span> : <span className="badge bg-label-danger me-1">Inactive</span>} </td>
                                                            <td>
                                                                <span className='badge bg-primary mr-2'> <Link to={'/admin/smsc/edit-view/'+items.id}> <FontAwesomeIcon icon={faEdit} /> </Link> </span>
                                                                <span className='badge bg-info mr-2'> <Link to={'/admin/smsc/edit-view/'+items.id}> <FontAwesomeIcon icon={faEye} /> </Link> </span>
                                                                <span role="button" className='badge bg-danger'> <FontAwesomeIcon onClick={()=> smscDisable(items.id,items.status)} icon={faBan} /> </span>
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

export default Smsc;