"use client";
import SidebarOpenClosed from "../../components/sidebar/SidebarOpenClosed";
import { usePathname } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const getPageName =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname.split("/dashboard/")[1].charAt(0).toUpperCase() +
        pathname.split("/dashboard/")[1].slice(1);
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input type="checkbox" id="my-drawer-4" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <Navbar getPageName={getPageName} />
          <div className="p-4">{children}</div>
        </div>
        <SidebarOpenClosed />
      </div>
    </>
  );
}
