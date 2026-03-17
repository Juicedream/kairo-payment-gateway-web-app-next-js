"use client"
import useAuthStore from "../../store/useAuthStore";


function DashboardPage() {
  const {user} = useAuthStore();
  return (
    <>
     <h1 className="text-2xl font-bold">Welcome to your Dashboard, {user?.firstName}</h1>
     <p>Organization: {user?.organizationName}</p>
    </>
  );
}
export default DashboardPage;
