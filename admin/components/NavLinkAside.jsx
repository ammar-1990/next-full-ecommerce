import React from "react";

const NavLinkAside = ({ name, Icon, active, logo }) => {
  return (
    <div
      className={`flex items-center  gap-3 w-full p-3 ${
        active && "bg-white cursor-default text-black rounded-l-xl scale-105 "
      } ${
        !active &&
        name !== "Admin Dashboard" &&
        "hover:scale-105 rounded-l-xl hover:bg-orange-500"
      } duration-300`}
    >
      <Icon className=" h-6" />
      <span
        className={`capitalize ${
          logo && "text-xl font-bold cursor-default text-orange-500"
        }`}
      >
        {name}
      </span>
    </div>
  );
};

export default NavLinkAside;
