import { NavLink } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { TbClockDollar } from "react-icons/tb";
import { SiAmazonwebservices } from "react-icons/si";
import { BsPersonBadgeFill } from "react-icons/bs";

export const Sidebar = ({collapsed}) => {
  

  const menu = [
    { to: "/dashboard/users", label: "Users", icon: <FaUserCog /> },
    { to: "/dashboard/initial-onboarding", label: "Onboarding", icon: <BsPersonBadgeFill /> },
    { to: "/dashboard/cost-explorer", label: "Cost Explorer", icon: <TbClockDollar /> },
    {
      to: "/dashboard/aws-services",
      label: "AWS Services",
      icon: <SiAmazonwebservices />,
    },
  ];

  return (
    <div
      className={`
        bg-white px-2 h-[calc(100vh-72px)]
        flex flex-col gap-6 pt-6
        transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}
        `}
     >
      {menu.map((item) => (
        <NavLink
          to={item.to}
          key={item.to}
          className={({ isActive }) =>
            `
          flex items-center gap-3 rounded-md py-2 cursor-pointer
          transition-all duration-300
          ${collapsed ? "justify-center px-0" : "px-3"} 
          ${isActive ? "bg-blue-100 text-blue-600 font-semibold" : ""}`
          }
        >
          <div
            className={`text-xl transition-all ${
              collapsed ? "text-2xl mx-auto" : ""
            }`}
          >
            {item.icon}
          </div>

          {!collapsed && <p>{item.label}</p>}
        </NavLink>
      ))}
    </div>
  );
};

