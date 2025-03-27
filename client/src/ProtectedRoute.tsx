import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Adjust this based on how auth is stored

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
