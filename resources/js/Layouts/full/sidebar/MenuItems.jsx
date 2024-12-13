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
        id: uniqueId(),
        title: "Updates",
        icon: IconFile,
        href: "/updates",
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
        title: "Job Cards",
        icon: IconHammer,
        href: "/job-cards",
    },
];

export default Menuitems;
