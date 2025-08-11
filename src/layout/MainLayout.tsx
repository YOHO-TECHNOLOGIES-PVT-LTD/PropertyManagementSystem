import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/NavBar';
import Sidebar from '../components/shared/SideBar';

function MainLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const sidebarWidth = isSidebarOpen ? 250 : 85;
	return (
		<>
		<div className="flex flex-col w-screen h-screen overflow-hidden">
  <div className="flex flex-col flex-1">
    <Navbar />
  </div>

  <div className="flex h-screen mt-3 overflow-x-hidden">
    {/* Sidebar */}
    <div
      className="transition-all duration-300"
      style={{ width: `${sidebarWidth}px` }}
    >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </div>

    {/* Main content */}
    <div className="flex flex-1 overflow-y-auto no-scrollbar p-3">
      <Outlet />
    </div>
  </div>
</div>

		</>
	);
}

export default MainLayout;
