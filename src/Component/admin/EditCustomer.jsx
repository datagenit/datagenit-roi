import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSideMenu from '../../Component/navbar/AdminSideMenu';
import AdminTopMenu from '../../Component/navbar/AdminTopMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMap, faBuilding } from '@fortawesome/free-solid-svg-icons';

const EditCustomer = () => {
  const { custid } = useParams(); // Get the ID from the URL params
  console.log('ID from URL:', custid); // Log the ID obtained from the URL params
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [customer, setCustomer] = useState({
    custid: '',
    custName: '',
    custEmail: '',
    custPhone: '',
    compName: '',
    custAddress: '',
  });



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('customerData')) || [];

    console.log('Initial Customer State:', storedData);

    const foundCustomer = storedData.find(c => c.custid === Number(custid)); // Ensure types match
    if (foundCustomer) {
      setCustomer(foundCustomer);
      console.log('Found Customer:', foundCustomer);
    } else {
      console.log('Customer not found');
    }
  }, [custid]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Assuming 'customer' contains the updated customer data
    // Update the local storage data
    const storedData = JSON.parse(localStorage.getItem('customerData')) || [];
    const updatedData = storedData.map(item => {
      if (item.custid === Number(custid)) {
        return { ...item, ...customer };
      }
      return item;
    });

    localStorage.setItem('customerData', JSON.stringify(updatedData));
    setSuccessMessage('Form submitted successfully!');

    // Redirect to the customer list or any other route
    navigate('/admin/list-customer');
  };
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
                {successMessage && <div className="success">{successMessage}</div>}
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
                            value={customer.custName}
                            onChange={handleInputChange} className="form-control" />
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
                            value={customer.custEmail}
                            onChange={handleInputChange} className="form-control"
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
                            value={customer.custPhone}
                            onChange={handleInputChange} className="form-control"
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
                            value={customer.compName}
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
                            value={customer.custAddress}
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
}


export default EditCustomer;