// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import custom components
import Notification from './Components/Notification/Notification';
import Landing_Page from './Components/Landing_Page/LandingPage';
import Sign_Up from './Components/Sign_up/Sign_up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileForm from './Components/ProfileCard/ProfileForm';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

// Function component for the main App
function App() {
  // Render the main App component
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Notification wraps pages and renders Navbar + appointment banner */}
        <Notification>
          {/* Set up the Routes for different pages */}
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/instant-consultation"
              element={<InstantConsultation />}
            />
            <Route path="/appointments" element={<BookingConsultation />} />
            <Route path="/reviews" element={<ReviewForm />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/reports" element={<ReportsLayout />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
