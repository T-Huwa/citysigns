import React from "react";
import { Button, Typography } from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { IconCheck, IconFile, IconMap } from "@tabler/icons-react";
import { CiWarning } from "react-icons/ci";

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
    assignments,
    recentUpdates,
}) {
    console.log(recentUpdates);

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
                                        {assignments.map((asgt) => (
                                            <tr key={asgt.id}>
                                                <td className="border-t px-4 py-2 flex items-center dark:text-gray-300">
                                                    {asgt.user.name || "Null"}
                                                </td>
                                                <td className="border-t px-4 py-2 dark:text-gray-300">
                                                    S
                                                    {asgt.sign_id ||
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
                            {recentUpdates.map((update) => {
                                let status = "N/A";
                                if (update.created_at === update.updated_at) {
                                    status = "New Sign Added";
                                } else if (update.damageScale == 5) {
                                    status = "Damaged";
                                } else if (update.damageScale == 1) {
                                    status = "Maintained";
                                } else {
                                    return;
                                }
                                return (
                                    <li
                                        key={update.id}
                                        className="flex items-start"
                                    >
                                        <Button href={`/signs/${update.id}`}>
                                            <IconMap className="text-blue-600 mr-2" />
                                        </Button>
                                        <div>
                                            <p className="text-sm font-medium dark:text-gray-300">{`S${update.id} - ${status}`}</p>
                                            <p className="text-xs dark:text-gray-400">
                                                {update.road}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
