import React, { Component } from 'react';
import AdminTopMenu from '../../Component/navbar/AdminTopMenu';
import AdminSideMenu from '../../Component/navbar/AdminSideMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMap, faBuilding } from '@fortawesome/free-solid-svg-icons';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    // ... (other code)
  }

  state = {
    custName: '',
    custEmail: '',
    custPhone: '',
    compName: '',
    custAddress: '',
    customerData: [],
    custNameError: '',
    custEmailError: '',
    custPhoneError: '',
    compNameError: '',
    custAddressError: '',
  };

  validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  addNewCustomer = () => {

    this.setState(
      {
        custNameError: '',
        custEmailError: '',
        custPhoneError: '',
        compNameError: '',
        custAddressError: '',
      },
      () => {
        let valid = true;

        if (this.state.custName === '') {
          this.setState({
            custNameError: 'Customer Name is required',
          });
          valid = false;
        }

        if (this.state.compName === '') {
          this.setState({
            compNameError: 'Company Name is required',
          });
          valid = false;
        }

        if (this.state.custAddress === '') {
          this.setState({
            custAddressError: 'Customer Address is required',
          });
          valid = false;
        }

        if (this.state.custEmail === '') {
          this.setState({
            custEmailError: 'Email Address is required',
          });
          valid = false;
        } else if (!this.validateEmail(this.state.custEmail)) {
          this.setState({
            custEmailError: 'Email Address is not correct',
          });
          valid = false;
        }

        if (this.state.custPhone === '') {
          this.setState({
            custPhoneError: 'Phone number (10 digits required)',
          });
          valid = false;
        } else if (!this.validatePhone(this.state.custPhone)) {
          this.setState({
            custPhoneError: 'Phone number (10 digits required) is not correct',
          });
          valid = false;
        }

        if (valid) {
          const newCustomer = {
            custName: this.state.custName,
            custEmail: this.state.custEmail,
            custPhone: this.state.custPhone,
            compName: this.state.compName,
            custAddress: this.state.custAddress,
          };

          this.setState(
            (prevState) => ({
              customerData: [...prevState.customerData, newCustomer],
            }),
            () => {
              // Log the updated customerData array
              console.log('Customer Data:', this.state.customerData);

              // Navigate to the list customer page with the updated data
              this.props.history.push('/list-customer', {
                customers: this.state.customerData,
              });
            }
          );
        }
      }
    );
  };


  render() {
    return (
      <div>
        <AdminSideMenu />

        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

          <AdminTopMenu />
          <div class="container-fluid py-4 px-5">
            <div class="row">
              <div class="col-12">
                <div class="card card-background card-background-after-none align-items-start mt-4 mb-5">
                  <div class="full-background" style={{
                    backgroundImage: `url(${HeaderImg})`,
                    backgroundRepeat: "no-repeat",
                  }}></div>
                  <div class="card-body text-start p-4 w-100">
                    <h3 class="text-white mb-2">Add Customer</h3>
                    <img src={CubeImg} alt="3d-cube" class="position-absolute top-0 end-1 w-25 max-width-200 mt-n6 d-sm-block d-none" />
                  </div>
                </div>
                {
                  this.state.successMessage ?
                    <div className={this.state.bgColor} role="alert">
                      {this.state.errorMessage}
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    :
                    null
                }
              </div>
            </div>

            <div class="mt-4 row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header border-bottom pb-0">
                    <div class="d-sm-flex align-items-center mb-3">
                      <div>
                        <h6 class="font-weight-semibold text-lg mb-0">Customer Form</h6>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-6 mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                          <input type="text" onChange={(event) => this.setState({ custName: event.target.value })} className="form-control" placeholder="Enter Customer Name" />
                        </div>
                        {this.state.custNameError && (
                          <div className="text-danger">{this.state.custNameError}</div>
                        )}
                      </div>
                      <div class="col-lg-6 mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <input onChange={(event) => this.setState({ custEmail: event.target.value })} type="email" className="form-control" placeholder="Email" />
                        </div>
                        {this.state.custEmailError && (
                          <div className="text-danger">{this.state.custEmailError}</div>
                        )}
                      </div>

                      <div class="col-lg-6 mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faPhone} />
                          </span>
                          <input type="text" onChange={(event) => this.setState({ custPhone: event.target.value })} className="form-control" placeholder="Enter 10 Digit Mobile Number" />
                        </div>
                        {this.state.custPhoneError && (
                          <div className="text-danger">{this.state.custPhoneError}</div>
                        )}
                      </div>
                      <div class="col-lg-6 mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faBuilding} />
                          </span>
                          <input type="text" onChange={(event) => this.setState({ compName: event.target.value })} class="form-control" placeholder="Company Name" />
                        </div>
                        {this.state.compNameError && (
                          <div className="text-danger">{this.state.compNameError}</div>
                        )}
                      </div>
                      <div class="col-lg-12  mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faMap} />
                          </span>
                          <textarea onChange={(event) => this.setState({ custAddress: event.target.value })} class="form-control" placeholder="Address"></textarea>
                        </div>
                        {this.state.custAddressError && (
                          <div className="text-danger">{this.state.custAddressError}</div>
                        )}
                      </div>
                      <div class="col-3 mt-2">
                        <input type="button" onClick={() => this.addNewCustomer()} value="Submit" className="btn btn-primary" />
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

export default AddCustomer