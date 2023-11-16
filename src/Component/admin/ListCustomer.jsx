
import React, { useEffect, useState } from 'react';
import AdminSideMenu from '../../Component/navbar/AdminSideMenu';
import AdminTopMenu from '../../Component/navbar/AdminTopMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';

const ListCustomer = () => {

  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = JSON.parse(localStorage.getItem('customerData')) || [];
    setCustomerData(storedData);
  }, []);

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
                  <h3 class="text-white mb-2">List Customer</h3>
                  <img src={CubeImg} alt="3d-cube" class="position-absolute top-0 end-1 w-25 max-width-200 mt-n6 d-sm-block d-none" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card border shadow-xs mb-4">


                <div class="table-responsive p-0">

                  <table class="table align-items-center mb-0">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">S.No.</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Customer Name</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Email</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Phone No</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Company Name</th>
                        <th class="text-left text-secondary text-xs font-weight-semibold opacity-7">Company Address</th>
                        <th class="text-center text-secondary text-xs font-weight-semibold opacity-7">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerData.map((customer, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{customer.custName}</td>
                          <td>{customer.custEmail}</td>
                          <td>{customer.custPhone}</td>
                          <td>{customer.compName}</td>
                          <td>{customer.custAddress}</td>
                          <td class="text-center align-middle">
                            <a href={`/admin/edit-customer/${index}`} class="mx-2" data-bs-toggle="tooltip" data-bs-title="Edit">
                              <i class="fas fa-user-edit text-dark" aria-hidden="true"></i>
                            </a>
                            <a href="javascript:;" class="mx-2" data-bs-toggle="tooltip" data-bs-title="Delete">
                              <i class="fas fa-trash text-dark" aria-hidden="true"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
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

export default ListCustomer