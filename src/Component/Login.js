import React, { Component } from 'react';
import SignupBg from '../assets/img/image-sign-up.jpg';
import SignupLogo from '../assets/img/logo3.png';
import { URL } from '../Component/common/Url'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isfacebooklogin: false,
      show: false,
      loginMessage: "",
      bgColor: "",
    };
    this.keyPressed = this.keyPressed.bind(this);
    this.login = this.login.bind(this);
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.login();
    }
  }



  login() {
    this.setState({ loginMessage: false });
    var url = document.location.href;
    fetch(`${URL}/login.php`, {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.success === true) {
          this.setState({
            show: true,
            loginMessage: "Success",
            bgColor: "alert alert-success",
          });
          if (resp.user.isAdmin === "client") {
            localStorage.setItem("client", JSON.stringify(resp));
            setTimeout(function () {
              window.location = "/dashboard";
            }, 1000);
          } else if (resp.user.isAdmin === "admin") {
            localStorage.setItem("admin", JSON.stringify(resp));
            setTimeout(function () {
              window.location = "/admin";
            }, 1000);
          } else if (resp.user.isAdmin === "emp") {
            localStorage.setItem("emp", JSON.stringify(resp));
            setTimeout(function () {
              window.location = "/admin";
            }, 1000);
          }
        } else {
          this.setState({
            show: true,
            loginMessage: resp.message,
            bgColor: "alert alert-danger",
          });
        }
      });
    });
  };

  render() {

    return (
      <div>
        <main className="main-content  mt-0">
          <section>
            <div className="page-header min-vh-100">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="position-absolute w-40 top-0 start-0 h-100 d-md-block d-none">
                      <div className="oblique-image position-absolute d-flex fixed-top ms-auto h-100 z-index-0 bg-cover me-n8" style={{
                        backgroundImage: `url(${SignupBg})`,
                        backgroundRepeat: "no-repeat",
                      }} >
                        <div className="my-auto text-start max-width-350 ms-7">
                          <img src={SignupLogo} alt="logo" />
                          <h1 className="mt-3 text-white font-weight-bolder" style={{ fontSize: '2.2em' }}>Deliver Customer Experiences</h1>
                          <p className="text-white text-lg mt-4 mb-4">A comprehensive Omnichannel Loyalty Sales & Marketing Platform to unlock growth & build closer relationships with your customers.</p>
                          <div className="d-flex align-items-center">
                            <p className="font-weight-bold text-white text-sm mb-0 ms-2">Join 2.5M+ users</p>
                          </div>
                        </div>
                        <div className="text-start position-absolute fixed-bottom ms-7">
                          <h6 className="text-white text-sm mb-5">Copyright © 2023 Datagenit.</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 d-flex flex-column mx-auto">
                    <div className="card card-plain mt-8">
                      <div className="card-header pb-0 text-left bg-transparent">

                        {
                          this.state.show ?
                            <div className={this.state.bgColor}>
                              {this.state.loginMessage}
                            </div>
                            :
                            null
                        }


                        <h3 className="font-weight-black text-dark display-6">Sign In</h3>
                        <p className="mb-0">Nice to meet you! Please enter your details.</p>
                      </div>
                      <div className="card-body">
                        <form role="form">
                          <label>Email Address</label>
                          <div className="mb-3">
                            <input type="text"
                              className="form-control"
                              id="email"
                              name="email-username"
                              placeholder="Enter your email or username"
                              autofocus
                              onChange={(event) => this.setState({ username: event.target.value })}
                              onKeyPress={this.keyPressed} />
                          </div>
                          <label>Password</label>
                          <div className="mb-3">
                            <input
                              type={this.state.showpassword ? "text" : "password"}
                              id="password"
                              className="form-control"
                              name="password"
                              placeholder="Enter Password"
                              aria-describedby="password"
                              onChange={(event) => this.setState({ password: event.target.value })}
                              onKeyPress={this.keyPressed}
                            />
                          </div>
                          <div className="text-center">
                            <button type="button" className="btn btn-dark w-100 mt-2 mb-3" onClick={() => this.login()}>Sign In</button>
                          </div>

                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div >
    );
  }
}

export default Login;