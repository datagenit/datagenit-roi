import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faBan, faPlus, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { URL } from '../../common/Url';
import { userid, token, type } from '../../common/AdminAuth';

const Manager = () => {

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [userList, setuserList] = useState([]);

    const getUserDetails = () => {
        fetch(`${URL}manager.php?user_id=${userid}&method=retrieve&token=${token}`).then((response) => {
            response.json().then((result) => {
               // console.log('getUserDetails', result);
                if (result.success === true) {
                    setuserList(result.data)
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })
    }

    useEffect(() => {
        getUserDetails();
    }, [])
 
    const userDisable = (id, status) => {
        seterror({ errarStatus: false });
        fetch(`${URL}manager.php?user_id=${userid}&method=delete&id=${id}&token=${token}&status=${status}`).then((response) => {
            response.json().then((result) => {
                // console.log(result);
                if (result.success === true) {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-success' });
                    setTimeout(function () { getUserDetails(); }, 1000);

                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })
    }

    const login = (username, password) => {

        fetch(`${URL}login.php?username=${username}&password=${password}`).then((response) => {
            response.json().then((result) => {
                if (result.success === true) {
                    seterror({ errarStatus: true, errorMessage: "Success", bgcolor: 'alert alert-success' });
                    sessionStorage.setItem("admin", JSON.stringify(result));
                    setTimeout(function () { window.location = "/admin"; }, 1000);
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
                                <Link className="btn btn-primary me-1" to="/admin/add-manager">
                                    <FontAwesomeIcon icon={faPlus} /> Add Manager
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
                                            <h5 className="card-header">Manager List</h5>
                                            <div className="table-responsive text-nowrap">
                                                <table className="table">
                                                    <thead>
                                                        <tr>

                                                            <th> Action </th>
                                                            <th> Name</th>
                                                            <th> Number Of Users</th>
                                                            <th> Managed By</th>
                                                            <th>User Name</th>
                                                            <th>Mobile</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-border-bottom-0">

                                                        {userList.map((items, i) =>

                                                            <tr key={i}>

                                                                <td width={'5%'} className='border-right'> <FontAwesomeIcon onClick={() => login(items.email, items.password)} title="Login to user account" className='login-button' icon={faLockOpen} color="green" />  </td>

                                                                <td>  {items.name}</td>
                                                                <td> <Link to={"/admin/user-list/"+items.id}>{items.usercount}</Link> </td>
                                                                <td>{items.remark}</td>
                                                                <td>{items.email}</td>

                                                                <td>
                                                                    {items.mobile}
                                                                </td>

                                                                <td>
                                                                    {items.status === 1 ? <span className="badge bg-label-primary me-1">Active</span> : <span className="badge bg-label-danger me-1">Inactive</span>}
                                                                </td>

                                                                <td>
                                                                    <span className='badge bg-primary mr-2'> <Link to={'/admin/add-manager/view-edit/' + items.id}> <FontAwesomeIcon icon={faEdit} /> </Link> </span>
                                                                    <span className='badge bg-info mr-2'> <Link to={'/admin/add-manager/view-edit/' + items.id}> <FontAwesomeIcon icon={faEye} /> </Link> </span>
                                                                    <span role="button" className='badge bg-danger'> <FontAwesomeIcon onClick={() => userDisable(items.id, items.status)} icon={faBan} /> </span>
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

export default Manager;