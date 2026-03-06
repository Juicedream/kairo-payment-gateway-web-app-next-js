import AvatarImagePage from "./AvatarImage";
import SidebarLogo from "./sidebar/SidebarLogo";

export default function Navbar({getPageName, userName}) {
  return (
    <nav className="navbar w-full bg-base-300 flex items-center gap-4 justify-between">
      <div className="flex items-center">
        <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
          {/* Sidebar toggle icon */}
          <SidebarLogo />
        </label>
        <div className="px-4">{getPageName}</div>
      </div>
      <div className="flex items-center gap-2">
        {/* User profile or other navbar content */}
        <AvatarImagePage />
        <p className="text-2xl">{userName || ""}</p>
      </div>
    </nav>
  );
}
