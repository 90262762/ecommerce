import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
