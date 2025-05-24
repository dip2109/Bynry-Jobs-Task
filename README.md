# Profile Explorer Project

## Introduction
Profile Explorer is a React-based web application that allows users to explore and manage profile information with location mapping capabilities. This project was developed as part of the Bynry Jobs internship selection process task.

Created by: **Dipali Gangarde**

## Purpose
The application serves as a profile management system where users can:
- View profiles in an intuitive card layout
- Search profiles by name, location, or interests
- View profile locations on an interactive map
- Manage profiles through an admin interface
- Add, edit, and delete profile information
- Upload and manage profile images

## Tech Stack
- **Frontend Framework:** React.js with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Mapping:** React Leaflet
- **State Management:** Context API
- **Notifications:** React Hot Toast
- **Utilities:**
  - UUID for unique identifiers
  - File Reader API for image handling
  - CSS Grid and Flexbox for layouts

## Project Structure
```
ProfileMapProject/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── ProfileMap.jsx
│   │   └── SearchBar.jsx
│   ├── context/
│   │   └── ProfileContext.jsx
│   ├── data/
│   │   └── profiles.json
│   ├── pages/
│   │   ├── AdminPage1.jsx
│   │   └── Home.jsx
│   ├── utils/
│   │   └── mapUtils.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
│   └── assets/
│       ├── 1.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       ├── 4.jpg
│       ├── 5.jpg
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Features
1. **Profile Display**
   - Grid layout of profile cards
   - Circular profile images
   - Interest tags
   - Location mapping

2. **Search Functionality**
   - Real-time search filtering
   - Search by name, location, or interests
   - Responsive search bar design

3. **Admin Panel**
   - CRUD operations for profiles
   - Image upload capability
   - Form validation
   - Success notifications

4. **Interactive Map**
   - Location visualization
   - Marker popups with profile names
   - OpenStreetMap integration

## Additional Information
This project was created as part of the Bynry Jobs internship selection process. It demonstrates proficiency in:
- Modern React development practices
- Responsive web design
- State management
- File handling
- Map integration
- User interface design
- Form handling and validation

## Acknowledgments
- Bynry Jobs for the opportunity
- OpenStreetMap for mapping data
- React and Tailwind CSS communities

## License
This project is created for educational purposes as part of the Bynry Jobs internship selection process.

---
© 2024 Dipali Gangarde. All Rights Reserved.
