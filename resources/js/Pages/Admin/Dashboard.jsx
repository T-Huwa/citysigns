import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { IconCheck, IconFile, IconMap } from "@tabler/icons-react";
import { CiWarning } from "react-icons/ci";

// Mock data (replace with actual data in a real application)
const analyticsSummary = {
    totalActiveSigns: 1250,
    damagedSigns: 45,
    completedRepairs: 30,
};

/*
const activeRequests = [
    { id: 1, signId: "S001", status: "Pending", officer: "John Doe" },
    { id: 2, signId: "S002", status: "In Progress", officer: "Jane Smith" },
    { id: 3, signId: "S003", status: "Pending", officer: "Mike Johnson" },
];*/

const officers = [
    {
        id: 1,
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        currentAssignment: "S001",
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        currentAssignment: "S002",
    },
    {
        id: 3,
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        currentAssignment: null,
    },
];

const recentMapUpdates = [
    {
        id: 1,
        signId: "S004",
        status: "Repaired",
        location: "Main St & 5th Ave",
    },
    { id: 2, signId: "S005", status: "Damaged", location: "Oak Rd & Elm St" },
    {
        id: 3,
        signId: "S006",
        status: "New Installation",
        location: "Park Ave & 3rd St",
    },
];

export default function Dashboard({
    activeRequests,
    totalSigns,
    totalDamaged,
    totalCompleted,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <Typography
                    variant="h6"
                    className="font-bold dark:text-gray-200"
                >
                    City Signs Management Dashboard
                </Typography>
                <div className="container mx-auto mt-8 px-4 lg:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Active Signs */}
                        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded shadow">
                            <h6 className="mb-2 font-semibold dark:text-gray-200">
                                Total Active Signs
                            </h6>
                            <p className="text-2xl font-bold text-blue-600">
                                {totalSigns}
                            </p>
                            <IconFile className="mt-2 text-gray-400" />
                        </div>

                        {/* Damaged Signs */}
                        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded shadow">
                            <h6 className="mb-2 font-semibold dark:text-gray-200">
                                Damaged Signs
                            </h6>
                            <p className="text-2xl font-bold text-yellow-600">
                                {totalDamaged}
                            </p>
                            <CiWarning className="mt-2 text-gray-400" />
                        </div>

                        {/* Completed Repairs */}
                        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded shadow">
                            <h6 className="mb-2 font-semibold dark:text-gray-200">
                                Completed Repairs
                            </h6>
                            <p className="text-2xl font-bold text-green-600">
                                {totalCompleted}
                            </p>
                            <IconCheck className="mt-2 text-gray-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded shadow">
                            <h6 className="mb-4 font-semibold dark:text-gray-200">
                                Active Requests
                            </h6>
                            <div className="overflow-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 dark:text-gray-200">
                                                Sign ID
                                            </th>
                                            <th className="px-4 py-2 dark:text-gray-200">
                                                Status
                                            </th>
                                            <th className="px-4 py-2 dark:text-gray-200">
                                                Assigned Officer
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeRequests.map((request) => (
                                            <tr key={request.sign.id}>
                                                <td className="border-t px-4 py-2 dark:text-gray-300">
                                                    S{request.sign.id}
                                                </td>
                                                <td className="border-t px-4 py-2 dark:text-gray-300">
                                                    <span
                                                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                                            request.status ===
                                                            "pending"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-blue-100 text-blue-800"
                                                        }`}
                                                    >
                                                        {request.status ===
                                                        "in_progress"
                                                            ? "In Progress"
                                                            : "Pending"}
                                                    </span>
                                                </td>
                                                <td className="border-t px-4 py-2 dark:text-gray-300">
                                                    {request.user.name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Officer Management */}
                        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded shadow">
                            <h6 className="mb-4 font-semibold dark:text-gray-200">
                                Officer Management
                            </h6>
                            <div className="overflow-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 dark:text-gray-200">
                                                Officer
                                            </th>
                                            <th className="px-4 py-2 dark:text-gray-200">
                                                Current Assignment
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {officers.map((officer) => (
                                            <tr key={officer.id}>
                                                <td className="border-t px-4 py-2 flex items-center dark:text-gray-300">
                                                    {officer.name}
                                                </td>
                                                <td className="border-t px-4 py-2 dark:text-gray-300">
                                                    {officer.currentAssignment ||
                                                        "Unassigned"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Recent Map Updates */}
                    <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded shadow mt-8">
                        <h6 className="mb-4 font-semibold dark:text-gray-200">
                            Recent Map Updates
                        </h6>
                        <ul className="space-y-4">
                            {recentMapUpdates.map((update) => (
                                <li
                                    key={update.id}
                                    className="flex items-start"
                                >
                                    <IconMap className="text-blue-600 mr-2" />
                                    <div>
                                        <p className="text-sm font-medium dark:text-gray-300">{`${update.signId} - ${update.status}`}</p>
                                        <p className="text-xs dark:text-gray-400">
                                            {update.location}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
