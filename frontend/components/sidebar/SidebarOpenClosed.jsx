"use client";
import { Book, HomeIcon, LogOutIcon, ReceiptCent, Settings2 } from "lucide-react";
import {useRouter, usePathname} from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import { toast, ToastContainer } from "react-toastify";


const sidebarItems = [
    {name: "Home", icon: <HomeIcon />, path: "/"},
    {name: "Payments", icon: <ReceiptCent />, path: "/payments"},
    {name: "Transactions", icon: <Book />, path: "/transactions"},
    {name: "Settings", icon: <Settings2 />, path: "/settings"}
]
function SidebarOpenClosed() {
    const router = useRouter();
    const pathname = usePathname();
    const {user, logout} = useAuthStore()
    const currentPath = pathname.replace("/dashboard", "") || "/";
    
    function handleSidebarItemClick(path) {
        if (!path) return;
        router.push("/dashboard" + path);
    }
    async function handleLogout () {
      toast.info("Logged out!");
      await logout();
    }
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    }, [user])
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <ToastContainer />
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}
          {sidebarItems.map((item, index) => (
            <li key={index}>
            <button
              className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${currentPath === item.path && "bg-primary-content text-white"}`}
              data-tip={item.name}
              onClick={() => handleSidebarItemClick(item.path)}
            >
              {/* Home icon */}
             {item.icon}
              <span className="is-drawer-close:hidden">{item.name}</span>
            </button>
          </li>

          ))}

          <li className="mt-auto flex flex-col gap-4">
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Logout"
              onClick={handleLogout}
            >
              {/* Home icon */}
             <LogOutIcon />
              <span className="is-drawer-close:hidden">Logout</span>
            </button>

          </li>
          {/* List item */}
          
        </ul>
      </div>
    </div>
  );
}

export default SidebarOpenClosed;
