import { Outlet } from "react-router-dom";
import UserNavBarComponent from "../components/UserComponents/UserNavBarComponent/UserNavBarComponent";

function UserLayout() {
  return (
    <div>
      <UserNavBarComponent />
      <Outlet />
    </div>
  );
}

export default UserLayout;
