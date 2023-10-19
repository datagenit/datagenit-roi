import React, { useEffect, useState } from 'react';
import Alert from '../../../ui-components/Alert';
import { userid, token, type } from '../../common/AdminAuth';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const UserServerDetails = () => {

    const { username } = useParams()
    const [serverDetails, setServerDetails] = useState();

    useEffect(() => {
        getServerDetails();
    }, [])

    let serverURL = [
        fetch(`https://smsc.datagenit.com/apismpp/v1/users-as.php?user_id=${userid}&method=retrieve_do&token=${token}&user_type=${type}&id=${username}`),
        fetch(`https://smsc.datagenit.com/apismpp/v1/users-as.php?user_id=${userid}&method=retrieve_ec2&token=${token}&user_type=${type}&id=${username}`),
    ]

    const getServerDetails = async () => {
        let result = await Promise.all(serverURL);
        let data = await Promise.all(result.map((items) => {
            return items.json();
        }))
        setServerDetails(data)
    }



    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <AdminSideMenu />


                <div className="layout-page">

                    <AdminTopMenu />

                    <div className="content-wrapper">

                        <Alert />

                        {type === 'Admin' ?

                            <div className="container-xxl flex-grow-1 container-p-y">
                                <p className="demo-inline-spacing text-right ">
                                    <Link className="btn btn-primary me-1" to="/admin/user-list">
                                        <FontAwesomeIcon icon={faArrowLeft} />  Go Back
                                    </Link>
                                </p>

                                <Alert />


                                { serverDetails &&  serverDetails.map((item) =>
                                    item.data && 
                                    <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4">
                                            <h5 className="card-header m-0"> Status :  {item.data[0].connect_allow_ip.includes("D") ? <span  className='text-danger'>Inactive </span> : <span className='text-success'>Active </span> }  </h5>
                                            <hr className='m-0' />
                                            <div className="card-body">
                                                <div className='row'>

                                                    <div className='col-md-3 mt-3'>
                                                        <label htmlFor="defaultFormControlInput" className="form-label">User Name</label>
                                                        <input type="text" className="form-control" name='userName' disabled={username ? true : false} value={item.data[0].system_id}  placeholder="username"  />
                                                    </div>

                                                    
                                                    <div className='col-md-3 mt-3'>
                                                        <label htmlFor="defaultFormControlInput" className="form-label">Throughput(TPS)</label>
                                                        <input type="number" className="form-control" name='throughput' disabled={username ? true : false} value={item.data[0].throughput}  placeholder="Example : 1, 20"  />
                                                       
                                                    </div>

                                                    <div className='col-md-3 mt-3'>
                                                        <label htmlFor="defaultFormControlInput" className="form-label">Default SMSC</label>
                                                        <input type="text" className="form-control" name='throughput' disabled={username ? true : false} defaultValue={item.data[0].default_smsc} />
                                                    </div>

                                                    <div className='col-md-3  mt-3'>
                                                        <label htmlFor="defaultFormControlInput" className="form-label"> Billing Type</label>
                                                        <select name='enablePrepaid' disabled={username ? true : false} value={item.data[0].enable_prepaid_billing} className='form-select'>
                                                            <option>Select Billing </option>
                                                            <option value='1'>Prepaid</option>
                                                            <option value='0'>Postpaid</option>
                                                        </select>
                                                    </div>

                                                    <div className='col-md-3 mt-3'>
                                                        <label htmlFor="defaultFormControlInput" className="form-label">Credit Amount</label>
                                                        <input type="number" className="form-control" name='creditAmount' disabled={username ? true : false} value={item.data[0].credit}  placeholder="Amount 10000"  />
                                                    </div>

                                                    <div className='col-md-3 mt-3'>
                                                        <label htmlFor="defaultFormControlInput" className="form-label">Max Binds</label>
                                                        <select name='maxBinds' disabled={username ? true : false} value={item.data[0].max_binds} className='form-select'>
                                                            <option>Max Binds </option>
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='5'>5</option>
                                                            <option value='6'>6</option>
                                                            <option value='7'>7</option>
                                                            <option value='8'>8</option>
                                                            <option value='9'>9</option>
                                                            <option value='10'>10</option>
                                                        </select>
                                                    </div>

                                                    <div className='col-md-3 mt-3'>
                                                        <label htmlFor="defaultFormControlInput" className="form-label">White list IP Address</label>
                                                        <input name='WhiteListIP' value={item.data[0].connect_allow_ip} type="text" disabled={username ? true : false} className="form-control"  placeholder="Example : 10.126.3.4"  />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                   

                                )
                                }
                            </div>
                            :

                            null
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserServerDetails;