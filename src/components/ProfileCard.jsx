import React from 'react';

const ProfileCard = ({ profile, onSummaryClick }) => (
  <div className="bg-white rounded-lg shadow p-4 m-2 w-full md:w-1/3">
    <img src={profile.photo} alt={profile.name} className="w-full h-48 object-cover rounded" />
    <h2 className="text-xl font-semibold mt-2">{profile.name}</h2>
    <p>{profile.description}</p>
    <button onClick={() => onSummaryClick(profile)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      Summary
    </button>
  </div>
);

export default ProfileCard;
