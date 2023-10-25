import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { URL } from '../../common/Url';
import { userid, token ,type } from '../../common/AdminAuth';

const CreateManager = () => {

    const { id } = useParams()

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [addMamager, setaddMamager] = useState({

        password: '',
        cpassword: '',
        name: '',
        remark:'',
        email: '',
        mobile: '',
        company: '',
        address: '',
        create_user: 0,
        delete_user: 0,
        view_user: 0,
        update_user: 0,
    })

    let name, value;
    const inputsHandler = (e) => {
        name = e.target.name;
        value = e.target.value;
        setaddMamager({ ...addMamager, [name]: value })
    }

    const submitButton = () => {
        seterror({
            errarStatus: false,
        });
        window.scrollTo(0, 0)

        fetch(`${URL}manager.php?user_id=${userid}&method=create&password=${addMamager.password}&cpassword=${addMamager.cpassword}&name=${addMamager.name}&remark=${addMamager.remark}&email=${addMamager.email}&mobile=${addMamager.mobile}&company=${addMamager.company}&address=${addMamager.address}&create_user=${addMamager.create_user}&delete_user=${addMamager.delete_user}&update_user=${addMamager.update_user}&view_user=${addMamager.view_user}&token=asd&token=${token}`).then((response) => {
            response.json().then((result) => {
                if (result.success === true) {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-success' });
                    // setTimeout(function () {
                    //     window.location = '/admin/manager';
                    // }, 2000);
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })

    }

    const getUserDetails = () => {
        if (id) {
            fetch(`${URL}manager.php?user_id=1&method=retrieveid&id=${id}&token=${token}`).then((response) => {
                response.json().then((result) => {
                   // console.log('result', result);
                    if (result.success === true) {
                        setaddMamager({
                            password: result.data[0].password,
                            name: result.data[0].name,
                            remark: result.data[0].remark,
                            email: result.data[0].email,
                            mobile: result.data[0].mobile,
                            company: result.data[0].company,
                            address: result.data[0].address,
                            cpassword: result.data[0].password,
                            create_user: result.data[0].create_user,
                            view_user: result.data[0].view_user,
                            update_user: result.data[0].update_user,
                            delete_user: result.data[0].delete_user,
                            
                        })
                    } else {
                        seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                    }
                })
            })
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [id])

    const updateUserDetails = () => {
        seterror({
            errarStatus: false,
        });
        window.scrollTo(0, 0)
        fetch(`${URL}manager.php?user_id=${userid}&method=update&password=${addMamager.password}&cpassword=${addMamager.cpassword}&name=${addMamager.name}&remark=${addMamager.remark}&email=${addMamager.email}&mobile=${addMamager.mobile}&company=${addMamager.company}&address=${addMamager.address}&create_user=${addMamager.create_user}&delete_user=${addMamager.delete_user}&update_user=${addMamager.update_user}&view_user=${addMamager.view_user}&token=asd&token=${token}&id=${id}`).then((response) => {
            response.json().then((result) => {
                if (result.success === true) {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-success' });
                    getUserDetails();
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })
    }

    const handleChange = (e) => {

        let PermissionsName = e.target.name;
        let isChecked = e.target.checked;

        if(isChecked===true){
            if(PermissionsName === 'create_user' ){
                setaddMamager({...addMamager,create_user : 1})
            }
            if(PermissionsName === 'delete_user' ){
                setaddMamager({...addMamager,delete_user : 1})
            }
            if(PermissionsName === 'update_user' ){
                setaddMamager({...addMamager,update_user : 1})
            }
            if(PermissionsName === 'view_user' ){
                setaddMamager({...addMamager,view_user : 1})
            }
            
        }else{
            if(PermissionsName === 'create_user' ){
                setaddMamager({...addMamager,create_user : 0})
            }
            if(PermissionsName === 'delete_user' ){
                setaddMamager({...addMamager,delete_user : 0})
            }
            if(PermissionsName === 'update_user' ){
                setaddMamager({...addMamager,update_user : 0})
            }
            if(PermissionsName === 'view_user' ){
                setaddMamager({...addMamager,view_user : 0})
            }
        }
 
    }

    

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <AdminSideMenu />

                <div className="layout-page">

                    <AdminTopMenu />

                    <div className="content-wrapper">
                    { type==='Admin'? 
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <p className="demo-inline-spacing text-right ">
                                <Link className="btn btn-primary me-1" to="/admin/manager">
                                    <FontAwesomeIcon icon={faArrowLeft} />  Go Back
                                </Link>
                            </p>

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

                            <div className="row">

                                <div className="col-md-12">

                                    <div className="card mb-4">
                                        {id ? <h5 className="card-header"> Edit or Update Manager : <span className='text-primary'>{addMamager.name} </span> </h5> : <h5 className="card-header">Add New Manager</h5>}
                                        <hr className='m-0' />
                                        <div className="card-body">


                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Full Name</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name='name' value={addMamager.name} onChange={inputsHandler} placeholder="Enter Full Name" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Remark (Managed By )</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name='remark' value={addMamager.remark} onChange={inputsHandler} placeholder="Enter Full Name" />
                                                    </div>
                                                </div>

                                                 
                                                <div className='col-md-6 mt-3'>
                                                    <label for="defaultFormControlInput" className="form-label">Password</label>
                                                    <input type="text" className="form-control" name='password' value={addMamager.password} onChange={inputsHandler} id="defaultFormControlInput" placeholder="Enter Password" aria-describedby="defaultFormControlHelp" />
                                                </div>

                                                <div className='col-md-6 mt-3'>
                                                    <label for="defaultFormControlInput" className="form-label">Confirm Password</label>
                                                    <input type="text" className="form-control" name='cpassword' value={addMamager.cpassword } onChange={inputsHandler} id="defaultFormControlInput" placeholder="Enter Password" aria-describedby="defaultFormControlHelp" />
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <label>Email Address</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name='email' value={addMamager.email} onChange={inputsHandler} placeholder="Example:www@gmail.com " />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <label>Mobile Number</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name='mobile' value={addMamager.mobile} onChange={inputsHandler} placeholder="+91 XXXXXXXX" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <label>Company Name</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name='company' value={addMamager.company} onChange={inputsHandler} placeholder="Company Private Limited" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <label> Allow Permissions  </label>
                                                    <div className='d-flex'>
                                                        <div className="form-check ml-2 mt-2">
                                                            <input className="form-check-input" defaultChecked={addMamager.create_user === 1 ? 'checked' : null} type="checkbox" onChange={handleChange} value={addMamager.create_user} name="create_user" />
                                                            <label className="form-check-label">Add User</label>
                                                        </div>
                                                        <div className="form-check ml-2 mt-2">
                                                            <input className="form-check-input" defaultChecked={addMamager.delete_user === 1 ? 'checked' : null} type="checkbox" onChange={handleChange} value={addMamager.delete_user} name="delete_user" />
                                                            <label className="form-check-label">Delete User </label>
                                                        </div>
                                                        <div className="form-check ml-2 mt-2">
                                                            <input className="form-check-input" defaultChecked={addMamager.update_user === 1 ? 'checked' : null} type="checkbox" onChange={handleChange} value={addMamager.update_user} name="update_user" />
                                                            <label className="form-check-label"> Update User</label>
                                                        </div>
                                                        <div className="form-check ml-2 mt-2">
                                                            <input className="form-check-input" defaultChecked={addMamager.view_user === 1 ? 'checked' : null} type="checkbox" onChange={handleChange} value={addMamager.view_user} name="view_user" />
                                                            <label className="form-check-label">View User</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 mt-3">
                                                    <label>Address In Detail</label>
                                                    <div className="input-group">
                                                        <textarea className="form-control" name='address' value={addMamager.address} onChange={inputsHandler} placeholder='Please Enter Full Address'></textarea>
                                                    </div>
                                                </div>


                                            </div>

                                            <div className='col-md-12 text-right'>
                                                {id ?
                                                    <button type="button" onClick={updateUserDetails} className="btn btn-primary mt-5">Update Details</button>
                                                    :
                                                    <button type="button" onClick={submitButton} className="btn btn-primary mt-5">Add Manager</button>
                                                }



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

export default CreateManager;