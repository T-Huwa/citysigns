import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet styles
import L from "leaflet";
import { Button } from "@mui/material";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function NewSign() {
    const { data, setData, post, processing, errors, reset } = useForm({
        location: "",
        street: "",
        type: "",
        words: "",
        damageScale: "",
    });

    const [markerPosition, setMarkerPosition] = useState([
        -11.4389649, 34.0084395,
    ]);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        setData("location", JSON.stringify({ lat, lng }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("signs.store"), {
            onSuccess: () => {
                alert("submitting...");
                reset();
                alert("Sign created successfully!");
            },
            onError: (errors) => {
                alert("Error creating sign");
                console.log(errors);
            },
        });
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    };

    return (
        <AuthenticatedLayout>
            <Head title="New Sign" />
            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form Section */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-semibold mb-6">
                                Add New Sign
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Location Field */}
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        value={data.location}
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        readOnly
                                        required
                                    />
                                    {errors.location && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                {/* Street Field */}
                                <div>
                                    <label
                                        htmlFor="street"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Road/Street
                                    </label>
                                    <input
                                        type="text"
                                        id="street"
                                        value={data.street}
                                        onChange={(e) =>
                                            setData("street", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.street && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.street}
                                        </p>
                                    )}
                                </div>

                                {/* Remaining Fields */}
                                <div>
                                    <label
                                        htmlFor="type"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Type
                                    </label>
                                    <input
                                        type="text"
                                        id="type"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.type && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="words"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Words
                                    </label>
                                    <input
                                        type="text"
                                        id="words"
                                        value={data.words}
                                        onChange={(e) =>
                                            setData("words", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.words && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.words}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="damageScale"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Damage Scale
                                    </label>
                                    <input
                                        type="number"
                                        id="damageScale"
                                        value={data.damageScale}
                                        onChange={(e) =>
                                            setData(
                                                "damageScale",
                                                e.target.value
                                            )
                                        }
                                        min="0"
                                        max="10"
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.damageScale && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.damageScale}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Submitting..."
                                            : "Create Sign"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-center font-bold mt-3">
                            Click The map To Enter Sign Location
                        </div>
                        <div className="p-6">
                            <MapContainer
                                center={markerPosition}
                                zoom={13}
                                style={{ height: "400px", width: "100%" }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={markerPosition}></Marker>
                                <MapClickHandler />
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default NewSign;
