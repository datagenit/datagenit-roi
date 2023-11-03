import React, { Component } from 'react';
import DashboardSideMenu from '../../Component/navbar/DashboardSideMenu';
import DashboardTopMenu from '../../Component/navbar/DashboardTopMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faStore } from '@fortawesome/free-solid-svg-icons'

class AddStore extends Component {

  constructor() {

    const lStorage = JSON.parse(localStorage.getItem("client"));
    const userId = lStorage.user.userId;
    const userToken = lStorage.token;

    super();

    this.state = {
      user_id: userId,
      token: userToken,
      empName: '',
      empEmail: '',
      empPhone: '',
      successMessage: false,
      errorMessage: '',
      bgColor: '',
    }
  }


  addNewEmployedd() {

    fetch(`https://authkey.io/api/employee_user_list.php?user_id=${this.state.user_id}&method=add&fullname=${this.state.empName}&mobile=${this.state.empPhone}&email=${this.state.empEmail}&password=${this.state.empPassword}&token=${this.state.token}`).then((response) => {
      response.json().then((result) => {
        console.log(result)
        if (result.success === true) {
          this.setState({
            successMessage: true,
            bgColor: "alert alert-success alert-dismissible",
            errorMessage: result.message
          })
        } else {
          this.setState({
            successMessage: true,
            bgColor: "alert alert-danger alert-dismissible",
            errorMessage: result.message
          })
        }
      })
    })
  }

  render() {
    return (
      <div>

        <DashboardSideMenu />
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <DashboardTopMenu />

          <div class="container-fluid py-4 px-5">
            <div class="row">
              <div class="col-12">
                <div class="card card-background card-background-after-none align-items-start mt-4 mb-5">
                  <div class="full-background" style={{
                    backgroundImage: `url(${HeaderImg})`,
                    backgroundRepeat: "no-repeat",
                  }}></div>
                  <div class="card-body text-start p-4 w-100">
                    <h3 class="text-white mb-2">Add Store</h3>
                    <img src={CubeImg} alt="3d-cube" class="position-absolute top-0 end-1 w-25 max-width-200 mt-n6 d-sm-block d-none" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header border-bottom pb-0">
                    <div class="d-sm-flex align-items-center mb-3">
                      <div>
                        <h6 class="font-weight-semibold text-lg mb-0">Store Form</h6>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">

                    <div class="row">
                      <div class="col-12">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body"><FontAwesomeIcon icon={faStore} /></span>
                          <input type="text" onChange={(event) => this.setState({ empName: event.target.value })} className="form-control" placeholder="Store Name" />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body"><FontAwesomeIcon icon={faPhone} /></span>
                          <input type="text" onChange={(event) => this.setState({ empName: event.target.value })} className="form-control" placeholder="Contact No" />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body"><FontAwesomeIcon icon={faEnvelope} /></span>
                          <input type="text" onChange={(event) => this.setState({ empName: event.target.value })} className="form-control" placeholder="Email" />
                        </div>
                      </div>
                      <div class="col-2">
                        <input type="button" onClick={() => this.addNewEmployedd()} value="Add Store" className="btn btn-primary w-100 mt-2" />
                      </div>
                    </div>
                  </div>
                  <hr class="my-0" />
                  <div class="table-responsive">
                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">

                      <div class="dataTable-container">

                        <table class="table table-flush dataTable-table">
                          <thead>
                            <tr>
                              <th class="text-xs">
                                <div class="my-auto form-check">
                                  <input class="form-check-input" type="checkbox" id="customCheck1" />
                                </div>
                              </th>
                              <th class="text-xs">Campaign Id</th>
                              <th class="text-xs">Manage</th>
                              <th class="text-xs">Delivery</th>
                              <th class="text-xs">Failed</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div class="text-xs">
                                  <div class="my-auto form-check">
                                    <input class="form-check-input" type="checkbox" id="customCheck1" />
                                  </div>
                                </div>
                              </td>
                              <td class="text-sm">1</td>
                              <td class="text-sm">arrival</td>
                              <td class="text-sm">2000</td>
                              <td class="text-sm">400</td>
                            </tr>


                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>

        </main >
      </div >
    );
  }
}


export default AddStore