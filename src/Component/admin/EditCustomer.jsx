import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideMenu from '../../Component/navbar/AdminSideMenu';
import AdminTopMenu from '../../Component/navbar/AdminTopMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMap, faBuilding } from '@fortawesome/free-solid-svg-icons';


const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [formData, setFormData] = useState({
    custName: '',
    custEmail: '',
    custPhone: '',
    compName: '',
    custAddress: '',
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('customerData')) || [];
    console.log('storedData:', storedData);

    const customer = storedData.find((customer) => customer.id === parseInt(id));
    console.log('customer id:', customer.id);
    console.log('found customer:', parseInt(id));

    if (customer) {
      setFormData({
        custName: customer.custName,
        custEmail: customer.custEmail,
        custPhone: customer.custPhone,
        compName: customer.compName,
        custAddress: customer.custAddress,
      });
    }
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCustomers = customerData.map((customer) => {
      if (customer.id === parseInt(id)) {
        return {
          ...customer,
          custName: formData.custName,
          custEmail: formData.custEmail,
          custPhone: formData.custPhone,
          compName: formData.compName,
          custAddress: formData.custAddress,
        };
      }
      return customer;
    });

    localStorage.setItem('customerData', JSON.stringify(updatedCustomers));
    navigate('/admin/list-customer');
  };

  console.log('adds', formData); // Log formData on render


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
                  <h3 class="text-white mb-2">Edit Customer</h3>
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
                      <h6 class="font-weight-semibold text-lg mb-0">Customer Form</h6>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <form onSubmit={handleSubmit}>
                    <div class="row">
                      <div class="col-lg-6 mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                          <input
                            type="text"
                            name="custName"
                            value={formData.custName}
                            onChange={handleInputChange} className="form-control" placeholder="Enter Customer Name" />
                        </div>
                      </div>
                      <div class="col-lg-6 mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <input
                            type="text"
                            name="custEmail"
                            value={formData.custEmail}
                            onChange={handleInputChange} className="form-control" placeholder="Email"
                          />
                        </div>
                      </div>

                      <div class="col-lg-6 mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faPhone} />
                          </span>
                          <input
                            type="text"
                            name="custPhone"
                            value={formData.custPhone}
                            onChange={handleInputChange} className="form-control" placeholder="Enter 10 Digit Mobile Number"
                          />
                        </div>
                      </div>

                      <div class="col-lg-6 mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faBuilding} />
                          </span>
                          <input
                            type="text"
                            name="compName"
                            value={formData.compName}
                            onChange={handleInputChange} class="form-control" placeholder="Company Name"
                          />
                        </div>
                      </div>

                      <div class="col-lg-12  mb-2 mt-2">
                        <div class="input-group">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faMap} />
                          </span>
                          <textarea name="custAddress"
                            value={formData.custAddress}
                            onChange={handleInputChange} class="form-control" placeholder="Address"></textarea>
                        </div>
                      </div>

                      <div class="col-3 mt-2">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>

                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>

          <Footer />
        </div>

      </main >
    </div >


  );
};

export default EditCustomer;