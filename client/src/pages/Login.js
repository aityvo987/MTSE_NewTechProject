import Form from "react-bootstrap/Form";
import "../style/login.css";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
 
   return JSON.parse(jsonPayload);
 };
function Login() {
  return (
    <div className="loginForm">
      <form>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot{" "}
          <a className="forgot-btn" href="#">
            password?
          </a>
        </p>
        <p className="forgot-password text-right">
          Or



          <div>
            <GoogleOAuthProvider clientId="313774542583-vttl8cpcccoemm3r64h1qsu8sn4d73j6.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                console.log(JSON.stringify(parseJwt(credentialResponse.credential)));
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              
            </GoogleOAuthProvider>
          </div>
        </p>
      </form>
    </div>



  );
}

export default Login;
