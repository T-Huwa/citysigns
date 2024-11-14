import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TextField,
    MenuItem,
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const getDamageColor = (scale) => {
    const colors = {
        1: "bg-green-500", // Very Good
        2: "bg-blue-500", // Good
        3: "bg-yellow-500", // Neutral
        4: "bg-orange-500", // Poor
        5: "bg-red-500", // Very Bad
    };
    return colors[scale] || "bg-gray-500";
};

export default function RoadSigns({ signs }) {
    const [filterType, setFilterType] = useState("");
    const [filterDamage, setFilterDamage] = useState("");

    const userRole = usePage().props.auth.user.role;

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleFilterDamageChange = (event) => {
        setFilterDamage(event.target.value);
    };

    const filteredSigns = signs.filter(
        (sign) =>
            (filterType === "" || sign.type === filterType) &&
            (filterDamage === "" || sign.damageScale === parseInt(filterDamage))
    );

    return (
        <AuthenticatedLayout>
            <Head title="Signs" />
            <div className="container mx-auto px-4">
                <Typography variant="h4" className="mb-6 dark:text-gray-200">
                    Road Signs List
                </Typography>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-6 my-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="w-full sm:w-auto">
                        <TextField
                            select
                            label="Filter by Type"
                            value={filterType}
                            onChange={handleFilterTypeChange}
                            className="w-full sm:w-64 bg-gray-50 dark:bg-gray-300 rounded-md"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                                className: "text-gray-600 dark:text-gray-100",
                            }}
                        >
                            <MenuItem value="">All Types</MenuItem>
                            <MenuItem value="Stop">Stop</MenuItem>
                            <MenuItem value="Yield">Yield</MenuItem>
                            <MenuItem value="Speed Limit">Speed Limit</MenuItem>
                            <MenuItem value="No Parking">No Parking</MenuItem>
                            <MenuItem value="One Way">One Way</MenuItem>
                        </TextField>
                    </div>

                    <div>
                        <TextField
                            select
                            label="Filter by Damage Scale"
                            value={filterDamage}
                            onChange={handleFilterDamageChange}
                            className="w-full sm:w-64 bg-gray-50 dark:bg-gray-300 rounded-md"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                                className: "text-gray-600 dark:text-gray-300",
                            }}
                        >
                            <MenuItem value="">All Scales</MenuItem>
                            {[1, 2, 3, 4, 5].map((scale) => (
                                <MenuItem key={scale} value={scale}>
                                    {scale}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="flex-grow"></div>

                    {userRole === "Admin" && (
                        <PrimaryButton
                            onClick={() => router.visit(route("signs.create"))}
                        >
                            Add New Sign
                        </PrimaryButton>
                    )}
                </div>
                <TableContainer component={Paper}>
                    <Table
                        aria-label="road signs table"
                        className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-white"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography className="font-bold text-gray-500 dark:text-white">
                                        Location
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="font-bold text-gray-500 dark:text-white">
                                        Sign Type
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="font-bold text-gray-500 dark:text-white">
                                        Sign Words
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="text-xl font-bold text-gray-500 dark:text-white">
                                        Damage Scale
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSigns.map((sign) => (
                                <TableRow
                                    key={sign.id}
                                    className="cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        router.visit(`/signs/${sign.id}`)
                                    }
                                >
                                    <TableCell>
                                        <Typography className="text-gray-500 dark:text-gray-400">
                                            {sign.location}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className="text-gray-500 dark:text-gray-400">
                                            {sign.type}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className="text-gray-500 dark:text-gray-400">
                                            {sign.words}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className="text-gray-500 dark:text-gray-400">
                                            <span
                                                className={`inline-block w-6 h-6 rounded-full ${getDamageColor(
                                                    sign.damageScale
                                                )} mr-2`}
                                            ></span>
                                            {sign.damageScale}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </AuthenticatedLayout>
    );
}
