// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReviewCard from './ReviewCard';

// const ReviewList = () => {
//   const [reviews, setReviews] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const [totalCount, setTotalCount] = useState(0);

//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://localhost:7085/api/Reviews/all-reviews?page=${page}&pageSize=12`);
//       const newData = response.data.data;
//       const serverTotal = response.data.totalCount;
//       setTotalCount(serverTotal);
      
//       // if (newData.length < 12) setHasMore(false);
//       if (reviews.length + newData.length >= serverTotal) {
//             setHasMore(false);
//         } else {
//             setHasMore(true);
//         }
//       setReviews(prev => [...prev, ...newData]);
//     } catch (err) {
//       console.error("Fetch error", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { fetchReviews(); }, [page]);

//   return (
//     <div>
//       <h2 className="mb-4 fw-bold text-center">Visitor Feedback Explorer</h2>
//       <div className="row g-4">
//         {reviews.map((rev, i) => (
//           <div key={i} className="col-md-6 col-lg-4">
//             <ReviewCard review={rev} />
//           </div>
//         ))}
//       </div>
      
//       {hasMore && (
//         <div className="text-center my-5">
//           <button 
//             className="btn btn-primary btn-lg px-5 shadow-sm rounded-pill" 
//             onClick={() => setPage(page + 1)}
//             disabled={loading}
//           >
//             {loading ? <span className="spinner-border spinner-border-sm"></span> : "Load More Experience"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [locations, setLocations] = useState([]);


    const fetchLocations = async () => {
  try {
    const res = await axios.get("https://localhost:7085/api/Reviews/locations");
    setLocations(res.data);
  } catch (err) {
    console.error("Failed to load locations", err);
  }
};

useEffect(() => {
  fetchLocations();
}, []);
    
    // Filter States
    const [location, setLocation] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [rating, setRating] = useState('');

    const fetchReviews = async (isNewFilter = false) => {
        setLoading(true);
        try {
            const currentPage = isNewFilter ? 1 : page;
            const query = `page=${currentPage}&pageSize=12&location=${location}&sentiment=${sentiment}&rating=${rating}`;
            const response = await axios.get(`https://localhost:7085/api/Reviews/all-reviews?${query}`);
            
            const newData = response.data.data;
            const total = response.data.totalCount;

            if (isNewFilter) {
                setReviews(newData);
                setPage(1);
            } else {
                setReviews(prev => [...prev, ...newData]);
            }

            setHasMore((isNewFilter ? newData.length : reviews.length + newData.length) < total);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // Triggered when Load More is clicked
    useEffect(() => {
        if (page > 1) fetchReviews();
    }, [page]);

    // Triggered when Filters change
    const applyFilters = () => {
        fetchReviews(true);
    };

    return (
        <div>
            <div className="card shadow-sm border-0 p-4 mb-5" style={{ borderRadius: '15px' }}>
                <h5 className="fw-bold mb-3 text-secondary">Filter Experiences</h5>
                <div className="row g-3">
                    <div className="col-md-3">
                        {/* <select className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option value="">All Locations</option>
                            <option value="Arugam Bay">Arugam Bay</option>
                            <option value="Polonnaruwa">Polonnaruwa</option>
                            <option value="Wilpattu National Park">Wilpattu</option>
                        </select> */}

                        <select
  className="form-select"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
>
  <option value="">All Locations</option>
  {locations.map((loc) => (
    <option key={loc.location_Name} value={loc.location_Name}>
      {loc.location_Name} ({loc.total_Reviews})
    </option>
  ))}
</select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" value={sentiment} onChange={(e) => setSentiment(e.target.value)}>
                            <option value="">All Sentiments</option>
                            <option value="Positive">Positive</option>
                            <option value="Negative">Negative</option>
                            <option value="Neutral">Neutral</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary w-100 fw-bold" onClick={applyFilters}>Apply Filters</button>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {reviews.map((rev, i) => (
                    <div key={i} className="col-md-6 col-lg-4">
                        <ReviewCard review={rev} />
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="text-center my-5">
                    <button className="btn btn-dark btn-lg px-5 rounded-pill" onClick={() => setPage(p => p + 1)} disabled={loading}>
                        {loading ? 'Searching...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewList;