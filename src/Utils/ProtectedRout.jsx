import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = useSelector((state) => state.UserData.value?.role);

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (role === "ADMIN") {
    return children;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard/cost-explorer" replace />;
  }

  return children;
};

export default ProtectedRoute;
