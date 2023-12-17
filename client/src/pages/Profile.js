import Form from 'react-bootstrap/Form';
import { NavigationBar } from '../components/NavBar';

function ProfilePage(props) {
  return (
    <div>
<NavigationBar role="ROLE_MODERATOR"></NavigationBar>
    <div className="container">
      <div className="main-body">
        <div className="row">
          <div className="col-lg-2">
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Họ tên</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <h6 className="mb-0">{props.name}</h6>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="john@example.com"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Số điện thoại</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="(239) 816-9029"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Địa chỉ</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="(320) 380-4539"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="button"
                      className="btn btn-primary px-4"
                      defaultValue="Save Changes"
                    />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>      
    </div>
    

  );
}

export default ProfilePage;