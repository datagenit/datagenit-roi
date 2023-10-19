import React from 'react';
import DashboardSideMenu from '../../Component/navbar/DashboardSideMenu';
import DashboardTopMenu from '../../Component/navbar/DashboardTopMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';

const AddEvent = () => {
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
                        </span>
                        <input type="text" class="form-control" placeholder="Event Name" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-5">
                      <div class="input-group mb-2 mt-2">
                        <span class="input-group-text text-body">
                        </span>
                        <input type="text" class="form-control datepicker" placeholder="From" />
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="input-group mb-2 mt-2">
                        <span class="input-group-text text-body">
                        </span>
                        <input type="text" class="form-control datepicker" placeholder="From" />
                      </div>
                    </div>
                    <div class="col-2">
                      <a href="./new-product.html" class="mb-0 btn btn-primary w-100 mt-2">Submit</a>
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

  )
}

export default AddEvent