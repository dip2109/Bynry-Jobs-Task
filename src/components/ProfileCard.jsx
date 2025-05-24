const ProfileCard = ({ profile, onSummaryClick }) => (
  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="p-6 flex flex-col items-center">
      {/* Circular image container */}
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-blue-100 shadow-lg">
        <img 
          src={profile.photo} 
          alt={profile.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/assets/placeholder.jpg';
            e.target.onerror = null;
          }}
        />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{profile.name}</h2>
      <p className="text-gray-600 mb-4 text-center">{profile.description}</p>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {profile.interests.map((interest, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {interest}
          </span>
        ))}
      </div>
      <button 
        onClick={() => onSummaryClick(profile)} 
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
      >
        Summary
      </button>
    </div>
  </div>
);

export default ProfileCard;
