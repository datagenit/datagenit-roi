import React from 'react';
import AdminSideMenu from '../../Component/navbar/AdminSideMenu';
import AdminTopMenu from '../../Component/navbar/AdminTopMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';

const ListStore = () => {
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
                  <h3 class="text-white mb-2">List Event</h3>
                  <img src={CubeImg} alt="3d-cube" class="position-absolute top-0 end-1 w-25 max-width-200 mt-n6 d-sm-block d-none" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card border shadow-xs mb-4">
                <div class="card-header border-bottom pb-0">
                  <div class="d-sm-flex align-items-center mb-3">
                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                      <div class="dataTable-top">
                        <div class="dataTable-dropdown"><label>
                          <select class="dataTable-selector">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                          </select> entries per page</label>
                        </div>
                      </div>
                    </div>
                    <div class="ms-auto d-flex">
                      <div class="input-group input-group-sm ms-auto me-2">
                        <span class="input-group-text text-body">

                        </span>
                        <input type="text" class="form-control form-control-sm" placeholder="Search" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">S.No.</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Store Name</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Coupon Id</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Deliver</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Failed</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Date</th>
                        <th class="text-center text-secondary text-xs font-weight-semibold opacity-7">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">Store1</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">(1,2,3)</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">1000</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">200</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">20-8-2023</p></td>
                        <td class="text-center align-middle">
                          <a href="javascript:;" class="mx-2" data-bs-toggle="tooltip" data-bs-title="Edit">
                            <i class="fas fa-user-edit text-dark" aria-hidden="true"></i>
                          </a>
                          <a href="javascript:;" class="mx-2" data-bs-toggle="tooltip" data-bs-title="Delete">
                            <i class="fas fa-trash text-dark" aria-hidden="true"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">Store1</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">(1,2,3)</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">1000</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">200</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">20-8-2023</p></td>
                        <td class="text-center align-middle">
                          <a href="javascript:;" class="mx-2" data-bs-toggle="tooltip" data-bs-title="Edit">
                            <i class="fas fa-user-edit text-dark" aria-hidden="true"></i>
                          </a>
                          <a href="javascript:;" class="mx-2" data-bs-toggle="tooltip" data-bs-title="Delete">
                            <i class="fas fa-trash text-dark" aria-hidden="true"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">Store1</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">(1,2,3)</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">1000</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">200</p></td>
                        <td><p class="text-sm text-dark font-weight-semibold mb-0">20-8-2023</p></td>
                        <td class="text-center align-middle">
                          <a href="javascript:;" class="mx-2" data-bs-toggle="tooltip" data-bs-title="Edit">
                            <i class="fas fa-user-edit text-dark" aria-hidden="true"></i>
                          </a>
                          <a href="javascript:;" class="mx-2" data-bs-toggle="tooltip" data-bs-title="Delete">
                            <i class="fas fa-trash text-dark" aria-hidden="true"></i>
                          </a>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
                <div class="border-top py-3 px-3 d-flex align-items-center">
                  <button class="btn btn-sm btn-white d-sm-block d-none mb-0">Previous</button>
                  <nav aria-label="..." class="ms-auto">
                    <ul class="pagination pagination-light mb-0">
                      <li class="page-item active" aria-current="page">
                        <span class="page-link font-weight-bold">1</span>
                      </li>
                      <li class="page-item"><a class="page-link border-0 font-weight-bold" href="javascript:;">2</a></li>
                      <li class="page-item"><a class="page-link border-0 font-weight-bold d-sm-inline-flex d-none" href="javascript:;">3</a></li>
                      <li class="page-item"><a class="page-link border-0 font-weight-bold" href="javascript:;">...</a></li>
                      <li class="page-item"><a class="page-link border-0 font-weight-bold d-sm-inline-flex d-none" href="javascript:;">8</a></li>
                      <li class="page-item"><a class="page-link border-0 font-weight-bold" href="javascript:;">9</a></li>
                      <li class="page-item"><a class="page-link border-0 font-weight-bold" href="javascript:;">10</a></li>
                    </ul>
                  </nav>
                  <button class="btn btn-sm btn-white d-sm-block d-none mb-0 ms-auto">Next</button>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div >

      </main >
    </div >

  )
}

export default ListStore