import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faBan, faPlus, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { URL } from '../../common/Url';
import { userid, token, type } from '../../common/AdminAuth';

const Company = () => {

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [permisionDetails, setPermisionDetails] = useState({
        create_user: "",
        view_user: "",
        update_user: "",
        delete_user: "",
    });


    const [userList, setuserList] = useState([]);



    const getUserDetails = () => {
        fetch(`${URL}company.php?parent_id=${userid}&user_id=${userid}&method=retrieve&token=${token}`).then((response) => {
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
        getPermisionDetails();
    }, []);

    const getPermisionDetails = () => {
        fetch(
            `${URL}manager.php?user_id=${userid}&method=retrieveid&id=${userid}&token=${token}&user_type=${type}`
        ).then((response) => {
            response.json().then((result) => {
                //console.log(result);
                if (result.success === true) {
                    setPermisionDetails({
                        create_user: result.data[0].create_user,
                        view_user: result.data[0].view_user,
                        update_user: result.data[0].update_user,
                        delete_user: result.data[0].delete_user,
                    });
                } else {
                    seterror({
                        errarStatus: true,
                        errorMessage: result.message,
                        bgcolor: "alert alert-danger",
                    });
                }
            });
        });
    };

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

                        <div className="container-xxl container-p-y">
                            {permisionDetails.create_user === 1 ? (
                                <p className="demo-inline-spacing text-right ">
                                    <Link className="btn btn-primary me-1" to="/admin/add-company">
                                        <FontAwesomeIcon icon={faPlus} /> Add Company
                                    </Link>
                                </p>
                            ) : null}
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
                                            <h5 className="card-header">Company List</h5>
                                            <div className="table-responsive text-nowrap">
                                                <table className="table">
                                                    <thead>
                                                        <tr>


                                                            <th>Company Name</th>
                                                            <th>Email</th>
                                                            <th>Mobile</th>

                                                            <th>Customer IP</th>
                                                            <th>Customer Port</th>
                                                            <th>No of Users</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-border-bottom-0">

                                                        {userList.map((items, i) =>

                                                            <tr key={i}>

                                                                <td>{items.company}</td>
                                                                <td>{items.email}</td>
                                                                <td>{items.mobile}</td>
                                                                <td>{items.cust_ip}</td>
                                                                <td>{items.cust_port}</td>

                                                                <td> <Link to={"/admin/user-list/" + items.id}>{items.usercount}</Link> </td>

                                                                <td>
                                                                    {items.status === 1 ? <span className="badge bg-label-primary me-1">Active</span> : <span className="badge bg-label-danger me-1">Inactive</span>}
                                                                </td>

                                                                <td>
                                                                    <span className='badge bg-primary mr-2'> <Link to={'/admin/add-company/view-edit/' + items.id}> <FontAwesomeIcon icon={faEdit} /> </Link> </span>
                                                                    <span className='badge bg-info mr-2'> <Link to={'/admin/add-company/view-edit/' + items.id}> <FontAwesomeIcon icon={faEye} /> </Link> </span>
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

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Company;