import React from "react";
import { CircularProgress } from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SignContainer from "@/Components/SignContainer";

export default function Sign({ sign, officers }) {
    if (!sign) {
        return (
            <div className="container mx-auto p-4 flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Sign ${sign.id}`} />
            <SignContainer sign={sign} officers={officers} />
        </AuthenticatedLayout>
    );
}
