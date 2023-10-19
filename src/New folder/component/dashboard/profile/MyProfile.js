import React, { useState, useEffect } from 'react';
import DashboardSideMenu from '../../navbar/DashboardSideMenu'
import DashboardTopMenu from '../../navbar/DashboardTopMenu'
import {userid, token, type } from '../../common/UserAuth'
import { URL } from '../../common/Url';

const MyProfile = () => {

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [userProfile, setuserProfile] = useState({
        name: '',
        email: '',
        mobile: '',
        company: '',
        address: '',
        connect_allow_ip:'',
      })
    
useEffect(() => {
    if(userid){
       fetch(`${URL}users.php?user_id=${userid}&method=retrieve_profile&id=${userid}&token=${token}&user_type=${type}`).then((response) => {
         response.json().then((result) => {
            // console.log('result',result);
             if (result.success === true) {
                setuserProfile({
                name: result.data[0].name,
                email: result.data[0].email,
                mobile: result.data[0].mobile,
                company: result.data[0].company,
                address: result.data[0].address,
                connect_allow_ip: result.data[0].connect_allow_ip,
               })
             } else {
               seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
             }
         })
       })
     }
     },[])

  

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <DashboardSideMenu />

                <div className="layout-page">

                    <DashboardTopMenu />

                    <div className="content-wrapper">

                        <div className="container-xxl container-p-y">

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


                                <div className="col-xl-12">

                                    <div className="card mb-4">
                                        <h5 className="card-header">Profile Details</h5>

                                        <div className="card-body">
                                            <div className='row gy-3'>

                                            <div className="col-md-12">
                                                     <label>Whitelist IP Address</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" style={{'background':'#e7e7ff'}}  name='userid' disabled value={userProfile.connect_allow_ip}  placeholder="12/12/12"  />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                     <label>User Name</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control"  name='userid' disabled value={userid}  placeholder="12/12/12"  />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                     <label>Full Name</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" disabled name='name' value={userProfile.name}  placeholder="Enter Full Name"  />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                     <label>Email Address</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" disabled name='email' value={userProfile.email}  placeholder="Example:www@gmail.com "  />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                     <label>Mobile Number</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" disabled name='mobile' value={userProfile.mobile}   placeholder="+91 XXXXXXXX"  />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                     <label>Company Name</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" disabled name='company' value={userProfile.company}  placeholder="Company Private Limited"  />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                     <label>Address In Detail</label>
                                                    <div className="input-group">
                                                       <textarea className="form-control" disabled name='address' value={userProfile.address}  placeholder='Please Enter Full Address'></textarea>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    {/* 
                                        <hr className="m-0" />

                                        <div className="card-body">
                                            <div className="row gy-3">
                                            <p className="demo-inline-spacing text-right">
                                                    <button onClick={updateUserProfile} className="btn btn-primary me-1"  to="/admin/add-user">
                                                     Update Profile 
                                                    </button>
                                            </p>
                                            </div>
                                        </div> */}
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

export default MyProfile;