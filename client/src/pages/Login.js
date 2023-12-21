import { useEffect, useState } from "react";
import { SignIn } from "../api/generalAPI";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameOnChange = (ev) => {
    setUsename(ev.target.value);
  };
  const handlePasswordOnChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleSignIn = (ev) => {
    ev.preventDefault();
    SignIn(username, password).then((respone) => {
      respone.signin
        ? navigate("/")
        : alert("Sign in information is incorrect");
    });
  };
  useEffect(() => {
    //The do nothing but preventing the page from reloading
  }, []);
  return (
    <div>
      <main
        style={{ paddingLeft: "35%", paddingRight: "35%", paddingTop: "10%" }}
        class="form-signin w-100 m-auto"
      >
        <form>
          <img class="mb-4" src="https://dongphucvina.vn/wp-content/uploads/2022/09/Logo-DH-Su-Pham-Ky-Thuat-TP-Ho-Chi-Minh-HCMUTE-768x986.webp" alt="" width="72" height="57" />
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating">
            <input
              onChange={handleUsernameOnChange}
              type="text"
              class="form-control"  
              id="floatingInput"
            />
            <label for="floatingInput">User name</label>
          </div>
          <div class="form-floating">
            <input
              onChange={handlePasswordOnChange}
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="form-check text-start my-3">
            <input
              class="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Remember me
            </label>
          </div>

          <div
            className="btn-group w-100"
            role="group"
            aria-label="Button Group"
          >
            <button
              onClick={handleSignIn}
              className="btn btn-primary w-100 py-2 btn-3d"
              style={{
                border: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                transform: "translateY(0)",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              Sign in
            </button>
          </div>

          <div>
            <GoogleOAuthProvider clientId="313774542583-vttl8cpcccoemm3r64h1qsu8sn4d73j6.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var email = parseJwt(credentialResponse.credential).email;
                  console.log("Email: ", email);

                  if (!email.includes("hcmute.edu.vn")) {
                    alert("Must use hcmute.edu.vn email! Please try again.");
                    return;
                  }

                  var jwtToken = credentialResponse.credential;
                  console.log("jwtToken: ", jwtToken);

                  fetch(`http://localhost:5000/api/students/email/${email}`)
                    .then((res) => res.json())
                    .then((data) => {
                      console.log("Data: ", data);
                      if (data.length !== 0) {
                        console.log("User exists, navigating...");
                        // Navigate to student page
                        navigate("/");
                      } else {
                        // Does not exist. Add a student with only field email and navigate to student page
                        console.log("User does not exist, navigating...");
                        navigate("/");
                      }
                    })
                    .catch((error) => {
                      console.error("Fetch error: ", error);
                    });
                }}
                onError={() => {
                  console.log("Login Failed");
                  alert("Login Failed!");
                }}
              />
            </GoogleOAuthProvider>
          </div>
          <p class="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
        </form>
      </main>
    </div>
  );
};
