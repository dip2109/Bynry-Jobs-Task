import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useProfiles } from '../context/ProfileContext';
import { SearchBar } from '../components/SearchBar';
import toast from 'react-hot-toast';

const AdminPage1 = () => {
    const { profiles, addProfile, updateProfile, deleteProfile } = useProfiles();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        location: '',
        interests: ''
    });
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: '',
        photo: '',
        description: '',
        address: '',
        lat: '',
        lng: '',
        contact: '',
        interests: ''
    });

    const resetForm = () => {
        setForm({
            name: '',
            photo: '',
            description: '',
            address: '',
            lat: '',
            lng: '',
            contact: '',
            interests: ''
        });
        setEditing(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prev => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            ...form,
            id: editing ? editing.id : uuidv4(),
            lat: parseFloat(form.lat),
            lng: parseFloat(form.lng),
            interests: form.interests.split(',').map((i) => i.trim())
        };

        if (editing) {
            updateProfile(profileData);
            toast.success('Profile updated successfully!');
        } else {
            addProfile(profileData);
            toast.success('New profile added successfully!');
        }

        resetForm();
    };
    const handleEdit = (profile) => {
        setEditing(profile);
        setForm({
            ...profile,
            interests: profile.interests.join(', ')
        });
        // The image will be loaded automatically since we're setting the form.photo
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            deleteProfile(id);
            toast.success('Profile deleted successfully!');
        }
    };

    // Update the filteredProfiles logic to match Home page
    const filteredProfiles = profiles.filter(profile => {
        const query = searchQuery.toLowerCase();
        return (
            profile.name.toLowerCase().includes(query) ||
            profile.address.toLowerCase().includes(query) ||
            profile.interests.some(interest =>
                interest.toLowerCase().includes(query)
            )
        );
    });


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-3xl text-center font-bold text-gray-900 p-6">Admin Dashboard</h2>

                <div className="flex flex-col md:flex-row gap-6 p-4">
                    {/* Left Column - Search and Profile List */}
                    <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-6">
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            className="mb-6"
                        />

                        <div className="overflow-y-auto max-h-[calc(100vh-200px)] space-y-4">
                            {filteredProfiles.map(profile => (
                                <div key={profile.id}
                                    className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex gap-4 p-4">
                                    <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden">
                                        <img
                                            src={profile.photo}
                                            alt={profile.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = '/assets/placeholder.jpg';
                                                e.target.onerror = null;
                                            }}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800">{profile.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{profile.description}</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(profile)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded text-sm font-semibold transition-colors duration-300"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(profile.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm font-semibold transition-colors duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                            {editing ? "Edit Profile" : "Add New Profile"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6 h-8">
                            <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden mb-6">
                                {form.photo ? (
                                    <img
                                        src={form.photo}
                                        alt="Profile preview"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center h-full pl-4">
                                        <span className="text-gray-100"></span>
                                    </div>
                                )}
                                <label className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg cursor-pointer transition-colors duration-300 text-sm">
                                    {editing ? 'Change Image' : 'Upload Image'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>

                            <div className="space-y-4">
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    type="text"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />


                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    type="text"
                                    placeholder="Description"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                />
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    type="text"
                                    placeholder="Address"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4">
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    type="number"
                                    placeholder="Latitude"
                                    value={form.lat}
                                    onChange={(e) => setForm({ ...form, lat: e.target.value })}
                                />
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    type="number"
                                    placeholder="Longitude"
                                    value={form.lng}
                                    onChange={(e) => setForm({ ...form, lng: e.target.value })}
                                />
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    type="email"
                                    placeholder="Contact Email"
                                    value={form.contact}
                                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                                />
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    type="text"
                                    placeholder="Interests (comma separated)"
                                    value={form.interests}
                                    onChange={(e) => setForm({ ...form, interests: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold"
                                >
                                    {editing ? "Update Profile" : "Add Profile"}
                                </button>
                                {editing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage1;
