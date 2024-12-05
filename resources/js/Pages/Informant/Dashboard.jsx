import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import InformantLayout from "@/Layouts/InformantLayout";
import SignContainer from "@/Components/SignContainer";
import { Head, useForm } from "@inertiajs/react";
import { IconEdit } from "@tabler/icons-react";
import {
    Button,
    CircularProgress,
    LinearProgress,
    Typography,
} from "@mui/material";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
});

export default function Dashboard({ signs, auth }) {
    const [selectedSign, setSelectedSign] = useState(null);
    const [selectedSignLocation, setSelectedSignLocation] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [userLocation, setUserLocation] = useState([-11.4389649, 34.0084395]); // Default to Mzuzu

    const { data, setData, post, processing, reset } = useForm({
        sign_id: null,
        damage_scale: "",
        notes: "",
        informant_id: auth.user.id,
        images: [],
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([
                        position.coords.latitude,
                        position.coords.longitude,
                    ]);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setUserLocation([-11.4389649, 34.0084395]);
                }
            );
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setData("images", [...data.images, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("updates.store"), {
            onSuccess: () => {
                alert("Update successfully created!");
                reset();
                setShowForm(false);
            },
            onError: () => {
                alert("Failed to create the update. Please try again.");
            },
        });
    };

    const selectSign = (sign) => {
        setSelectedSign(sign);
        const location = JSON.parse(sign.location);
        setSelectedSignLocation([location.lat, location.lng]);
        setData("sign_id", sign.id);
    };

    const getIconForDamageScale = (damageScale) => {
        const icons = {
            1: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            2: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
            3: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
            4: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
            5: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        };
        return new L.Icon({
            iconUrl: icons[damageScale] || icons[1],
            shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });
    };

    return (
        <InformantLayout>
            <Head title="Informant Dashboard" />
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">
                Sign Management
            </h1>
            <div className="flex h-full">
                <div className="w-1/2 p-4">
                    {selectedSign && (
                        <>
                            <Button onClick={() => setShowForm(!showForm)}>
                                <IconEdit />
                            </Button>
                            <SignContainer sign={selectedSign} />
                        </>
                    )}
                </div>
                {!showForm && (
                    <div className="w-1/2">
                        <MapContainer
                            center={userLocation}
                            zoom={13}
                            style={{ height: "100%", width: "100%", zIndex: 1 }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {signs &&
                                signs.map((sign) => {
                                    const location = JSON.parse(sign.location);
                                    const icon = getIconForDamageScale(
                                        sign.damageScale
                                    );

                                    return (
                                        <Marker
                                            position={[
                                                location.lat,
                                                location.lng,
                                            ]}
                                            icon={icon}
                                            key={sign.id}
                                        >
                                            <Popup>
                                                <strong>Damage Scale:</strong>{" "}
                                                {sign.damageScale}
                                                <br />
                                                <button
                                                    onClick={() =>
                                                        selectSign(sign)
                                                    }
                                                    className="mt-2 py-1 px-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    View Sign
                                                </button>
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                        </MapContainer>
                    </div>
                )}

                {showForm && (
                    <form onSubmit={handleSubmit}>
                        {processing && <LinearProgress color="success" />}
                        <div className="max-w-lg rounded-md shadow-md border p-2 space-y-4">
                            <Typography
                                variant="h4"
                                className="text-center dark:text-gray-200"
                            >
                                Edit Sign
                            </Typography>
                            <div>
                                <label
                                    htmlFor="damage_scale"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Damage Scale (1-5)
                                </label>
                                <input
                                    type="number"
                                    id="damage_scale"
                                    name="damage_scale"
                                    min="1"
                                    max="5"
                                    value={data.damage_scale}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="notes"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Notes
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={data.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                ></textarea>
                            </div>
                            <div>
                                <label
                                    htmlFor="images"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Images
                                </label>
                                <input
                                    type="file"
                                    id="images"
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="mt-1 block w-full dark:text-gray-400"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <Button
                                    variant="outlined"
                                    onClick={() => setShowForm(false)}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </InformantLayout>
    );
}
