import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@mui/material";

function NewSign() {
    const { data, setData, post, processing, errors, reset } = useForm({
        location: "",
        type: "",
        words: "",
        damageScale: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("signs.store"), {
            onSuccess: () => {
                reset();
                alert("Sign created successfully!");
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="New Sign" />
            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-semibold mb-6">
                                Add New Sign
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                        required
                                    />
                                    {errors.location && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default NewSign;
