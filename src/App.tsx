import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/WelcomePage';

function App() {
  return (
    // Wrap your app in GoogleOAuthProvider and pass in your Google Client ID
   
            <Router>
              <div className="min-h-screen">
               
                  <Routes>
                  <Route path="/" element={<SignupPage />} />
                  <Route path="/welcome" element={<CartPage />} />
                  </Routes>
              </div>
            </Router>

  );
}

export default App;
