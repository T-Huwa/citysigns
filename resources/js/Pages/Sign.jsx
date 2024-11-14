import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    LinearProgress,
    CircularProgress,
    Divider,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Collapse,
} from "@mui/material";
import { CiSaveUp2, CiWarning } from "react-icons/ci";
import {
    IconInfoSquare,
    IconLocation,
    IconSignRight,
} from "@tabler/icons-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import axios from "axios";

const getDamageColor = (scale) => {
    const colors = ["#4caf50", "#8bc34a", "#ffeb3b", "#ff9800", "#f44336"];
    return colors[scale - 1] || "#9e9e9e";
};

const getDamageLabel = (scale) => {
    const labels = ["Excellent", "Good", "Fair", "Poor", "Critical"];
    return labels[scale - 1] || "Unknown";
};

export default function Sign({ sign, officers }) {
    const userRole = usePage().props.auth.user.role;

    const [damageScale, setDamageScale] = useState(sign.damageScale);
    const [editingScale, setEditingScale] = useState(false);
    const [assignRepairsOpen, setAssignRepairsOpen] = useState(false); // For toggling the input field
    const [assignedOfficer, setAssignedOfficer] = useState(""); // For tracking the selected officer
    const [loading, setLoading] = useState(false); // For loading state when saving repair

    const handleChangeStatus = () => {
        setEditingScale(true);
        setDamageScale((prevScale) => {
            const newScale = prevScale < 5 ? prevScale + 1 : 1;
            return newScale;
        });
    };

    const saveScale = async () => {
        setEditingScale(false);

        try {
            const response = await axios.post(
                `/signs/${sign.id}/update-damage`,
                { damageScale: damageScale }
            );

            // Handle success
            console.log(response.data);
            alert("Damage scale updated successfully!");
        } catch (error) {
            console.error("Error updating damage scale:", error);
            alert("Failed to update damage scale.");
        }
    };

    const toggleAssignRepairs = () => {
        setAssignRepairsOpen((prevState) => !prevState); // Toggle visibility of the input field
    };

    const saveOfficerAssignment = async () => {
        if (!assignedOfficer) {
            alert("Please select an officer to assign.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(route("repairs.store"), {
                officer_id: assignedOfficer,
                sign_id: sign.id,
            });

            console.log(response);

            alert("Officer assigned successfully!");
            setLoading(false);
            setAssignRepairsOpen(false);
        } catch (error) {
            console.error("Error assigning officer:", error);
            alert("Failed to assign officer.");
            setLoading(false);
        }
    };

    if (!sign) {
        return (
            <div className="container mx-auto p-4 flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    const damageColor = getDamageColor(damageScale);
    const damageLabel = getDamageLabel(damageScale);

    return (
        <AuthenticatedLayout>
            <Head title={`Sign ${sign.id}`} />
            <div className="container mx-auto p-4 flex justify-center">
                <Card className="max-w-lg w-full shadow-md">
                    <CardContent>
                        <Box className="flex items-center mb-4">
                            <IconSignRight className="mr-3 text-blue-600" />
                            <Typography variant="h4" component="h1">
                                Road Sign Details
                            </Typography>
                        </Box>

                        <Divider className="mb-4" />

                        <Box className="my-6">
                            <Typography
                                variant="h6"
                                className="flex items-center mb-1 text-blue-700"
                            >
                                <IconLocation className="mr-2" />
                                Location
                            </Typography>
                            <Typography variant="body1" color="textPrimary">
                                {sign.location}
                            </Typography>
                        </Box>

                        <Divider className="mb-4" />

                        <Box className="my-4">
                            <Typography
                                variant="h6"
                                className="flex items-center mb-1 text-blue-700"
                            >
                                <IconInfoSquare className="mr-2" />
                                Sign Information
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Type:</strong> {sign.type}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Words:</strong> {sign.words}
                            </Typography>
                        </Box>

                        <Divider className="mb-4" />

                        <Box className="my-4">
                            <Typography
                                variant="h6"
                                className="flex items-center mb-1 text-blue-700"
                            >
                                <CiWarning className="mr-2" />
                                Damage Assessment
                            </Typography>
                            <Box className="flex items-center mb-1">
                                <Chip
                                    label={`${damageScale} - ${damageLabel}`}
                                    style={{
                                        backgroundColor: damageColor,
                                        color: "white",
                                    }}
                                    className="mr-2"
                                />
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    1 (Excellent) to 5 (Critical)
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={damageScale * 20}
                                style={{
                                    backgroundColor: "#e0e0e0",
                                    height: 8,
                                    borderRadius: 4,
                                }}
                                sx={{
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: damageColor,
                                    },
                                }}
                                className="mb-3"
                            />
                        </Box>

                        <Divider className="mt-4" />

                        <Box className="my-4">
                            <Typography
                                variant="h6"
                                className="mb-1 text-blue-700"
                            >
                                Additional Information
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Last Inspection:</strong>{" "}
                                {sign.lastInspection}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Notes:</strong> {sign.notes}
                            </Typography>
                        </Box>
                    </CardContent>

                    <Divider />

                    <Box className="p-4 flex justify-around">
                        <div className="flex">
                            {editingScale && (
                                <SecondaryButton
                                    className="mx-2"
                                    onClick={saveScale}
                                >
                                    <CiSaveUp2 />
                                </SecondaryButton>
                            )}

                            <PrimaryButton onClick={handleChangeStatus}>
                                Change Status
                            </PrimaryButton>
                        </div>

                        {userRole === "Admin" && (
                            <PrimaryButton onClick={toggleAssignRepairs}>
                                Assign Repairs
                            </PrimaryButton>
                        )}
                    </Box>

                    {/* Officer Assignment Input */}
                    <Collapse in={assignRepairsOpen} timeout="auto">
                        <Box className="p-4">
                            <FormControl fullWidth>
                                <InputLabel>Assign Officer</InputLabel>
                                <Select
                                    value={assignedOfficer}
                                    onChange={(e) =>
                                        setAssignedOfficer(e.target.value)
                                    }
                                    label="Assign Officer"
                                >
                                    {officers.map((officer) => (
                                        <MenuItem
                                            key={officer.id}
                                            value={officer.id}
                                        >
                                            {officer.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Save Officer Assignment Button */}
                        <Box className="p-4 flex justify-end">
                            <SecondaryButton
                                onClick={saveOfficerAssignment}
                                disabled={loading}
                            >
                                {loading ? "Assigning..." : "Save Assignment"}
                            </SecondaryButton>
                        </Box>
                    </Collapse>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
