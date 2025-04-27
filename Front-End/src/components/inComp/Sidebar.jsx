import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Box, Layout, ChevronRight, ChevronLeft } from "react-feather";
import { SidebarContext } from "../../context/SidebarContex";

const Sidebar = () => {
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  const menuItems = [
    { name: "Home", icon: <Home size={22} />, path: "/" },
    { name: "Dashboard", icon: <Layout size={22} />, path: "/dashboard" },
    { name: "Products", icon: <Box size={22} />, path: "/listings" },
  ];

  return (
    <motion.div
      initial={{ width: 260 }}
      animate={{ width: collapsed ? 70 : 260 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed top-16 h-[calc(100vh-4rem)] shadow-xl overflow-hidden flex flex-col z-40 pr-2"
    >
      <div className="flex justify-end px-3 pt-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hover:text-teal-400 transition "
        > 
          {!collapsed && <ChevronLeft size={24} />}
          {collapsed && <ChevronRight size={24} />}
        </button>
      </div>
      <nav className="flex flex-col gap-6 mt-6">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="group relative flex items-center gap-4 px-4 py-3 hover:bg-gray-700 transition-all rounded-md mx-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              {item.icon}
            </motion.div>

            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="text-md font-medium"
              >
                {item.name}
              </motion.span>
            )}

            {collapsed && (
              <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;