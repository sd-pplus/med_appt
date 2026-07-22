import { useState } from 'react';

function GiveReviews({ doctorName, onSubmit, onCancel }) {
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() && formData.review.trim()) {
      setShowWarning(false);
      onSubmit?.({
        name: formData.name.trim(),
        review: formData.review.trim(),
        rating: formData.rating,
      });
      setFormData({
        name: '',
        review: '',
        rating: 0,
      });
      return;
    }

    setShowWarning(true);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel?.();
  };

  return (
    <div className="give-reviews">
      <h2>Give Your Feedback</h2>
      {doctorName && (
        <p className="give-reviews__doctor">For {doctorName}</p>
      )}
      {showWarning && (
        <p className="warning">Please fill out all fields.</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="give-reviews__group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="give-reviews__group">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            rows="4"
            value={formData.review}
            onChange={handleChange}
          />
        </div>
        <div className="give-reviews__group">
          <label>Rating:</label>
          <div
            className="give-reviews__stars"
            role="radiogroup"
            aria-label="Rating"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`star-btn ${
                  formData.rating >= value ? 'star-btn--active' : ''
                }`}
                onClick={() => handleRatingClick(value)}
                aria-label={`${value} star${value > 1 ? 's' : ''}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="give-reviews__actions">
          <button type="submit" className="give-reviews__submit">
            Submit
          </button>
          <button
            type="button"
            className="give-reviews__cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default GiveReviews;
