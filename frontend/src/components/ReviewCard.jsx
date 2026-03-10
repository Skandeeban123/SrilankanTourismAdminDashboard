import React, { useState } from 'react';



import { locationAssets, defaultLocationImage } from '../utils/locationAssets';

const ReviewCard = ({ review }) => {
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState(null);

  const image =
  locationAssets[review.location]?.image || defaultLocationImage;

  const isLoggedIn = !!localStorage.getItem('token');

  const handleSolution = () => {
    if (!isLoggedIn) {
            alert("Please login to access business solutions!");
            return;
        }
    setIsSolving(true);
    // Simulate complex analysis delay
    setTimeout(() => {
      setSolution(review.solution);
      setIsSolving(false);
    }, 1000);
  };

  return (
    // <div className="card h-100 border-0 shadow-sm hover-shadow transition" style={{ borderRadius: '15px' }}>
    //   <div className="card-body">
    //     <div className="d-flex justify-content-between align-items-start mb-3">
    //       <div>
    //         <h6 className="fw-bold mb-0 text-primary">{review.userName}</h6>
    //         <small className="text-muted">{review.userLocation || 'Global Traveler'}</small>
    //       </div>
    //       <span className="badge bg-light text-dark border">{review.rating} ⭐</span>
    //     </div>

    //     <p className="card-text text-dark mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
    //       "{review.text.length > 200 ? review.text.substring(0, 200) + '...' : review.text}"
    //     </p>

    //     <div className="d-flex gap-2 mb-3">
    //         <span className={`badge ${review.sentiment === 'Positive' ? 'bg-success' : 'bg-danger'}`}>
    //             {review.sentiment}
    //         </span>
    //         <small className="text-muted fw-bold">{review.location}</small>
    //     </div>

    //     {!solution ? (
    //       <button 
    //         onClick={handleSolution} 
    //         disabled={isSolving}
    //         className="btn btn-outline-dark btn-sm w-100 rounded-pill py-2 fw-bold"
    //       >
    //         {isSolving ? 'Processing...' : '✨ Get Business Solution'}
    //       </button>
    //     ) : (
    //       <div className="mt-2 p-3 bg-primary-subtle rounded animate__animated animate__fadeIn">
    //         <small className="fw-bold text-primary d-block mb-1">STRATEGIC ACTION:</small>
    //         <p className="small mb-0 text-dark italic">{solution}</p>
    //         <button className="btn btn-link btn-sm p-0 mt-1" onClick={() => setSolution(null)}>Close</button>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '15px', overflow: 'hidden' }}>

  {/* Location Image */}
<img
  src={image}
  alt={review.location}
  style={{ height: '160px', objectFit: 'cover' }}
/>

  <div className="card-body">
    <div className="d-flex justify-content-between align-items-start mb-2">
      <div>
        <h6 className="fw-bold mb-0 text-primary">{review.userName}</h6>
        <small className="text-muted">{review.userLocation || 'Global Traveler'}</small>
      </div>
      <span className="badge bg-dark">{review.rating} ⭐</span>
    </div>

    <p className="card-text text-dark mb-3" style={{ fontSize: '0.9rem' }}>
      “{review.text.length > 180 ? review.text.substring(0, 180) + '…' : review.text}”
    </p>

    <div className="d-flex justify-content-between align-items-center mb-3">
      <span className={`badge ${review.sentiment === 'Positive' ? 'bg-success' : review.sentiment === 'Negative' ? 'bg-danger' : 'bg-secondary'}`}>
        {review.sentiment}
      </span>
      <small className="fw-bold text-muted">{review.location}</small>
    </div>

    {!solution ? (
      <button
        onClick={handleSolution}
        disabled={isSolving}
        className="btn btn-outline-dark btn-sm w-100 rounded-pill fw-bold"
      >
        {isSolving ? 'Processing...' : '✨ Get Business Solution'}
      </button>
    ) : (
      <div className="mt-3 p-3 bg-primary-subtle rounded">
        <small className="fw-bold text-primary d-block mb-1">STRATEGIC ACTION</small>
        <p className="small mb-2">{solution}</p>
        <button className="btn btn-link btn-sm p-0" onClick={() => setSolution(null)}>Close</button>
      </div>
    )}
  </div>
</div>
  );
};

export default ReviewCard;