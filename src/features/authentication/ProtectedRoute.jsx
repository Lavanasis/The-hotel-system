import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
