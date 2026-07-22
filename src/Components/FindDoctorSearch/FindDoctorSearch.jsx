import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindDoctorSearch.css';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda',
];

const DOCTORS_API = 'https://api.npoint.io/9a5543d36f1460da2f63';

const MagnifyingGlass = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FindDoctorSearch = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities] = useState(initSpeciality);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const searchBoxRef = useRef(null);

  useEffect(() => {
    fetch(DOCTORS_API)
      .then((res) => res.json())
      .then((data) => setDoctors(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  }, []);

  const handleFocus = () => {
    setDoctorResultHidden(false);
  };

  const handleBlur = () => {
    window.setTimeout(() => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(document.activeElement)
      ) {
        setDoctorResultHidden(true);
      }
    }, 200);
  };

  const handleSearchIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDoctorResultHidden((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setDoctorResultHidden(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSpecialitySelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/appointments?speciality=${encodeURIComponent(speciality)}`);
  };

  const handleDoctorNameSelect = (doctor) => {
    setSearchDoctor(doctor.name);
    setDoctorResultHidden(true);
    navigate(
      `/appointments?name=${encodeURIComponent(doctor.name.trim())}`
    );
  };

  const query = searchDoctor.trim().toLowerCase();

  const filteredSpecialities = specialities.filter((speciality) =>
    speciality.toLowerCase().includes(query)
  );

  const filteredDoctorNames = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(query)
  );

  const hasResults =
    filteredSpecialities.length > 0 || filteredDoctorNames.length > 0;

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Book an appointment</h1>
        <div>
          <i
            style={{ color: '#000000', fontSize: '20rem' }}
            className="fa fa-user-md"
          ></i>
        </div>
        <div
          className="home-search-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="doctor-search-box" ref={searchBoxRef}>
            <div className="doctor-search-bar">
              <input
                type="text"
                className="search-doctor-input-box"
                placeholder="Search doctors by name or specialty"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchDoctor}
                onChange={(e) => setSearchDoctor(e.target.value)}
              />

              <button
                type="button"
                className="findiconimg"
                aria-label="Search doctors"
                onMouseDown={handleSearchIconClick}
              >
                <MagnifyingGlass className="findIcon" />
              </button>
            </div>

            {!doctorResultHidden && (
              <div className="search-doctor-input-results">
                {hasResults ? (
                  <>
                    {filteredDoctorNames.map((doctor) => (
                      <div
                        className="search-doctor-result-item"
                        key={`doctor-${doctor.name}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleDoctorNameSelect(doctor);
                        }}
                      >
                        <span className="result-search-icon">
                          <MagnifyingGlass />
                        </span>
                        <span>{doctor.name.trim()}</span>
                        <span>DOCTOR</span>
                      </div>
                    ))}
                    {filteredSpecialities.map((speciality) => (
                      <div
                        className="search-doctor-result-item"
                        key={`speciality-${speciality}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSpecialitySelect(speciality);
                        }}
                      >
                        <span className="result-search-icon">
                          <MagnifyingGlass />
                        </span>
                        <span>{speciality}</span>
                        <span>SPECIALITY</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="search-doctor-result-item no-results">
                    <span>No doctors or specialties found</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
