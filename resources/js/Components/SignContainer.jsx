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
    Grid,
} from "@mui/material";
import { CiSaveUp2, CiWarning } from "react-icons/ci";
import {
    IconInfoSquare,
    IconLocation,
    IconSignRight,
} from "@tabler/icons-react";
import { Head, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import axios from "axios";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const getDamageColor = (scale) => {
    const colors = ["#4caf50", "#8bc34a", "#ffeb3b", "#ff9800", "#f44336"];
    return colors[scale - 1] || "#9e9e9e";
};

const getDamageLabel = (scale) => {
    const labels = ["Excellent", "Good", "Fair", "Poor", "Critical"];
    return labels[scale - 1] || "Unknown";
};

export default function SignContainer({ sign, officers = null }) {
    //const sign = usePage().props.sign;
    //const officers = usePage().props.officers;
    const userRole = usePage().props.auth.user.role;
    const signCoords = JSON.parse(sign.location);

    const date = new Date(sign.updated_at);
    const update_date = date.toDateString();

    const [damageScale, setDamageScale] = useState(sign.damageScale);
    const [editingScale, setEditingScale] = useState(false);
    const [assignRepairsOpen, setAssignRepairsOpen] = useState(false); // For toggling the input field
    const [assignedOfficer, setAssignedOfficer] = useState("");
    const [loading, setLoading] = useState(false);
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

            console.log(response.data);
            alert("Damage scale updated successfully!");
        } catch (error) {
            console.error("Error updating damage scale:", error);
            alert("Failed to update damage scale.");
        }
    };

    const toggleAssignRepairs = () => {
        setAssignRepairsOpen((prevState) => !prevState);
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

    const damageColor = getDamageColor(sign.damageScale);
    const damageLabel = getDamageLabel(sign.damageScale);

    return (
        <>
            <div className="flex container mx-auto p-4 flex justify-center">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={10}>
                        <Card className="max-w-md shadow-md">
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
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {sign.road ? sign.road : sign.location}
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
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        <strong>Type:</strong> {sign.type}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
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
                                            label={`${sign.damageScale} - ${damageLabel}`}
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
                                        value={sign.damageScale * 20}
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
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        <strong>Last Inspection:</strong>{" "}
                                        {update_date}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        <strong>Notes:</strong> N/A
                                    </Typography>
                                </Box>
                            </CardContent>

                            <Divider />

                            {officers && (
                                <>
                                    {" "}
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

                                            <PrimaryButton
                                                onClick={handleChangeStatus}
                                            >
                                                Change Status
                                            </PrimaryButton>
                                        </div>

                                        {userRole === "Admin" && (
                                            <PrimaryButton
                                                onClick={toggleAssignRepairs}
                                            >
                                                Assign Repairs
                                            </PrimaryButton>
                                        )}
                                    </Box>{" "}
                                    {/* Officer Assignment Input */}
                                    <Collapse
                                        in={assignRepairsOpen}
                                        timeout="auto"
                                    >
                                        <Box className="p-4">
                                            <FormControl fullWidth>
                                                <InputLabel>
                                                    Assign Officer
                                                </InputLabel>
                                                <Select
                                                    value={assignedOfficer}
                                                    onChange={(e) =>
                                                        setAssignedOfficer(
                                                            e.target.value
                                                        )
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
                                                {loading
                                                    ? "Assigning..."
                                                    : "Save Assignment"}
                                            </SecondaryButton>
                                        </Box>
                                    </Collapse>
                                </>
                            )}
                        </Card>
                    </Grid>

                    {officers && (
                        <Grid item xs={12} sm={8} md={6}>
                            <Card>
                                <Typography variant="h6" className="mb-2">
                                    Sign Location
                                </Typography>
                                <MapContainer
                                    center={
                                        [signCoords.lat, signCoords.lng] || [
                                            0, 0,
                                        ]
                                    }
                                    zoom={15}
                                    style={{ height: "300px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker
                                        position={[
                                            signCoords.lat,
                                            signCoords.lng,
                                        ]}
                                    />
                                </MapContainer>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
        </>
    );
}
