import { Link } from "react-router-dom";
import { useState } from 'react';
import lumi from '../assets/lumi-logo.png';

const Sidebar = () => {
  const [isActive, setIsActive] = useState('dashboard');

  const handleSetActive = (page) => {
    setIsActive(page);
  };

  return (
    <aside className="h-screen p-10 w-1/4 flex flex-col items-left bg-white border-r-2 border-gray-200">
      <img src={lumi} alt='Lumi logo' className='w-30 h-30 mb-10' />
      <nav>
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              to="/"
              onClick={() => handleSetActive('dashboard')}
              className="text-xl"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/library"
              onClick={() => handleSetActive('library')}
              className="text-xl"
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
