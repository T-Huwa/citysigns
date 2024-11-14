import React from "react";
import SidebarItems from "./SidebarItems";
import LogoIpsum from "@/Components/Logo/SvgIcon";
import { Box, Divider } from "@mui/material";

const MSidebar = (props) => {
    const sidebarWidth = "w-[270px]";
    const collapseWidth = "w-[80px]";

    const scrollbarStyles =
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded";

    return (
        <div className={`h-screen ${sidebarWidth} ${scrollbarStyles}`}>
            <div className={`h-full lg:flex ${sidebarWidth} shadow-lg`}>
                <div className="w-full flex flex-col h-full p-4">
                    <div className="flex justify-center py-4">
                        <LogoIpsum className="h-12" />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <SidebarItems />
                    </div>
                </div>
            </div>

            <div
                className={`lg:hidden fixed inset-y-0 left-0 transform transition-transform duration-300 ${
                    props.isMobileSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                } bg-white shadow-lg z-50 ${sidebarWidth}`}
                onClick={props.onSidebarClose}
            >
                <div className="flex flex-col h-full p-4">
                    {/* Logo <img src={logo} alt="Logo" className="h-10" />*/}
                    <div className="flex justify-center py-4"></div>

                    {/* Sidebar Items */}
                    <div className="flex-1 overflow-y-auto">
                        <SidebarItems />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MSidebar;
