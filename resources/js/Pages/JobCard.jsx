import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const JobCard = ({ auth }) => {
    const userRole = auth.user.role;    
    const { jobCard, updates } = usePage().props;
    const [selectedUpdate, setSelectedUpdate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComplete = () => {
        if (confirm('Are you sure you want to mark this job card as completed?')) {
            router.post(`/job-cards/${jobCard.id}/complete`);
        }
    };

    const openModal = (update) => {
        setSelectedUpdate(update);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUpdate(null);
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow sm:rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Job Card Details</h1>
                {jobCard ? (
                    <div>
                        <p className="mb-2"><strong>Description:</strong> {jobCard.description}</p>
                        <p className="mb-2"><strong>Assigned To:</strong> {jobCard.assigned_to}</p>
                        <p className="mb-4"><strong>Status:</strong> {jobCard.status}</p>

                        <h2 className="text-xl font-semibold mb-3">Updates</h2>
                        {updates && updates.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-2">
                                {updates.map((update) => (
                                    <li key={update.id} className="text-sm">
                                        <button 
                                            onClick={() => openModal(update)} 
                                            className="text-blue-500 hover:underline"
                                        >
                                            {update.title} - <span className="italic">{update.status}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No updates associated with this job card.</p>
                        )}

                        {jobCard.status !== 'Completed' && userRole === 'Officer' && (
                            <button 
                                onClick={handleComplete} 
                                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Mark as Completed
                            </button>
                        )}
                    </div>
                ) : (
                    <p className="text-red-500">Job card not found.</p>
                )}

                {isModalOpen && selectedUpdate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/2">
                            <h2 className="text-xl font-bold mb-4">Update Details</h2>
                            Sign <a href={`/signs/${selectedUpdate.sign_id}`} className="text-sky-500"># {selectedUpdate.sign_id}</a>
                            <p><strong>Damage:</strong> {selectedUpdate.damage_scale}</p>
                            <p><strong>Status:</strong> {selectedUpdate.status}</p>
                            <p><strong>Notes:</strong> {selectedUpdate.notes}</p>
                            <div className="mt-4 text-right">
                                <button 
                                    onClick={closeModal} 
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default JobCard;
