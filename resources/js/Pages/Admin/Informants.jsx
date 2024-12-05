import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    Typography,
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

export default function Informants({ informants }) {
    const [searchTerm, setSearchTerm] = useState(""); // State to manage search term

    const handleStatusChange = async (informantId, currentStatus) => {
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

        try {
            const response = await axios.post(route("status.change"), {
                informant_id: informantId,
                status: newStatus,
            });

            console.log(response);
            alert(`informant status updated to ${newStatus}`);
            router.reload();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("An error occurred while updating the status.");
        }
    };

    const getStatusColor = (status) =>
        status === "Active" ? "rgb(50, 190, 50)" : "red";

    const filteredInformants = informants.filter((informant) =>
        `${informant.name} ${informant.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title="informants" />
            <div className="mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold dark:text-gray-200">
                        Informant Management
                    </h1>
                    <div className="flex-1 mx-8">
                        <TextInput
                            placeholder="Search informants"
                            fullWidth
                            margin="normal"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Link href="/users/register">
                        <Button variant="contained" color="primary">
                            Add Informant
                        </Button>
                    </Link>
                </div>

                <TableContainer component={Paper}>
                    <Table className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-white">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography className="font-bold text-gray-500 dark:text-white">
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="font-bold text-gray-500 dark:text-white">
                                        Email
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="font-bold text-gray-500 dark:text-white">
                                        Role
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="font-bold text-gray-500 dark:text-white">
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="font-bold text-gray-500 dark:text-white">
                                        Actions
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredInformants.map((informant) => (
                                <TableRow key={informant.id}>
                                    <TableCell>
                                        <Typography className="text-gray-500 dark:text-gray-400">
                                            {informant.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className="text-gray-500 dark:text-gray-400">
                                            {informant.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography className="text-gray-500 dark:text-gray-400">
                                            {informant.role}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={informant.status}
                                            style={{
                                                backgroundColor: getStatusColor(
                                                    informant.status
                                                ),
                                                color: "white",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                handleStatusChange(
                                                    informant.id,
                                                    informant.status
                                                )
                                            }
                                            color={
                                                informant.status === "Active"
                                                    ? "error"
                                                    : "primary"
                                            }
                                        >
                                            {informant.status === "Active"
                                                ? "Deactivate"
                                                : "Activate"}
                                        </Button>
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
