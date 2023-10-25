import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { URL } from '../../common/Url';
import {type} from '../../common/AdminAuth';
const AddSmsc = () => {

  const { id } = useParams()

  const [error, seterror] = useState({
    errarStatus: false,
    errorMessage: '',
    bgcolor: ''
  });

  const [addSmsc, setaddSmsc] = useState({
    title:'',
    userName: '',
    password: '',
    ip: '',
    trxport:'',
    Tx:'',
    txPort:'',
    Rx:'',
    rxPort:'',
    Trx:'',
    istrx:'1',
  })



  let name, value;
  const inputsHandler = (e) => {
    name = e.target.name;
    value = e.target.value;
    setaddSmsc({ ...addSmsc, [name]: value })
  }

  const submitButton = () => {
    seterror({
      errarStatus: false,
    });
    window.scrollTo(0, 0)
    if (addSmsc.title && addSmsc.userName && addSmsc.password && addSmsc.ip) {
      fetch(`${URL}smsc.php?user_id=1&method=create&title=${addSmsc.title}&username=${addSmsc.userName}&password=${addSmsc.password}&ip_address=${addSmsc.ip}&trx=${addSmsc.Trx}&trx_port=${addSmsc.trxport}&rx=${addSmsc.Rx}&tx=${addSmsc.Tx}&rx_port=${addSmsc.rxPort}&tx_port=${addSmsc.txPort}`).then((response) => {
        response.json().then((result) => {
          if (result.success === true) {
            seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-success' });
            setTimeout(function () {
              window.location = '/admin/smsc';
            }, 2000);
          } else {
            seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
          }
        })
      })
    } else {
      seterror({ errarStatus: true, errorMessage: 'All Form Fields are required !', bgcolor: 'alert alert-danger' });
    }
  }

  const getSMECDetails = () => {
    if (id) {
      fetch(`${URL}smsc.php?user_id=1&method=retrieveid&id=${id}`).then((response) => {
        response.json().then((result) => {
          //console.log('result', result);
          if (result.success === true) {
            setaddSmsc({
              userName: result.data[0].username,
              password: result.data[0].password,
              title: result.data[0].title,
              ip: result.data[0].ip_address,
              trxport: result.data[0].port,
              Trx: result.data[0].trx,
              Tx: result.data[0].tx,
              txPort: result.data[0].tx,
              Rx: result.data[0].rx,
              rxPort: result.data[0].rx,
              

            })
          } else {
            seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
          }
        })
      })
    }
  }

  useEffect(() => {
    getSMECDetails();
  }, [])


  const updateSMSCDetails = () => {
    seterror({
      errarStatus: false,
    });
    window.scrollTo(0, 0)
    fetch(`${URL}smsc.php?user_id=1&method=update&title=${addSmsc.title}&username=${addSmsc.userName}&password=${addSmsc.password}&ip_address=${addSmsc.ip}&port=${addSmsc.port}&trx=${addSmsc.Trx}&rx=${addSmsc.Rx}&tx=${addSmsc.Tx}&id=${id}`).then((response) => {
      response.json().then((result) => {
       // console.log(result)
        if (result.success === true) {
          seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-success' });
        } else {
          seterror({ errarStatus: true, errorMessage: result.message, bgcolor: 'alert alert-danger' });
        }
      })
    })
  }

  const trxHandler = (e) => {
    if(e.target.value==='0'){
      setaddSmsc({...addSmsc, istrx: e.target.value , Tx:0, Rx:0, txPort:0, rxPort:0})
    }else{
      setaddSmsc({...addSmsc, istrx: e.target.value , trxport:0, trx:0})
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
                    <h5 className="card-header">{id ? 'Edit / View':'Add New SMSC'}
                    <span className="demo-inline-spacing float-right ">
                      <Link className="btn btn-primary me-1" to="/admin/smsc-report">
                        <FontAwesomeIcon icon={faArrowLeft} />  Go Back
                      </Link>
                    </span>
                    </h5>
                    <hr className='m-0' />
                    <div className="card-body">

                      <div className='row'>


                      <div className='col-md-12 mb-3'>
                          <label for="defaultFormControlInput" className="form-label">Title Name</label>
                          <input type="text" className="form-control" name='title' value={addSmsc.title} onChange={inputsHandler} id="defaultFormControlInput" placeholder="username" aria-describedby="defaultFormControlHelp" />
                        </div>
                  
                        <div className='col-md-6'>
                          <label for="defaultFormControlInput" className="form-label">User Name</label>
                          <input type="text" className="form-control" name='userName' value={addSmsc.userName} onChange={inputsHandler} id="defaultFormControlInput" placeholder="username" aria-describedby="defaultFormControlHelp" />

                        </div>
                        <div className='col-md-6'>
                          <label for="defaultFormControlInput" className="form-label">Password</label>
                          <input type="number" className="form-control" name='password' value={addSmsc.password} onChange={inputsHandler} id="defaultFormControlInput" placeholder="Enter Password" aria-describedby="defaultFormControlHelp" />
                        </div>

                        <div className='col-md-6 mt-3'>
                          <label for="defaultFormControlInput" className="form-label">Host</label>
                          <input name='ip' value={addSmsc.ip} onChange={inputsHandler} type="text" className="form-control" id="defaultFormControlInput" placeholder="Example : 10.126.3.4" aria-describedby="defaultFormControlHelp" />
                        </div>

                       


                        <div className='col-md-6  mt-3'>
                          <label for="defaultFormControlInput" className="form-label"> Is Trx </label>
                          <select name='enablePrepaid' onChange={trxHandler} className='form-select'>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                          </select>
                        </div>

                     

                    {addSmsc.istrx==='0'?

                    <>
                    <div className='col-md-3 mt-3'>
                          <label for="defaultFormControlInput" className="form-label">Tx Session Count</label>
                          <input type="number" className="form-control" name='Tx' value={addSmsc.Tx} onChange={inputsHandler} id="defaultFormControlInput" placeholder="Example : 1, 20" aria-describedby="defaultFormControlHelp" />
                        </div>

                        <div className='col-md-3 mt-3'>
                          <label for="defaultFormControlInput" className="form-label">Tx Port</label>
                          <input name='txPort' value={addSmsc.txPort} onChange={inputsHandler} type="text" className="form-control" id="defaultFormControlInput" placeholder="20" aria-describedby="defaultFormControlHelp" />
                        </div>


                        <div className='col-md-3 mt-3'>
                          <label for="defaultFormControlInput" className="form-label">Rx Session Count</label>
                          <input type="number" className="form-control" name='Rx' value={addSmsc.Rx} onChange={inputsHandler} id="defaultFormControlInput" placeholder="Example : 1, 20" aria-describedby="defaultFormControlHelp" />
                        </div>

                        <div className='col-md-3 mt-3'>
                          <label for="defaultFormControlInput" className="form-label">Rx Port</label>
                          <input name='rxPort' value={addSmsc.rxPort} onChange={inputsHandler} type="text" className="form-control" id="defaultFormControlInput" placeholder="20" aria-describedby="defaultFormControlHelp" />
                        </div>

                    </>

                      :
                      <>
                      <div className='col-md-6 mt-3'>
                          <label for="defaultFormControlInput" className="form-label">TRX Session Count</label>
                          <input type="number" className="form-control" name='Trx' value={addSmsc.Trx} onChange={inputsHandler} id="defaultFormControlInput" placeholder="20" aria-describedby="defaultFormControlHelp" />
                         
                        </div>

                        <div className='col-md-6 mt-3'>
                          <label for="defaultFormControlInput" className="form-label">TRX Port</label>
                          <input name='trxport' value={addSmsc.trxport} onChange={inputsHandler} type="text" className="form-control" id="defaultFormControlInput" placeholder="20" aria-describedby="defaultFormControlHelp" />
                        </div>
                      </>

                    }
                        





                      </div>

                      <div className=' text-right'>
                        {id ?
                          <button type="button" onClick={updateSMSCDetails} className="btn btn-primary mt-5">Update SMSC Details</button>
                          :
                          <button type="button" onClick={submitButton} className="btn btn-primary mt-5">Add SMSC</button>
                        }



                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            :
            <div className='alert m-5 alert-danger'>
            You don't have permission to access this page.
            </div>

            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSmsc;