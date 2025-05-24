import React, { createContext, useState, useContext } from 'react';
import profilesData from '../data/profiles.json';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(profilesData);

  const addProfile = (newProfile) => {
    setProfiles([...profiles, newProfile]);
  };

  const updateProfile = (updatedProfile) => {
    setProfiles(profiles.map(p => 
      p.id === updatedProfile.id ? updatedProfile : p
    ));
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };

  return (
    <ProfileContext.Provider value={{ 
      profiles, 
      addProfile, 
      updateProfile, 
      deleteProfile 
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => useContext(ProfileContext);