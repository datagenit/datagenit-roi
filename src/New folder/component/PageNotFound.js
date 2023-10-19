import React from 'react';
import {Link} from 'react-router-dom';

const PageNotFound = ({ location }) => {
  setTimeout(function () { window.location = "/logout"; }, 5000);
  
return(
    <div className="container-xxl mt-5 container-p-y">
      <div className="misc-wrapper text-center">
        <h2 className="mb-2 mx-2">Something Went Wrong:(</h2>
        <p className="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">Return to website</Link>
        <div className="mt-3">
          <img
            src="../img/illustrations/page-misc-error-light.png"
            alt="page-misc-error-light"
            width="500"
            className="img-fluid p-5"
          />
        </div>
      </div>
    </div>
)
};

export default PageNotFound;