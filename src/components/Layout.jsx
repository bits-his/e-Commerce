import { Outlet } from "react-router-dom";
import SideNav from "./Sidenav";
import Header from "./header";

export default function Layout() {

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNav />
      <div className="overflow-x-auto flex flex-col">
        <Header />
        <div className="overflow-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
