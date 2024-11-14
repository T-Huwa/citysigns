import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import {
    CurrencyDollarIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline"; // Heroicons
import { UserCircleIcon } from "@heroicons/react/24/outline"; // Heroicons
import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    IconCalendar,
    IconHash,
    IconLocation,
    IconNotes,
    IconTextCaption,
} from "@tabler/icons-react";
import SecondaryButton from "@/Components/SecondaryButton";
import axios from "axios";

export default function RepairsPage({ repairs }) {
    const [editableRepair, setEditableRepair] = useState(null); // State to track which repair is being edited
    const [notes, setNotes] = useState("");
    const [cost, setCost] = useState("");

    const isOfficer = usePage().props.auth.user.role === "Officer";

    const handleCompleteRepair = (repair) => {
        setEditableRepair(repair.id);
        setNotes(repair.notes || "");
        setCost(repair.cost || "");
    };

    const handleSave = async (repairId) => {
        const updatedRepair = {
            notes,
            cost: parseFloat(cost),
        };

        try {
            await axios.put(`/repairs/${repairId}`, {
                notes: notes,
                cost: parseFloat(cost),
            });
            setEditableRepair(null);
            alert("Repair Updated!");
            router.reload();
        } catch (error) {
            console.error("Error updating repair:", error);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Repairs" />
            <Box
                sx={{
                    minHeight: "100vh",
                }}
            >
                <Typography
                    variant="h4"
                    className="dark:text-gray-200 mb-6"
                    gutterBottom
                >
                    Repairs
                </Typography>
                <Grid container spacing={4}>
                    {repairs.map((repair) => {
                        if (repair.completion_date) {
                            let date = new Date(repair.completion_date);
                            repair.completion_date = date.toDateString();
                        }

                        return (
                            <Grid item xs={12} sm={8} md={6} key={repair.id}>
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        boxShadow: 3,
                                    }}
                                    className="dark:bg-gray-800"
                                >
                                    <CardContent className="dark:bg-gray-700">
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={2}
                                        >
                                            <Typography
                                                variant="body"
                                                color="primary"
                                            >
                                                {repair.status}
                                            </Typography>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <IconHash
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <Typography
                                                    variant="body2"
                                                    ml={1}
                                                    color="textSecondary"
                                                >
                                                    {repair.id}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Officer and Sign Information */}
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                    className="dark:text-gray-300"
                                                >
                                                    <UserCircleIcon
                                                        className="h-5 w-5 mr-1 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    Officer
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    className="dark:text-gray-200"
                                                >
                                                    {repair.user.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                    className="dark:text-gray-300"
                                                >
                                                    <IdentificationIcon
                                                        className="h-5 w-5 mr-1 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    Sign ID
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    className="dark:text-gray-200"
                                                >
                                                    {repair.sign_id}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        {/* Additional Details */}
                                        <Grid container spacing={2} mt={2}>
                                            <Grid item xs={6}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                    className="dark:text-gray-300"
                                                >
                                                    <IconCalendar
                                                        className="h-5 w-5 mr-1 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    Completion Date
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    className="dark:text-gray-200"
                                                >
                                                    {repair.completion_date ||
                                                        "Not Completed"}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                    className="dark:text-gray-300"
                                                >
                                                    <CurrencyDollarIcon
                                                        className="h-5 w-5 mr-1 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    Cost
                                                </Typography>
                                                {editableRepair ===
                                                repair.id ? (
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        value={cost}
                                                        onChange={(e) =>
                                                            setCost(
                                                                e.target.value
                                                            )
                                                        }
                                                        type="number"
                                                        InputProps={{
                                                            startAdornment:
                                                                "MWK",
                                                        }}
                                                        className="dark:bg-gray-200"
                                                    />
                                                ) : (
                                                    <Typography
                                                        variant="body1"
                                                        className="dark:text-gray-200"
                                                    >
                                                        {repair.cost
                                                            ? `MWK ${repair.cost.toFixed(
                                                                  2
                                                              )}`
                                                            : "Not set"}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>

                                        {/* Notes */}
                                        <Box mt={2}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                className="dark:text-gray-300"
                                            >
                                                <IconNotes
                                                    className="h-5 w-5 mr-1 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                Notes
                                            </Typography>
                                            {editableRepair === repair.id ? (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    value={notes}
                                                    onChange={(e) =>
                                                        setNotes(e.target.value)
                                                    }
                                                    className="dark:bg-gray-300"
                                                />
                                            ) : (
                                                <Typography
                                                    variant="body1"
                                                    className="dark:text-gray-200"
                                                >
                                                    {repair.notes || "No notes"}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Grid container spacing={2} mt={2}>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                    className="dark:text-gray-300"
                                                >
                                                    <IconLocation
                                                        className="h-5 w-5 mr-1 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    Sign Location
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    className="dark:text-gray-200"
                                                >
                                                    {repair.sign.location}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                    className="dark:text-gray-300"
                                                >
                                                    <IconTextCaption
                                                        className="h-5 w-5 mr-1 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    Sign Text
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    className="dark:text-gray-200"
                                                >
                                                    {repair.sign.words}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        {isOfficer &&
                                            repair.status === "in_progress" && (
                                                <div>
                                                    <Divider className="py-2" />
                                                    {editableRepair ===
                                                    repair.id ? (
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() =>
                                                                handleSave(
                                                                    repair.id
                                                                )
                                                            }
                                                            sx={{ mt: 2 }}
                                                        >
                                                            Save
                                                        </Button>
                                                    ) : (
                                                        <SecondaryButton
                                                            className="mt-2"
                                                            onClick={() =>
                                                                handleCompleteRepair(
                                                                    repair
                                                                )
                                                            }
                                                        >
                                                            Complete Repair
                                                        </SecondaryButton>
                                                    )}
                                                </div>
                                            )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </AuthenticatedLayout>
    );
}
