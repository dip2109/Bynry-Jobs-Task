import React, { useState } from 'react';
import { useProfiles } from '../context/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import ProfileMap from '../components/ProfileMap';
import {SearchBar} from '../components/SearchBar';

const Home = () => {
  const { profiles } = useProfiles();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Profile Explorer</h1>
        
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfiles.map(profile => (
            <ProfileCard 
              key={profile.id} 
              profile={profile} 
              onSummaryClick={setSelectedProfile} 
            />
          ))}
        </div>

        {selectedProfile && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <ProfileMap
              lat={selectedProfile.lat}
              lng={selectedProfile.lng}
              name={selectedProfile.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;