import { Link, useLocation } from "react-router-dom";
import lumi from '../assets/lumi-logo.png';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="h-screen p-10 w-1/4 flex flex-col items-left bg-white border-r-2 border-gray-200">
      <img src={lumi} alt='Lumi logo' className='w-30 h-30 mb-10' />
      <nav>
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              to="/"
              className={isActive('/') ? "bg-[#0dad62] text-white p-2 rounded" : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/library"
              className={isActive('/library') ? "bg-[#0dad62] text-white p-2 rounded" : ""}
            >
              Biblioteca de faturas
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
