import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon as ArchiveSolid } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon as CogSolid } from "@heroicons/react/24/solid";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { PresentationChartBarIcon as PresentationSolid } from "@heroicons/react/24/solid";
import { QueueListIcon } from "@heroicons/react/24/outline";
import { QueueListIcon as QueueSolid } from "@heroicons/react/24/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NavLinkAside from "./NavLinkAside";
import { useRouter } from "next/router";
import Link from "next/link";
import usePostFetch from "@/hooks/usePostFetch";

const Layout = ({ children }) => {
  const router = useRouter();

  const navLinks = [
    {
      name: "dashboard",
      Icon: HomeIcon,
      Solid: HomeSolid,
      active: router.asPath === "/" ? true : false,
      href: "/",
    },
    {
      name: "products",
      Icon: ArchiveBoxIcon,
      Solid: ArchiveSolid,
      active: router.asPath.includes("/products") ? true : false,
      href: "/products",
    },
    {
      name: "categories",
      Icon: QueueListIcon,
      Solid: QueueSolid,
      active: router.asPath.includes("/categories") ? true : false,
      href: "/categories",
    },
    {
      name: "orders",
      Icon: PresentationChartBarIcon,
      Solid: PresentationSolid,
      active: router.asPath.includes("/orders") ? true : false,
      href: "/orders",
    },
    {
      name: "settings",
      Icon: Cog6ToothIcon,
      Solid: CogSolid,
      active: router.asPath.includes("/settings") ? true : false,
      href: "/settings",
    },
  ];

  const { data, loading, error, addPost } = usePostFetch();

  const handleLogout = async () => {
    await addPost("/auth/logout", {});

    console.log(data);
    router.replace("/login");
  };

  const [showNav, setShowNav] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black">
    
        <div className="lg:hidden flex justify-between items-center px-4 z-10">
          <Link href={'/'}>
          <NavLinkAside
            logo={true}
            Icon={AdjustmentsHorizontalIcon}
            name={"Admin Dashboard"}
          /></Link>
       
          {" "}
          <button
            onClick={() => setShowNav((prev) => !prev)}
            className="  bg-black w-8 h-8 flex items-center justify-center rounded-full"
          >
            {showNav ? (
              <XMarkIcon className="h-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 text-white" />
            )}
          </button>
        </div>
      
      <div className="flex-1 flex ">
        {showNav && (
          <div className="fixed h-screen w-screen top-0 left-0 z-[5]  bg-black/80 " />
        )}

        <aside
          className={`w-[300px]  text-white p-4 py-7 pr-0 overflow-hidden lg:static flex flex-col top-0  fixed z-30  bg-black h-screen ${
            showNav ? "left-0" : "-left-[300px]"
          } duration-300`}
        >
          <NavLinkAside
            logo={true}
            Icon={AdjustmentsHorizontalIcon}
            name={"Admin Dashboard"}
          />
          <div className="py-4" />
          <div className="flex flex-col gap-2">
            {navLinks.map((el) => (
              <Link
                href={`${el.href}`}
                key={el.name}
                onClick={() => setShowNav(false)}
              >
                <NavLinkAside
                  name={el.name}
                  Icon={el.Icon}
                  active={el.active}
                  Solid={el.Solid}
                />
              </Link>
            ))}
          </div>

          <button
            disabled={loading}
            onClick={handleLogout}
            className="flex items-center disabled:bg-gray-500 mt-2 hover:bg-red-500 p-3 rounded-l-xl hover:scale-105 duration-300  gap-3"
          >
            <ArrowLeftOnRectangleIcon className="h-6 text-white" />
            {loading ? "Logging out..." : "Logout"}{" "}
          </button>
        </aside>
        <main className="flex-1 lg:m-3  bg-white lg:rounded-lg p-4 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
