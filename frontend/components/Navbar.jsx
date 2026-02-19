import AvatarImagePage from "./AvatarImage";
import SidebarLogo from "./sidebar/SidebarLogo";

export default function Navbar({getPageName}) {
  return (
    <nav className="navbar w-full bg-base-300 flex items-center gap-4 justify-between">
      <div className="flex items-center">
        <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
          {/* Sidebar toggle icon */}
          <SidebarLogo />
        </label>
        <div className="px-4">{getPageName}</div>
      </div>
      <div>
        {/* User profile or other navbar content */}
        <AvatarImagePage />
      </div>
    </nav>
  );
}
