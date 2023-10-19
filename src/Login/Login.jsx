import React from 'react';
import SignupBg from '../assets/img/image-sign-up.jpg';
import SignupLogo from '../assets/img/logo3.png';
import Teamimg from '../assets/img/team-2.jpg';



const Login = () => {
  return (
    <div>
      <main class="main-content  mt-0">
        <section>
          <div class="page-header min-vh-100">
            <div class="container">
              <div class="row">

                <div class="col-md-4 d-flex flex-column mx-auto">
                  <div class="card card-plain mt-8">
                    <div class="card-header pb-0 text-left bg-transparent">

                      <h3 class="font-weight-black text-dark display-6">Sign In</h3>
                      <p class="mb-0">Nice to meet you! Please enter your details.</p>
                    </div>
                    <div class="card-body">
                      <form role="form">
                        <label>Email Address</label>
                        <div class="mb-3">
                          <input type="email" class="form-control" placeholder="Enter your email address" aria-label="Email" aria-describedby="email-addon" />
                        </div>
                        <label>Password</label>
                        <div class="mb-3">
                          <input type="email" class="form-control" placeholder="Create a password" aria-label="Password" aria-describedby="password-addon" />
                        </div>
                        <div class="form-check form-check-info text-left mb-0">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                          <label class="font-weight-normal text-dark mb-0" for="flexCheckDefault">
                            I agree the <a href="javascript:;" class="text-dark font-weight-bold">Terms and Conditions</a>.
                          </label>
                        </div>
                        <div class="text-center">
                          <button type="button" class="btn btn-dark w-100 mt-4 mb-3">Sign In</button>
                        </div>
                      </form>
                    </div>
                    <div class="card-footer text-center pt-0 px-lg-2 px-1">
                      <p class="mb-4 text-xs mx-auto">
                        Already have an account?
                        <a href="javascript:;" class="text-dark font-weight-bold">Sign in</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  )
}

export default Login