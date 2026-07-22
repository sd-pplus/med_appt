import { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const DOCTORS_API = 'https://api.npoint.io/9a5543d36f1460da2f63';

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const speciality = searchParams.get('speciality');
    const name = searchParams.get('name');

    fetch(DOCTORS_API)
      .then((res) => res.json())
      .then((data) => {
        const doctors = Array.isArray(data) ? data : [];

        if (name) {
          const filtered = doctors.filter((doctor) =>
            doctor.name.toLowerCase().includes(name.toLowerCase())
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
          return;
        }

        if (speciality) {
          const filtered = doctors.filter(
            (doctor) =>
              doctor.speciality.toLowerCase() === speciality.toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
          return;
        }

        setFilteredDoctors([]);
        setIsSearched(false);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  const searchLabel =
    searchParams.get('name') || searchParams.get('speciality') || '';

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC />
        <div className="search-results-container">
          {isSearched ? (
            <center>
              <h2>
                {filteredDoctors.length} doctors are available
                {searchLabel ? ` for "${searchLabel}"` : ''}
              </h2>
              <h3>
                Book appointments with minimum wait-time & verified doctor
                details
              </h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCardIC
                    className="doctorcard"
                    {...doctor}
                    key={doctor.name}
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          ) : (
            ''
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
