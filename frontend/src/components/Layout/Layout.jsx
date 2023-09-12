import { NavLink, Outlet } from "react-router-dom";
function Layout() {
    return (
        <div>
            <div>
                <ul>
                    <li>
                        <NavLink to="/dashboard">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/about" >About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/contact" >Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;