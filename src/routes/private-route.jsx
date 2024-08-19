import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/user.js";

const PrivateRoute = () => {
  const user = useUserStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
