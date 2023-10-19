import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';
import { URL } from '../../common/Url';
import { userid, token, type } from '../../common/AdminAuth';

const AddBalance = () => {

    const { username, balance } = useParams()

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [amount, setAmount] = useState(null);
    const [effectveAmount, seteffectveAmount] = useState(balance);
    const [description, setDescription] = useState('');
    const [balanceHistory, setbalanceHistory] = useState([]);

    const addBalance = () => {
        window.scrollTo(0, 0)
        fetch(`${URL}add_balance.php?user_id=${userid}&method=add&token=${token}&ret_user_id=${username}&amount=${amount}&description=${description}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
             // console.log('addBalance',result);
                if (result.success === true) {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-success' });
                    getBalanceHistory();
                    seteffectveAmount(parseInt(balance)+parseInt(amount))
                    setAmount('')
                    setDescription('')
                    window.location = '/admin/user-list';
                } else {
                    seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
                }
            })
        })
    }

    useEffect(() => {
        getBalanceHistory();
    }, [username])

    const getBalanceHistory = () => {
       
        fetch(`${URL}add_balance.php?user_id=${userid}&method=trans_history&token=${token}&ret_user_id=${username}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
                // console.log('user List',result);
                if (result.success === true) {
                    setbalanceHistory(result.data)
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


                            <p className="demo-inline-spacing text-right ">
                                <Link className="btn btn-primary me-1" to="/admin/user-list">
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go Back
                                </Link>
                            </p>



                            <div className="row">

                                <div className="col-lg-12 col-md-4 order-1">

                                    {
                                        error.errarStatus ?
                                            <div className={error.bgcolor} role="alert">
                                                {error.errorMessage}

                                            </div>
                                            :
                                            null
                                    }

                                    <div className="">
                                        <div className="card">
                                            <h5 className="card-header">Add Balance To : <strong className='text-primary'> {username} </strong>  , Current  Balance is: <strong className='text-primary'> {effectveAmount} </strong> </h5>
                                            <div className='card'>
                                                <div className='card-body'>
                                                    <div className='form-group'>
                                                        <label className='label'>Enter Amount</label>
                                                        <input type='text' value={amount} onChange={(event) => setAmount(event.target.value)} className="form-control" placeholder='INR 10000' />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label className='label'>Enter Description</label>
                                                        <textarea className='form-control' value={description}  onChange={(event) => setDescription(event.target.value)}  placeholder='Enter description'></textarea>
                                                    </div>

                                                    <div className='col-md-12 text-right'>

                                                        <button type="button" onClick={addBalance} className="btn btn-primary">Add Balance </button>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <div className="card">

                                    <h5 className="card-header">Balance History List</h5>
                                    <div className="card-body">
                                        {balanceHistory.length === 0 ?
                                            <div className="alert text-center alert-info" role="alert">
                                                No Balance History
                                            </div> 
                                            :
                                            <div className="table-responsive text-nowrap">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th> User Name</th>
                                                         <th>Transaction Type</th>
                                                        <th>Credit Amount </th>
                                                        <th>Description</th>
                                                        <th>Created</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-border-bottom-0">

                                                    {balanceHistory.map((items, i) =>

                                                        <tr key={i}>
                                                            <td>  <strong> {items.username}</strong></td>
                                                            <td>{items.transaction_id}</td>
                                                            <td>{items.amount}</td>
                                                            <td>{items.description}</td>
                                                            <td>
                                                                {items.created}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            </div>
                                        }



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

export default AddBalance;