import NavLink from "@/Components/NavLink";

const NavItem = ({ item, ...props }) => (
    <li>
        <NavLink
            href={item.href}
            className={({ isActive }) =>
                `flex items-center w-full p-2 text-sm font-medium rounded-md ${
                    isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                }`
            }
            {...props}
        >
            <item.icon className="w-5 h-5 mr-3" />
            {item.title}
        </NavLink>
    </li>
);

export default NavItem;
