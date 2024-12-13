import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import InformantLayout from "@/Layouts/InformantLayout";
import SignContainer from "@/Components/SignContainer";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { IconEdit, IconX } from "@tabler/icons-react";
import {
    Button,
    CircularProgress,
    LinearProgress,
    Typography,
} from "@mui/material";
import axios from "axios";

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
    const { flash } = usePage().props;
    const [selectedSign, setSelectedSign] = useState(null);
    const [selectedSignLocation, setSelectedSignLocation] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [userLocation, setUserLocation] = useState([-11.4389649, 34.0084395]);
    const [processing, setProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { data, setData, post, reset } = useForm({
        sign_id: null,
        damage_scale: "",
        notes: "",
        status: "Pending",
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
        setData("images", [...files]);
        console.log(data.images);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();

        formData.append("sign_id", data.sign_id);
        formData.append("damage_scale", data.damage_scale);
        formData.append("notes", data.notes);
        formData.append("informant_id", data.informant_id);

        data.images.forEach((image) => {
            formData.append("images[]", image);
        });

        console.log(data.images);

        try {
            const response = await axios.post(route("updates.store"), formData);
            setSuccessMessage(response.data.message);
            console.log(response.data);

            setShowForm(false);
            reset();
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Failed to submit the form."
            );
        } finally {
            setProcessing(false);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setProcessing(true);

    //     const formData = new FormData();

    //     formData.append("sign_id", data.sign_id);
    //     formData.append("damage_scale", data.damage_scale);
    //     formData.append("notes", data.notes);
    //     formData.append("informant_id", data.informant_id);

    //     data.images.forEach((image) => {
    //         formData.append("images[]", image);
    //     });

    //     post(route("updates.store"), formData, {
    //         forceFormData: true,
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //         onSuccess: () => {
    //             alert("Update successfully created!");
    //             reset();
    //             setShowForm(false);
    //             setProcessing(false);
    //         },
    //         onError: (error) => {
    //             alert("Failed to create the update. Please try again.");
    //             setProcessing(false);
    //         },
    //         onFinish: () => {
    //             alert("finished");
    //             setProcessing(false);
    //         },
    //     });
    // };

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

    const closeFlash = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    return (
        <InformantLayout>
            <Head title="Informant Dashboard" />
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">
                Sign Management
            </h1>
            {successMessage && (
                <div className="bg-green-500 text-white p-4 rounded flex">
                    <span className="flex-1">{successMessage}</span>
                    <Button onClick={closeFlash}>
                        <IconX color="white" />
                    </Button>
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-500 text-white p-4 rounded flex">
                    <span className="flex-1">{errorMessage}</span>
                    <Button onClick={closeFlash}>
                        <IconX color="white" />
                    </Button>
                </div>
            )}
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
                        {/* {processing && (
                            <LinearProgress
                                color="warning"
                                className="mx-1 rounded-t-xl"
                            />
                        )} */}
                        <div className="relative max-w-md rounded-md shadow-md border p-2 space-y-4">
                            {processing && (
                                <div className="z-12 backdrop-blur-[1px] rounded-md absolute top-0 start-0 w-full h-full bg-gray-400/40 grid grid-cols-1 place-items-center">
                                    <CircularProgress color="warning" />
                                </div>
                            )}

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
                                    className="border border-gray-400 rounded-lg mt-2 dark:text-gray-300 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:file:bg-blue-500 dark:hover:file:bg-blue-600"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    onClick={() => setShowForm(false)}
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
