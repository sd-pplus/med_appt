import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import GiveReviews from './GiveReviews';
import './ReviewForm.css';

const doctors = [
  { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology' },
  { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { id: 3, name: 'Dr. Arun Mehta', speciality: 'Neurology' },
  { id: 4, name: 'Dr. Sara Collins', speciality: 'Pediatrics' },
  { id: 5, name: 'Dr. Kevin Brown', speciality: 'Orthopedics' },
  { id: 6, name: 'Dr. Priya Nair', speciality: 'Gynecology' },
];

const ReviewForm = () => {
  const [reviews, setReviews] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const closePopup = () => {
    setSelectedDoctor(null);
  };

  const handleReviewSubmit = (reviewData) => {
    if (!selectedDoctor) return;

    setReviews((prev) => ({
      ...prev,
      [selectedDoctor.id]: reviewData,
    }));
    setSelectedDoctor(null);
  };

  return (
    <div className="reviews-page">
      <h1 className="reviews-page__title">Reviews</h1>

      <div className="reviews-table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide Review</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => {
              const review = reviews[doctor.id];
              const hasReview = Boolean(review?.review);

              return (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.speciality}</td>
                  <td>
                    <button
                      type="button"
                      className={`give-review-btn ${
                        hasReview ? 'give-review-btn--disabled' : ''
                      }`}
                      disabled={hasReview}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      Give Review
                    </button>
                  </td>
                  <td className="review-given-cell">
                    {hasReview ? review.review : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Popup
        modal
        open={!!selectedDoctor}
        onClose={closePopup}
        closeOnDocumentClick
        nested
      >
        {(close) => (
          <GiveReviews
            doctorName={selectedDoctor?.name}
            onSubmit={(reviewData) => {
              handleReviewSubmit(reviewData);
              close();
            }}
            onCancel={() => {
              close();
              closePopup();
            }}
          />
        )}
      </Popup>
    </div>
  );
};

export default ReviewForm;
