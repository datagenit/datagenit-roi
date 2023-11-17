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

    super();
    this.state = {
      storeName: '',
      storeContact: '',
      storeEmail: '',
      successMessage: false,
      storeNameError: '',
      storeContactError: '',
      storeEmailError: '',
      storeData: JSON.parse(localStorage.getItem('storeData')) || [],
    };
  }

  validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  addNewStore = () => {

    this.setState(
      {
        storeNameError: '',
        storeContactError: '',
        storeEmailError: '',
      },
      () => {
        let valid = true;

        if (this.state.storeName === '') {
          this.setState({
            storeNameError: 'Store Name is required',
          });
          valid = false;
        }

        if (this.state.storeContact === '') {
          this.setState({
            storeContactError: 'Phone number (10 digits required)',
          });
          valid = false;
        } else if (!this.validatePhone(this.state.storeContact)) {
          this.setState({
            storeContactError: 'Phone number (10 digits required) is not correct',
          });
          valid = false;
        }

        if (this.state.storeEmail === '') {
          this.setState({
            storeEmailError: 'Email Address is required',
          });
          valid = false;
        } else if (!this.validateEmail(this.state.storeEmail)) {
          this.setState({
            storeEmailError: 'Email Address is not correct',
          });
          valid = false;
        }

        if (valid) {
          const newStore = {
            storeid: this.state.storeData.length + 1, // Generate unique ID
            storeName: this.state.storeName,
            storeContact: this.state.storeContact,
            storeEmail: this.state.storeEmail,
          };
          localStorage.setItem('storeData', JSON.stringify([...this.state.storeData, newStore]));

          // After adding a new store, show success message
          this.setState({
            successMessage: 'Store added successfully!',
          });

          // Clear the success message after 3 seconds
          setTimeout(() => {
            this.setState({
              successMessage: '',
            });
          }, 3000);


        }

      }
    );
  };


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
                {this.state.successMessage && (
                  <div className="alert alert-success" role="alert">
                    {this.state.successMessage}
                  </div>
                )}
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
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faStore} />
                          </span>
                          <input type="text" onChange={(event) => this.setState({ storeName: event.target.value })} className="form-control" placeholder="Store Name" />
                        </div>
                        {this.state.storeNameError && (
                          <div className="text-danger">{this.state.storeNameError}</div>
                        )}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faPhone} />
                          </span>
                          <input type="text" onChange={(event) => this.setState({ storeContact: event.target.value })} className="form-control" placeholder="Contact No" />
                        </div>
                        {this.state.storeContactError && (
                          <div className="text-danger">{this.state.storeContactError}</div>
                        )}
                      </div>
                      <div class="col-6">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <input type="text" onChange={(event) => this.setState({ storeEmail: event.target.value })} className="form-control" placeholder="Email" />
                        </div>
                        {this.state.storeEmailError && (
                          <div className="text-danger">{this.state.storeEmailError}</div>
                        )}
                      </div>
                      <div class="col-2">
                        <input type="button" onClick={() => this.addNewStore()} value="Add Store" className="btn btn-primary w-100 mt-2" />
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