import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/navbar.css'
import { googleLogout } from '@react-oauth/google';
// eslint-disable-next-line no-undef



<script src="https://apis.google.com/js/platform.js" async defer>
</script>

function NavigateBar() {
  
  const shoot = () => {
var meta = document.createElement('meta');
meta.name="google-signin-client_id";
meta.content = "313774542583-vttl8cpcccoemm3r64h1qsu8sn4d73j6.apps.googleusercontent.com";
document.getElementsByTagName('head')[0].appendChild(meta);
     var auth2 = window.gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
  }
  return (

    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary custom-navbar" >
      
      <Container>
        <Navbar.Brand href="/">Online Academy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
          <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Find Topic</Button>
          </Col>
        </Row>
      </Form>
      
          </Nav>
        </Navbar.Collapse>


        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/login">Mark Otto</a>
          </Navbar.Text>
          <Navbar.Text>
            
          <button onClick={shoot}>Logout</button>
      
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigateBar;