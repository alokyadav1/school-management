import { Link } from "react-router-dom";
import styles from "./home.module.css";
function Header() {

    return ( 
        <header
          className={`${styles.header} bg-gradient-to-r from-blue-600 to-blue-400 p-4 sticky top-0 z-10`}
        >
          <nav className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl md:text-3xl font-semibold">
              School Management
            </div>
            <ul className="flex space-x-4">
              <li>
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </header>
     );
}

export default Header;