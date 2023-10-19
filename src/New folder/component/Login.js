import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {URL} from '../component/common/Url'

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showpassword:false,
      show: false,
      loginMessage: "",
      bgColor: "alert alert-danger"
    }
    this.keyPressed = this.keyPressed.bind(this);
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.login();
    }
  }

  passwordHandlar=()=>{
    this.setState({...this.state.showpassword, showpassword : !this.state.showpassword})
  }

  login() {

    this.setState({ loginMessage: false })
    document.querySelector('body').scrollTo(0, 0);

    if (this.state.username && this.state.password ) {

      fetch(`${URL}login.php?username=${this.state.username}&password=${this.state.password}`).then((response) => {
        response.json().then((result) => {
          if (result.success === true) {
            if(result.user.type==='client'){
             this.setState({ show: true, loginMessage: 'Success', bgColor: 'alert alert-success' })
             sessionStorage.setItem("user", JSON.stringify(result));
             setTimeout(function () { window.location = "/dashboard"; }, 1000);
            }else if(result.user.type==='Admin'){
              this.setState({ show: true, loginMessage: 'Success', bgColor: 'alert alert-success' })
              sessionStorage.setItem("admin", JSON.stringify(result));
             setTimeout(function () { window.location = "/admin"; }, 1000);
            }else if(result.user.type==='Manager'){
              this.setState({ show: true, loginMessage: 'Success', bgColor: 'alert alert-success' })
              sessionStorage.setItem("manager", JSON.stringify(result));
              setTimeout(function () { window.location = "/admin"; }, 1000);
            }
            
          } else {
            this.setState({ show: true, loginMessage: result.message, bgColor: 'alert alert-danger'  });
          }
        })
      })

    }else{
       this.setState({ show: true, loginMessage: 'Please Enter User ID & Password', bgColor: 'alert alert-danger' })
      } 

  }

  render() {
  
    return (
      <div className="container">

        <Helmet>
          <meta charSet="utf-8" />
          <title>Admin Login : SMPP- SMS </title>
          <meta name="description" content="" />
        </Helmet>

        <div className="authentication-wrapper mt-5 authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className='row justify-content-center'>
              <div className='col-md-5'>
                <div className="card">
                  <div className="card-body">

                    <div className="app-brand mb-5 justify-content-center">

                      <span className="app-brand-logo demo">
                      </span>
                      <span className="app-brand-text demo text-body fw-bolder"> Login</span>

                    </div>

                    {
                      this.state.show ?
                        <div className={this.state.bgColor}>
                          {this.state.loginMessage}
                        </div>
                        :
                        null
                    }


                    <h4 className="mb-2">Welcome to SMPP SMS! 👋</h4>
                    <p className="mb-4">Please log-in to your account and start our services</p>


                    <div className="mb-3">
                      <label for="email" className="form-label">Email or Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email-username"
                        placeholder="Enter your email or username"
                        autofocus
                        onChange={(event) => this.setState({ username: event.target.value })}
                        onKeyPress={this.keyPressed}
                      />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label" for="password">Password</label>
                      </div>

                      <div className="input-group input-group-merge">
                        <input
                          type={this.state.showpassword ?"text":"password"}
                          id="password"
                          className="form-control"
                          name="password"
                          placeholder="Enter Password"
                          aria-describedby="password"
                          onChange={(event) => this.setState({ password: event.target.value })}
                          onKeyPress={this.keyPressed}
                        />
                        <span className="input-group-text cursor-pointer"><FontAwesomeIcon onClick={this.passwordHandlar} icon={this.state.showpassword ? faEyeSlash : faEye} /></span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <button className="btn btn-primary d-grid w-100" onClick={() => this.login()} type="button">Sign in</button>
                    </div>

                    <p className="text-center">
                      <span> New on our SMPP-SMS Platform </span>
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Login;