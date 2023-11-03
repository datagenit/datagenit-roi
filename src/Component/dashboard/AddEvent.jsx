import React, { Component } from 'react';
import DashboardSideMenu from '../../Component/navbar/DashboardSideMenu';
import DashboardTopMenu from '../../Component/navbar/DashboardTopMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import Axios from '../../axios/Axios';
import { dateFormate } from '../Utils/Utils';


class AddEvent extends Component {

  constructor() {
    const lStorage = JSON.parse(localStorage.getItem("client"));
    const userId = lStorage.user.userId;
    const userToken = lStorage.token;
    const adminType = lStorage.user.isAdmin;
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + ("0" + today.getDate()).slice(-2);
    super();

    this.state = {
      user_id: userId,
      token: userToken,
      adminType: adminType,
      dateFrom: date,
      dateTo: date,
      summaryData: [],
      serchData: '',
      userCurrentStatus: '',
      setIsLoading: false,
      ErrorResponse: '',
    }
    this.dateFrom = this.dateFrom.bind(this)
    this.dateTo = this.dateTo.bind(this)
  }


  searchSummary() {
    this.setState({
      setIsLoading: true,
      summaryData: [],
    })
    const method = [
      {
        name: 'Whatsapp Api',
        method: 'summary_admin'
      }
    ]

    method.map((item) => {
      let data = {
        user_id: this.state.user_id,
        method: item.method,
        token: this.state.token,
        date_from: this.state.dateFrom,
        date_to: this.state.dateTo,
      }
      console.log('data', data)
      Axios.post(`https://authkey.io/api/whatsapp_report.php`, data).then((res) => {
        // this.setState({ summaryData: res.data.message, setIsLoading: false });
        this.setState({
          summaryData: [...this.state.summaryData, Object.assign(res.data.message, { name: item.name })],
          setIsLoading: false
        })
      })
    })
  }

  dateFrom(date) {
    let selectedDate = dateFormate(date);
    this.setState({
      dateFrom: selectedDate
    })
  }

  dateTo(date) {
    let selectedDate = dateFormate(date);
    this.setState({
      dateTo: selectedDate
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
                    <h3 class="text-white mb-2">Add Event</h3>
                    <img src={CubeImg} alt="3d-cube" class="position-absolute top-0 end-1 w-25 max-width-200 mt-n6 d-sm-block d-none" />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header border-bottom pb-0">
                    <div class="d-sm-flex align-items-center mb-3">
                      <div>
                        <h6 class="font-weight-semibold text-lg mb-0">Event Form</h6>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-3">
                        <div class="input-group drop-down-icons mb-2 mt-2">

                          <select class="form-control">
                            <option title="SMS">SMS</option>
                            <option title="Voice">Voice</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-9">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faCalendar} />
                          </span>
                          <input type="text" onChange={(event) => this.setState({ empName: event.target.value })} class="form-control" placeholder="Event Name" />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">
                        <div class="input-group mb-2 mt-2">
                          <div class="input-group-text">
                            <FontAwesomeIcon icon={faCalendar} />
                          </div>
                          <DatePicker className="form-control btn-block"
                            dateFormat="yyyy/MM/dd"
                            value={this.state.dateFrom}
                            onChange={this.dateFrom}
                            selected={this.state.SelecteddateFrom}
                            placeholderText='From Date'
                          />
                        </div>
                      </div>
                      <div class="col-1">
                        <div class="text-center btn-block mt-2"><label class="mt-2">To</label></div>
                      </div>
                      <div class="col-4">
                        <div class="input-group mb-2 mt-2">
                          <div class="input-group-text text-body">
                            <FontAwesomeIcon icon={faCalendar} />
                          </div>
                          <DatePicker className="form-control btn-block"
                            dateFormat="yyyy/MM/dd"
                            value={this.state.dateTo}
                            onChange={this.dateTo}
                            selected={this.state.SelecteddateTo}
                            placeholderText='Date To'
                          />
                        </div>
                      </div>
                      <div class="col-3">
                        <input type="button" onClick={() => this.searchSummary()} value="Submit" className="btn btn-primary w-100 mt-2" />
                      </div>
                    </div>
                  </div>
                  <hr class="my-0" />
                  <div class="table-responsive">
                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                      <div class="dataTable-container">
                        <table class="table table-flush dataTable-table">
                          <thead class="bg-gray-100">
                            <tr>
                              <th class="text-xs">Select</th>
                              <th class="text-xs">Campaign Id</th>
                              <th class="text-xs">Message</th>

                              <th class="text-xs">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="text-xs">
                                <div class="my-auto form-check">
                                  <input class="form-check-input" type="checkbox" />
                                </div>
                              </td>
                              <td class="text-sm">1</td>
                              <td class="text-sm">arrival</td>
                              <td class="text-sm">500</td>
                            </tr>
                            <tr>
                              <td class="text-xs">
                                <div class="my-auto form-check">
                                  <input class="form-check-input" type="checkbox" />
                                </div>
                              </td>
                              <td class="text-sm">1</td>
                              <td class="text-sm">arrival</td>
                              <td class="text-sm">500</td>
                            </tr>
                            <tr>
                              <td class="text-xs">
                                <div class="my-auto form-check">
                                  <input class="form-check-input" type="checkbox" />
                                </div>
                              </td>
                              <td class="text-sm">1</td>
                              <td class="text-sm">arrival</td>
                              <td class="text-sm">500</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="dataTable-bottom mt-2 mr-2 mb-3 px-4">
                        <a href="#" class="me-2 mb-0 btn btn-dark"><i class="fas fa-long-arrow-right me-1"></i>Submit</a>
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

export default AddEvent