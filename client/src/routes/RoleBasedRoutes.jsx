import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const RoleBasedRoutes = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return user && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} />
  );
};

export default RoleBasedRoutes;
