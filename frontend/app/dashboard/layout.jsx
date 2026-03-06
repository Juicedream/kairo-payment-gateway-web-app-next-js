"use client";

import { usePathname } from "next/navigation";
import SidebarOpenClosed from "../../components/sidebar/SidebarOpenClosed";
import Navbar from "../../components/Navbar";
// import { useEffect } from "react";
// import { socketClientConnection } from "../lib/socket";
import { useEffect, useRef } from "react";
import useAuthStore from "../../store/useAuthStore";

// let socket;

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  // const socketRef = useRef(null);
  const {user, token, fetchProfile} = useAuthStore();
  const getPageName =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname.split("/dashboard/")[1].charAt(0).toUpperCase() +
        pathname.split("/dashboard/")[1].slice(1);
    // useEffect(() => {
    //   socket = socketClientConnection();
    //   socket.on("connect", () => {
    //     console.log("Connected to WebSocket server with id:", socket.id);
    //   })
    // }, [])
    useEffect(() => {
      fetchProfile(token)
    }, [token, fetchProfile]);
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input type="checkbox" id="my-drawer-4" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <Navbar getPageName={getPageName} userName={user?.firstName}/>
          <div className="p-4">{children}</div>
        </div>
        <SidebarOpenClosed />
      </div>
    </>
  );
}
