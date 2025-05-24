import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useProfiles } from '../context/ProfileContext';
import { SearchBar } from '../components/SearchBar';

const AdminPanel = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfiles();
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
    } else {
      addProfile(profileData);
    }

    resetForm();
  };

  const handleEdit = (profile) => {
    setEditing(profile);
    setForm({
      ...profile,
      interests: profile.interests.join(', ')
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      deleteProfile(id);
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const nameMatch = profile.name.toLowerCase().includes(filters.name.toLowerCase());
    const locationMatch = profile.address.toLowerCase().includes(filters.location.toLowerCase());
    const interestsMatch = filters.interests === '' || 
      profile.interests.some(interest => 
        interest.toLowerCase().includes(filters.interests.toLowerCase())
      );

    return nameMatch && locationMatch && interestsMatch;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* Search Bar */}
      <SearchBar filters={filters} setFilters={setFilters} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="p-2 border rounded" required type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="p-2 border rounded" required type="text" placeholder="Photo URL" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} />
          <input className="p-2 border rounded" required type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="p-2 border rounded" required type="text" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <input className="p-2 border rounded" required type="number" placeholder="Latitude" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} />
          <input className="p-2 border rounded" required type="number" placeholder="Longitude" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} />
          <input className="p-2 border rounded" required type="email" placeholder="Contact Email" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          <input className="p-2 border rounded" type="text" placeholder="Interests (comma separated)" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? "Update Profile" : "Add Profile"}
        </button>
        {editing && (
          <button type="button" onClick={resetForm} className="mt-4 ml-2 bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </form>

      {/* Profile List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfiles.map(profile => (
          <div key={profile.id} className="bg-white shadow rounded p-4">
            <img src={profile.photo} alt={profile.name} className="h-40 w-full object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{profile.name}</h3>
            <p className="text-sm">{profile.description}</p>
            <p className="text-sm text-gray-600">{profile.address}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(profile)} className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Edit</button>
              <button onClick={() => handleDelete(profile.id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
