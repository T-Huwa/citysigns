import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Button,
    IconButton,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import {
    IconMap as MapPin,
    IconChecklist as ClipboardCheck,
    IconBell as Bell,
    IconMap2 as MapIcon,
    IconCheck as CheckCircle,
    IconX as X,
} from "@tabler/icons-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Box } from "@mui/system";

const notifications = [
    {
        id: 1,
        message:
            "You have been assigned a new repair request for a Stop Sign at Main St & 5th Ave. Please review the details and accept the task.",
    },
    {
        id: 2,
        message:
            "Repair request #12 for a Yield Sign at Oak Rd & Elm St has been updated to 'In Progress'. Please check for updates.",
    },
    {
        id: 3,
        message:
            "Repair completed for Speed Limit Sign at Park Ave & 3rd St. Marked as completed successfully.",
    },
];

export default function Dashboard({ nearbySigns, assignedRequests }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleAccept = async (request) => {
        try {
            const response = await axios.put(
                `/repairs/${request.id}/update-status`
            );
            setSnackbarMessage(response.data.message);
            setOpenSnackbar(true);
        } catch (error) {
            console.log(error);

            const errorMessage =
                error.response?.data?.error || "Something went wrong";
            setSnackbarMessage(errorMessage);
            setOpenSnackbar(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRequest(null);
    };

    const handleSubmitCompletion = () => {
        setSnackbarMessage(
            `Completed repair for ${selectedRequest.signType} at ${selectedRequest.location}`
        );
        setOpenSnackbar(true);
        handleCloseDialog();
    };

    return (
        <AuthenticatedLayout>
            <Head title="Officer Dashboard" />
            <div className="min-h-screen">
                <Typography
                    variant="h4"
                    className="font-bold dark:text-gray-300"
                >
                    Officer Dashboard
                </Typography>
                <Container maxWidth="lg" className="mt-8">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box className="p-4 bg-gray-200 rounded-lg dark:bg-gray-700">
                                <Typography
                                    variant="h6"
                                    className="mb-4 dark:text-white font-semibold flex items-center"
                                >
                                    <ClipboardCheck
                                        size={24}
                                        className="mr-2"
                                    />
                                    Assigned Requests
                                </Typography>
                                <List>
                                    {assignedRequests.map((request) => (
                                        <ListItem
                                            key={request.id}
                                            className="mb-4 flex-col items-start"
                                        >
                                            <ListItemText
                                                className="dark:text-gray-200"
                                                primary={`${request.sign.type} at ${request.sign.road}`}
                                                secondary={request.notes}
                                            />
                                            <div className="mt-2">
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={
                                                        <CheckCircle
                                                            size={16}
                                                        />
                                                    }
                                                    onClick={() =>
                                                        handleAccept(request)
                                                    }
                                                    className="mr-2"
                                                >
                                                    Accept
                                                </Button>
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box className="p-4 bg-gray-200 rounded-lg dark:bg-gray-700">
                                <Typography
                                    variant="h6"
                                    className="mb-4 dark:text-white font-semibold flex items-center"
                                >
                                    <Bell size={24} className="mr-2" />
                                    Task Notifications
                                </Typography>
                                <List>
                                    {notifications.map((notification) => (
                                        <ListItem
                                            className="dark:text-gray-200"
                                            key={notification.id}
                                        >
                                            -
                                            <ListItemText
                                                className="ml-2"
                                                primary={notification.message}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box className="p-4 bg-gray-200 rounded-lg dark:bg-gray-700">
                                <Typography
                                    variant="h6"
                                    className="mb-4 dark:text-white font-semibold flex items-center"
                                >
                                    <MapIcon size={24} className="mr-2" />
                                    Nearby Signs Requiring Repair
                                </Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography
                                                        variant="h6"
                                                        className="font-bold text-lg dark:text-gray-100"
                                                    >
                                                        Location
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        variant="h6"
                                                        className="font-bold text-lg dark:text-gray-100"
                                                    >
                                                        Sign Type
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        variant="h6"
                                                        className="font-bold text-lg dark:text-gray-100"
                                                    >
                                                        Distance
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        variant="h6"
                                                        className="font-bold text-lg dark:text-gray-100"
                                                    >
                                                        Action
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {nearbySigns.map((sign) => (
                                                <TableRow key={sign.id}>
                                                    <TableCell>
                                                        <Typography className="dark:text-gray-200">
                                                            {sign.sign.road}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography className="dark:text-gray-200">
                                                            {sign.sign.type}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography className="dark:text-gray-200">
                                                            --
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => {
                                                                router.visit(
                                                                    `/signs/${sign.id}`
                                                                );
                                                            }}
                                                        >
                                                            <MapPin size={20} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    message={snackbarMessage}
                    action={
                        <IconButton
                            size="small"
                            color="inherit"
                            onClick={() => setOpenSnackbar(false)}
                        >
                            <X size={16} />
                        </IconButton>
                    }
                />

                {/* Dialog for completing a repair */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Complete Repair</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="notes"
                            label="Completion Notes"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button
                            onClick={handleSubmitCompletion}
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
