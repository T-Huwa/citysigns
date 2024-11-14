import React, { useState } from "react";
import {
    Typography,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import {
    IconSearch as Search,
    IconMap as MapPin,
    IconTool as Tool,
    IconUser as User,
    IconCalendar as Calendar,
    IconClipboard as ClipboardList,
    IconEye as Eye,
} from "@tabler/icons-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Box } from "@mui/system";

export default function Requests({ requests }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleViewDetails = (request) => {
        let date = new Date(request.created_at);
        request.created_at = date.toDateString();
        setSelectedRequest(request);

        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const filteredRequests = requests.filter(
        (request) =>
            request.sign.location
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            request.sign.type
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            request.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "warning";
            case "in_progress":
                return "info";
            case "completed":
                return "success";
            default:
                return "default";
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Requests" />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <Typography
                    variant="h6"
                    className="font-bold dark:text-gray-200"
                >
                    Sign Repair Requests
                </Typography>
                <Container maxWidth="lg" className="mt-8">
                    <Box className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by location, sign type, or officer"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="mb-4 dark:bg-gray-300 rounded-md"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={20} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TableContainer>
                            <Table>
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
                                                Status
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography className="font-bold text-gray-500 dark:text-white">
                                                Date Requested
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
                                    {filteredRequests.map((request) => {
                                        let date = new Date(request.created_at);
                                        request.created_at =
                                            date.toDateString();
                                        return (
                                            <TableRow key={request.id}>
                                                <TableCell>
                                                    <Typography className="text-gray-500 dark:text-gray-400">
                                                        {request.sign.location}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography className="text-gray-500 dark:text-gray-400">
                                                        {request.sign.type}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={request.status}
                                                        color={getStatusColor(
                                                            request.status
                                                        )}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography className="text-gray-500 dark:text-gray-400">
                                                        {request.created_at}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() =>
                                                            handleViewDetails(
                                                                request
                                                            )
                                                        }
                                                        aria-label="View details"
                                                    >
                                                        <Eye size={20} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="request-details-dialog"
                >
                    <DialogTitle id="request-details-dialog">
                        Request Details
                    </DialogTitle>
                    <DialogContent>
                        {selectedRequest && (
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <MapPin size={20} className="mr-2" />
                                    <Typography variant="body1">
                                        Location:{" "}
                                        {selectedRequest.sign.location}
                                    </Typography>
                                </div>
                                <div className="flex items-center">
                                    <Tool size={20} className="mr-2" />
                                    <Typography variant="body1">
                                        Sign Type: {selectedRequest.sign.type}
                                    </Typography>
                                </div>
                                <div className="flex items-center">
                                    <ClipboardList size={20} className="mr-2" />
                                    <Typography variant="body1">
                                        Status: {selectedRequest.status}
                                    </Typography>
                                </div>
                                <div className="flex items-center">
                                    <User size={20} className="mr-2" />
                                    <Typography variant="body1">
                                        Assigned Officer:
                                        {selectedRequest.user.name}
                                    </Typography>
                                </div>
                                <div className="flex items-center">
                                    <Calendar size={20} className="mr-2" />
                                    <Typography variant="body1">
                                        Date Requested:
                                        {selectedRequest.created_at}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
