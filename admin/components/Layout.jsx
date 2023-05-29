import React from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import NavLinkAside from "./NavLinkAside";
import { useRouter } from "next/router";
import Link from "next/link";

const Layout = ({ children }) => {
  const router = useRouter();
 
  const navLinks = [
    {
      name: "dashboard",
      Icon: HomeIcon,
      active: router.asPath === "/" ? true : false,
      href: "/",
    },
    {
      name: "products",
      Icon: ArchiveBoxIcon,
      active: router.asPath.includes("/products") ? true : false,
      href: "/products",
    },
    {
      name: "orders",
      Icon: PresentationChartBarIcon,
      active: router.asPath.includes("/orders") ? true : false,
      href: "/orders",
    },
    {
      name: "settings",
      Icon: Cog6ToothIcon,
      active: router.asPath.includes("/settings") ? true : false,
      href: "/settings",
    },
  ];
  return (
    <div className="flex min-h-screen bg-black">
      <aside className="w-[300px]  text-white p-4 py-7 pr-0 overflow-hidden">
        <NavLinkAside
          logo={true}
          Icon={AdjustmentsHorizontalIcon}
          name={"Admin Dashboard"}
        />
        <div className="py-4" />
        <div className="flex flex-col gap-2">
          {navLinks.map((el) => (
            <Link href={`${el.href}`} key={el.name}>
              <NavLinkAside name={el.name} Icon={el.Icon} active={el.active} />
            </Link>
          ))}
        </div>
      </aside>
      <main className="flex-1 m-3 bg-white rounded-lg p-4 ml-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
