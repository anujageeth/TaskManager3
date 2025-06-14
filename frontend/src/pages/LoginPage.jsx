import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BsCheckSquare } from 'react-icons/bs';  // Import the icon

const LoginPage = () => {
  const { loginWithGoogle } = useContext(AuthContext);

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <BsCheckSquare 
                    className="mb-4 text-primary" 
                    style={{ 
                      height: '64px', 
                      width: '64px',
                      animation: 'fadeIn 0.5s ease-in'
                    }} 
                  />
                  <h1 className="h3 mb-3 fw-bold text-primary">Task Manager</h1>
                  <p className="text-muted mb-4">
                    Sign in to manage your tasks efficiently
                  </p>
                </div>

                <button
                  onClick={loginWithGoogle}
                  className="btn btn-google btn-lg w-100 d-flex align-items-center justify-content-center shadow-sm"
                  style={{
                    backgroundColor: '#fff',
                    color: '#757575',
                    border: '1px solid #ddd',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  <svg className="me-3" style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" 
                      fill="#4285f4"/>
                  </svg>
                  Continue with Google
                </button>

              </div>
            </div>

            <div className="text-center mt-4">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;