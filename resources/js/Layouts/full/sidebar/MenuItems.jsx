import {
    IconAperture,
    IconCopy,
    IconFile,
    IconHammer,
    IconLayoutDashboard,
    IconLogin,
    IconMoodHappy,
    IconSignLeft,
    IconTypography,
    IconUser,
    IconUserPlus,
    IconUserScan,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
    {
        navlabel: true,
        subheader: "Home",
    },

    {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
    },
    {
        navlabel: true,
        subheader: "Admin",
    },
    {
        id: uniqueId(),
        title: "Users",
        icon: IconUser,
        href: "/users",
    },
    {
        id: uniqueId(),
        title: "Informants",
        icon: IconUserScan,
        href: "/informants",
    },
    {
        navlabel: true,
        subheader: "Signs & Repairs",
    },
    {
        id: uniqueId(),
        title: "Signs",
        icon: IconSignLeft,
        href: "/signs",
    },
    {
        id: uniqueId(),
        title: "Repair Jobs",
        icon: IconHammer,
        href: "/repairs",
    },
    {
        id: uniqueId(),
        title: "Damage Assessment",
        icon: IconFile,
        href: "/requests",
    },
];

export default Menuitems;
