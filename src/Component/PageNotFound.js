import React from 'react';
import { Link } from 'react-router-dom';
import Pagenotfound from '../assets/img/pagenotfound.png';

const PageNotFound = ({ location }) => {
  setTimeout(function () { window.location = "/logout"; }, 5000);

  return (
    <div className="container-xxl mt-5 container-p-y">
      <div className="misc-wrapper text-center">
        <h2 className="mb-2 mx-2">Something Went Wrong:(</h2>
        <p className="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">Return to website</Link>
        <div className="mt-3">
          <img src={Pagenotfound} alt="Page Not Found" className="img-fluid p-5" />
        </div>
      </div>
    </div>
  )
};

export default PageNotFound;