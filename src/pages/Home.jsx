// import React, { useState } from 'react';
// import { useProfiles } from '../context/ProfileContext';
// import ProfileCard from '../components/ProfileCard';
// import ProfileMap from '../components/ProfileMap';
// import SearchBar from '../components/SearchBar';

// const Home = () => {
//   const { profiles } = useProfiles();
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [filters, setFilters] = useState({
//     name: '',
//     location: '',
//     interests: ''
//   });

//   const filteredProfiles = profiles.filter(profile => {
//     const nameMatch = profile.name.toLowerCase().includes(filters.name.toLowerCase());
//     const locationMatch = profile.address.toLowerCase().includes(filters.location.toLowerCase());
//     const interestsMatch = filters.interests === '' || 
//       profile.interests.some(interest => 
//         interest.toLowerCase().includes(filters.interests.toLowerCase())
//       );

//     return nameMatch && locationMatch && interestsMatch;
//   });

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Profile Explorer</h1>
//       <SearchBar filters={filters} setFilters={setFilters} />
//       <div className="flex flex-wrap">
//         {filteredProfiles.map(profile => (
//           <ProfileCard 
//             key={profile.id} 
//             profile={profile} 
//             onSummaryClick={setSelectedProfile} 
//           />
//         ))}
//       </div>
//       {selectedProfile && (
//         <ProfileMap
//           lat={selectedProfile.lat}
//           lng={selectedProfile.lng}
//           name={selectedProfile.name}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;



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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Explorer</h1>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <div className="flex flex-wrap gap-4">
        {filteredProfiles.map(profile => (
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
            onSummaryClick={setSelectedProfile} 
          />
        ))}
      </div>
      {selectedProfile && (
        <ProfileMap
          lat={selectedProfile.lat}
          lng={selectedProfile.lng}
          name={selectedProfile.name}
        />
      )}
    </div>
  );
};

export default Home;