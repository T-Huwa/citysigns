import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    IconClipboard as Clipboard, 
    IconClock as Clock,
    IconUser as User,
    IconAlertCircle as AlertCircle,
    IconCircleCheck as CheckCircle2,
    IconCircle as Circle,
    IconPlayerPlay as PlayCircle
} from '@tabler/icons-react';
import CreateJobCards from './CreateJobCards'; // Import CreateJobCards component

const StatusBadge = ({ status }) => {
    const styles = {
        'Open': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };

    const icons = {
        'Open': Circle,
        'In Progress': PlayCircle,
        'Completed': CheckCircle2
    };

    const StatusIcon = icons[status] || AlertCircle;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            <StatusIcon className="w-4 h-4 mr-1" />
            {status}
        </span>
    );
};

const JobCard = ({ jobCard }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
            <div>
                <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {jobCard.reference_number}
                    </h3>
                    <StatusBadge status={jobCard.status} />
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {jobCard.description}
                </p>
            </div>
            <a
                href={route('job-cards.show', jobCard.id)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
                View Details
            </a>
        </div>

        <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <User className="w-4 h-4 mr-1" />
                Assigned to: {jobCard.assigned_to?.name || 'Unassigned'}
            </div>
            
            <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Related Updates ({jobCard.updates.length})
                </h4>
                <div className="space-y-2">
                    {jobCard.updates.slice(0, 2).map(update => (
                        <div 
                            key={update.id}
                            className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                        >
                            <Clipboard className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                            <span className="truncate">
                                {update.notes}
                            </span>
                        </div>
                    ))}
                    {jobCard.updates.length > 2 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            + {jobCard.updates.length - 2} more updates
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Created {new Date(jobCard.created_at).toLocaleDateString()}
            </div>
        </div>
    </div>
);

const JobCardFilters = ({ currentFilter, onFilterChange }) => (
    <div className="flex space-x-2 mb-4">
        {['All', 'Open', 'In Progress', 'Completed'].map(filter => (
            <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentFilter === filter
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
                {filter}
            </button>
        ))}
    </div>
);

export default function Index({ auth, jobCards }) {
    const [filter, setFilter] = React.useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredJobCards = jobCards.filter(card => 
        filter === 'All' ? true : card.status === filter
    );

    const handleModalClose = () => setIsModalOpen(false);
    const handleModalOpen = () => setIsModalOpen(true);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Job Cards" />

            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Job Cards
                            </h1>
                            {auth.user.role === 'admin' && (
                                <button
                                    onClick={handleModalOpen}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Create Job Card
                                </button>
                            )}
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Manage and track maintenance job cards
                        </p>
                    </div>

                    <JobCardFilters 
                        currentFilter={filter}
                        onFilterChange={setFilter}
                    />

                    <div className="space-y-6">
                        {filteredJobCards.map(jobCard => (
                            <JobCard key={jobCard.id} jobCard={jobCard} />
                        ))}
                        
                        {filteredJobCards.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400">
                                    No job cards found
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Create Job Card</h2>
                            <button
                                onClick={handleModalClose}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                &times;
                            </button>
                        </div>
                        <CreateJobCards />
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
