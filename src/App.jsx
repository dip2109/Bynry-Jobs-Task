import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { ProfileProvider } from './context/ProfileContext';
import Header from './components/Header';
import AdminPage from './pages/AdminPage1';

const App = () => (
  <ProfileProvider>
    <Router>
      <div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  </ProfileProvider>
);

export default App;
