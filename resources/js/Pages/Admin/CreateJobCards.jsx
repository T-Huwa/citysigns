import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function CreateJobCard({ updates, users }) {
    const [selectedUpdates, setSelectedUpdates] = useState([]);
    const [assignedTo, setAssignedTo] = useState('');
    const [description, setDescription] = useState('');
        
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await router.post(route('job-cards.store'), {
                update_ids: selectedUpdates,
                assigned_to: assignedTo,
                description,
            });

            if(response)
            alert('Job card created successfully!');
            console.log('Response:', response);
        } catch (error) {
            console.error('Error creating job card:', error);

            if (error.response && error.response.data && error.response.data.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300"
                        rows="3"
                    />
                </div>

                {/* Assigned To */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Assign To
                    </label>
                    <select
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Updates Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Select Updates
                    </label>
                    <div className="mt-2 space-y-2">
                        {updates.map(update => (
                            <label key={update.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={update.id}
                                    checked={selectedUpdates.includes(update.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedUpdates([...selectedUpdates, update.id]);
                                        } else {
                                            setSelectedUpdates(selectedUpdates.filter(id => id !== update.id));
                                        }
                                    }}
                                    className="rounded border-gray-300"
                                />
                                <span className="ml-2">
                                    {update.sign.name} - {update.notes.substring(0, 50)}...
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Create Job Card
                </button>
            </div>
        </form>
    );
}