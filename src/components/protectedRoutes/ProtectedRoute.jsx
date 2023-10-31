import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, isAllowed = false, redirectTo = '/' }) => {

  if(!isAllowed){
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute