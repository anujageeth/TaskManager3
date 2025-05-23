import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="display-6 fw-bold text-dark mb-3">
          Page Not Found
        </h2>
        <p className="text-muted mb-4">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="btn btn-primary btn-lg d-inline-flex align-items-center"
        >
          <i className="bi bi-house-door me-2"></i>
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;