import Header from "@/layouts/header.jsx";
import { Outlet } from "react-router-dom";
import { useUserStore } from "@/store/user.js";
import RequestEditor from "@/pages/request-editor.jsx";

const Layouts = () => {
  const { user } = useUserStore();
  return (
    <div className="container my-4 space-y-4">
      <Header />
      {user && user.role === "user" && <RequestEditor />}
      <Outlet />
    </div>
  );
};

export default Layouts;
