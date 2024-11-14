import React from "react";
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";
import Menuitems from "./MenuItems";
import { usePage } from "@inertiajs/react";

const SidebarItems = () => {
    const url = usePage().url;

    const userRole = usePage().props.auth.user.role;
    return (
        <div className="w-full px-4">
            <ul className="pt-0 space-y-1">
                {Menuitems.map((item) => {
                    if (item.subheader) {
                        if (
                            userRole === "Officer" &&
                            item.subheader === "Admin"
                        ) {
                            return;
                        }
                        return <NavGroup item={item} key={item.subheader} />;
                    } else {
                        if (userRole === "Officer" && item.title === "Users") {
                            return;
                        }
                        return (
                            <NavItem
                                active={url.includes(item.href)}
                                item={item}
                                key={item.id}
                            />
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default SidebarItems;
