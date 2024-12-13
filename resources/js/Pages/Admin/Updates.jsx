import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { IconAlertTriangle, IconCheck, IconFileText, IconPhoto } from '@tabler/icons-react';
import { IconClock, IconUser } from '@tabler/icons-react';

const DamageScaleBadge = ({ scale }) => {
    const colors = {
        1: 'bg-green-100 text-green-800',
        2: 'bg-yellow-100 text-yellow-800',
        3: 'bg-orange-100 text-orange-800',
        4: 'bg-red-100 text-red-800',
        5: 'bg-red-200 text-red-900'
    };    

    return (
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${colors[scale] || 'bg-gray-100 text-gray-800'}`}>
            Level {scale}
        </span>
    );
};

const UpdateCard = ({ update }) => {
    const handleApprove = () => {
        router.patch(route('updates.approve', update.id), {}, {
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center">
                    <IconUser className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        {update.informant.name}
                    </span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <IconClock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500 dark:text-gray-300">
                            {new Date(update.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    
                    {update.status !== 'Approved' && (
                        <button
                            onClick={handleApprove}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            <IconCheck className="w-4 h-4 mr-1" />
                            Approve
                        </button>
                    )}
                    
                    {update.status === 'Approved' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200">
                            <IconCheck className="w-4 h-4 mr-1" />
                            Approved
                        </span>
                    )}
                </div>
            </div>

            {/* Rest of your existing UpdateCard content */}
            <div className="mt-4">
                <div className="flex items-center mb-3">
                    <IconAlertTriangle className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="mr-2 dark:text-gray-300">Damage Scale:</span>
                    <DamageScaleBadge scale={update.damage_scale} />
                </div>

                {update.notes && (
                    <div className="flex items-start mt-3">
                        <IconFileText className="w-5 h-5 text-gray-500 mr-2 mt-1" />
                        <p className="text-gray-700 dark:text-gray-300">{update.notes}</p>
                    </div>
                )}

                {update.images && (
                    <div className="mt-4">
                        <div className="flex items-center mb-2">
                            <IconPhoto className="w-5 h-5 text-gray-500 mr-2" />
                            <span className="text-gray-600 dark:text-gray-300">Attached Images</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {JSON.parse(update.images).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Update image ${index + 1}`}
                                    className="rounded-lg w-full h-48 object-cover"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Updates({ auth, updates }) {

    console.log(updates);
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Updates" />
            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
                            Sign Updates
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            View all updates and maintenance reports for signs
                        </p>
                    </div>

                    <div className="space-y-6">
                        {updates.map((update) => (
                            <UpdateCard key={update.id} update={update} />
                        ))}
                    </div>

                    {updates.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No updates found</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}