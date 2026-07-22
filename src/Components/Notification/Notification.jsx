// Following code has been commented with appropriate comments for your reference.
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  // Controls whether the notification banner is visible
  const [showNotification, setShowNotification] = useState(false);

  const loadAppointmentNotification = () => {
    const storedUsername =
      sessionStorage.getItem('name') || sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = storedDoctorData?.name
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    if (sessionStorage.getItem('auth-token') || storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername || '');
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    } else {
      setDoctorData(null);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    } else {
      setAppointmentData(null);
      setShowNotification(false);
    }
  };

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    loadAppointmentNotification();

    // Refresh notification when a booking/cancel happens in the same tab
    const handleAppointmentUpdate = () => {
      loadAppointmentNotification();
    };

    window.addEventListener('appointmentUpdated', handleAppointmentUpdate);
    window.addEventListener('storage', handleAppointmentUpdate);

    return () => {
      window.removeEventListener('appointmentUpdated', handleAppointmentUpdate);
      window.removeEventListener('storage', handleAppointmentUpdate);
    };
  }, []);

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />
      {/* Render children components */}
      {children}
      {/* Display appointment details if logged in, data exists, and notification should show */}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <div className="appointment-card__header">
                <h3 className="appointment-card__title">Appointment Details</h3>
                <button
                  type="button"
                  className="appointment-card__close"
                  aria-label="Close notification"
                  onClick={() => setShowNotification(false)}
                >
                  ×
                </button>
              </div>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              {doctorData?.speciality && (
                <p className="appointment-card__message">
                  <strong>Speciality:</strong> {doctorData.speciality}
                </p>
              )}
              <p className="appointment-card__message">
                <strong>Name:</strong> {appointmentData?.name || username}
              </p>
              <p className="appointment-card__message">
                <strong>Phone Number:</strong> {appointmentData?.phoneNumber}
              </p>
              <p className="appointment-card__message">
                <strong>Date:</strong> {appointmentData?.date}
              </p>
              <p className="appointment-card__message">
                <strong>Time:</strong> {appointmentData?.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;
