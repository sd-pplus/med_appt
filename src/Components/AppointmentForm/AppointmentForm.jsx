import { useState } from 'react';

const PHONE_REGEX = /^\d{10}$/;
const NAME_REGEX = /^[a-zA-Z][a-zA-Z\s.'-]{1,49}$/;

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = name.trim();
    const trimmedPhone = phoneNumber.replace(/[\s()-]/g, '');
    const today = getTodayDate();

    if (!trimmedName) {
      nextErrors.name = 'Patient name is required.';
    } else if (!NAME_REGEX.test(trimmedName)) {
      nextErrors.name =
        'Enter a valid name using letters only (2–50 characters).';
    }

    if (!trimmedPhone) {
      nextErrors.phoneNumber = 'Phone number is required.';
    } else if (!PHONE_REGEX.test(trimmedPhone)) {
      nextErrors.phoneNumber = 'Enter a valid 10-digit phone number.';
    }

    if (!date) {
      nextErrors.date = 'Appointment date is required.';
    } else if (date < today) {
      nextErrors.date = 'Appointment date cannot be in the past.';
    }

    if (!time) {
      nextErrors.time = 'Appointment time is required.';
    } else if (date === today) {
      const now = new Date();
      const [hours, minutes] = time.split(':').map(Number);
      const selected = new Date();
      selected.setHours(hours, minutes, 0, 0);
      if (selected <= now) {
        nextErrors.time = 'Appointment time must be in the future.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      name: name.trim(),
      phoneNumber: phoneNumber.replace(/[\s()-]/g, ''),
      date,
      time,
    });
    setName('');
    setPhoneNumber('');
    setDate('');
    setTime('');
    setErrors({});
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form" noValidate>
      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearFieldError('name');
          }}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            clearFieldError('phoneNumber');
          }}
          placeholder="10-digit number"
          aria-invalid={!!errors.phoneNumber}
        />
        {errors.phoneNumber && (
          <p className="form-error">{errors.phoneNumber}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={date}
          min={getTodayDate()}
          onChange={(e) => {
            setDate(e.target.value);
            clearFieldError('date');
          }}
          aria-invalid={!!errors.date}
        />
        {errors.date && <p className="form-error">{errors.date}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="appointmentTime">Appointment Time:</label>
        <input
          type="time"
          id="appointmentTime"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            clearFieldError('time');
          }}
          aria-invalid={!!errors.time}
        />
        {errors.time && <p className="form-error">{errors.time}</p>}
      </div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
