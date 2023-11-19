import Form from 'react-bootstrap/Form';
import '../style/login.css'
function Login() {
  return (
    <div className='loginForm'
    >
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
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <a className ="forgot-btn"href="#">password?</a>
                </p>
                <p className="forgot-password text-right">
                    Or <a className ="forgot-btn"href="/signup">sign up</a>
                </p>
            </form>
    </div>
    
  );
}

export default Login;