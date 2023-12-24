import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import lumi from '../assets/lumi-logo.png';
import { easeIn, easeInOut, motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    open: { 
      x: 0,
      opacity: 1,
      transition: { type: "smooth", stiffness: 100, easeInOut }
    },
    closed: { 
      x: '-100%', 
      opacity: 0,
      transition: { type: "smooth", stiffness: 100, easeInOut }
    },
  };

  const listItemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    },
    closed: {
      x: -50,
      opacity: 0
    },
  };

  return (
    <>
      <div className={`fixed top-0 left-0 p-4 z-10 ${isSidebarOpen ? 'hidden' : 'block'}`} onClick={toggleSidebar}>
        <FiMenu size={24} className="cursor-pointer" />
      </div>

      <motion.aside
        className="h-screen p-10 w-1/4 flex flex-col items-left bg-white border-r-2 border-gray-200"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
      >
        <div className="flex justify-end">
          <FiX size={24} onClick={toggleSidebar} className="cursor-pointer" />
        </div>
        <img src={lumi} alt='Lumi logo' className='w-[170px] h-[100px] mb-10' />
        <nav>
          <ul className="flex flex-col gap-5">
            <motion.li variants={listItemVariants} initial="closed" animate={isSidebarOpen ? "open" : "closed"}>
              <Link to="/" className={isActive('/') ? "bg-[#0dad62] text-white p-2 rounded" : ""} onClick={toggleSidebar}>
                Dashboard
              </Link>
            </motion.li>
            <motion.li variants={listItemVariants} initial="closed" animate={isSidebarOpen ? "open" : "closed"}>
              <Link to="/library" className={isActive('/library') ? "bg-[#0dad62] text-white p-2 rounded" : ""} onClick={toggleSidebar}>
                Biblioteca de faturas
              </Link>
            </motion.li>
          </ul>
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
