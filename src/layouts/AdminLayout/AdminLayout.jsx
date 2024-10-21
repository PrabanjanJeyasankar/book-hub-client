import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminComponents/AdminNavBar/AdminNavBar";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin_layout_container">
      <AdminNavBar />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
