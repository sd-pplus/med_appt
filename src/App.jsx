// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import custom components
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/LandingPage';
import Sign_Up from './Components/Sign_up/Sign_up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation';

// Function component for the main App
function App() {
  // Render the main App component
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Display the Navbar component */}
        <Navbar />

        {/* Set up the Routes for different pages */}
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/appointments" element={<BookingConsultation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
