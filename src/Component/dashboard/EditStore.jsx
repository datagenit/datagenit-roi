import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSideMenu from '../../Component/navbar/DashboardSideMenu';
import DashboardTopMenu from '../../Component/navbar/DashboardTopMenu';
import Footer from '../../Component/footer/Footer';
import HeaderImg from '../../assets/img/header-blue-purple.jpg';
import CubeImg from '../../assets/img/3d-cube.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faStore } from '@fortawesome/free-solid-svg-icons'

const EditStore = () => {
  const { storeid } = useParams(); // Get the ID from the URL params
  console.log('ID from URL:', storeid); // Log the ID obtained from the URL params
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [store, setStore] = useState({
    storeid: '',
    storeName: '',
    storeContact: '',
    storeEmail: '',
  });



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('storeData')) || [];

    console.log('Initial storeData State:', storedData);

    const foundStore = storedData.find(c => c.storeid === Number(storeid)); // Ensure types match
    if (foundStore) {
      setStore(foundStore);
      console.log('Found Customer:', foundStore);
    } else {
      console.log('Customer not found');
    }
  }, [storeid]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Assuming 'customer' contains the updated customer data
    // Update the local storage data
    const storedData = JSON.parse(localStorage.getItem('storeData')) || [];
    const updatedData = storedData.map(item => {
      if (item.storeid === Number(storeid)) {
        return { ...item, ...store };
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
                      <h6 class="font-weight-semibold text-lg mb-0">Store Form</h6>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <form onSubmit={handleSubmit}>
                    <div class="row">
                      <div class="col-12">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faStore} />
                          </span>
                          <input
                            type="text"
                            name="storeName"
                            value={store.storeName}
                            onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faPhone} />
                          </span>
                          <input
                            type="text"
                            name="storeContact"
                            value={store.storeContact}
                            onChange={handleInputChange} className="form-control"
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="input-group mb-2 mt-2">
                          <span class="input-group-text text-body">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <input
                            type="text"
                            name="storeEmail"
                            value={store.storeEmail}
                            onChange={handleInputChange} className="form-control"
                          />
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


export default EditStore;