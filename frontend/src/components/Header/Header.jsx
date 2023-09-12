/* eslint-disable no-unused-vars */
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
function Header() {
  const navigate = useNavigate();
  const { currentUser, dispatchUser } = useContext(UserContext);
  const handleLogout = () => {
    dispatchUser({
      type: "DELETE_USER",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    <div className="w-full">
      <nav className="bg-slate-50 rounded-lg text-white flex flex-wrap justify-around items-center p-2">
        <div>
          <p>
            welcome,
            <span className="text-sm text-orange-600 italic">
              {currentUser?.user?.email}
            </span>
          </p>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-700 text-white rounded-md p-1"
          >
            logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
