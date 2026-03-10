// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import { locationAssets, defaultLocationImage } from "../utils/locationAssets";
// import { useNavigate } from "react-router-dom";

// const AddReview = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     location: "Arugam Bay",
//     userLocation: "",
//     rating: 5,
//     text: "",
//   });

//   const [locations, setLocations] = useState([]);

//   const locationData = [
//     {
//       name: "Arugam Bay",
//       image:
//         "https://lp-cms-production.imgix.net/2019-06/f0275838e5f1a765d23f3d1835d4c541-arugam-bay-beach.jpg?auto=format,compress&q=72&w=1095&h=821&fit=crop&crop=faces,edges",
//       description:
//         "A world-famous surfing destination with beautiful beaches and relaxed vibes.",
//     },
//     {
//       name: "Pinnawala Elephant Orphanage",
//       image:
//         "https://www.travellankaconnection.com/images/destinations/gallery_Pinnawala_elephant_orphanage.jpg",
//       description:
//         "A sanctuary where visitors can see elephants up close in a natural environment.",
//     },
//     {
//       name: "Royal Botanical Gardens",
//       image:
//         "https://cdn.forevervacation.com/uploads/digital/assets/royal-botanic-gardens.jpg",
//       description:
//         "Lush botanical gardens with rare plants and peaceful walking paths.",
//     },
//     {
//       name: "Polonnaruwa",
//       image:
//         "https://cdn.forevervacation.com/uploads/tour/polonnaruwa-unesco-ancient-city-and-elephant-safari-adventure-4722.jpg?tr=w-560,h-638",
//       description:
//         "Ancient city with well-preserved ruins and rich Sri Lankan history.",
//     },
//     {
//       name: "Wilpattu National Park",
//       image:
//         "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0e/18/71/c1.jpg",
//       description:
//         "Sri Lanka’s largest national park, famous for leopards and wildlife.",
//     },
//     {
//       name: "Dambulla Cave Temple",
//       image:
//         "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/b5/60/e9/inside-the-second-cave.jpg?w=900&h=500&s=1",
//       description:
//         "UNESCO World Heritage site with stunning Buddhist cave paintings.",
//     },
//   ];

//   //const locations = ["Arugam Bay", "Pinnawala Elephant Orphanage", "Royal Botanical Gardens", "Polonnaruwa", "Wilpattu National Park", "Dambulla Cave Temple"];

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const res = await axios.get(
//           "https://localhost:7085/api/Reviews/locations",
//         );
//         setLocations(res.data);

//         // auto-select first location
//         if (res.data.length > 0) {
//           setFormData((prev) => ({
//             ...prev,
//             location: res.data[0].location_Name,
//           }));
//         }
//       } catch (err) {
//         console.error("Failed to load locations", err);
//       }
//     };

//     fetchLocations();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("https://localhost:7085/api/reviews/submit", formData);
//       alert("Review Submitted! It is now stored in the database.");
//       navigate("/reviews"); // Redirect to see reviews
//     } catch (err) {
//       alert("Error submitting review");
//     }
//   };

//   return (
//     <div
//       className="card shadow border-0 p-4 mx-auto"
//       style={{ maxWidth: "600px", borderRadius: "20px" }}
//     >
//       <h3 className="fw-bold mb-4">Share Your Experience</h3>
//       <form onSubmit={handleSubmit}>
//         {/* <div className="mb-3">
//                     <label className="form-label">Destination</label>
//                     <select className="form-select" value={formData.location} required
//                         onChange={(e) => setFormData({...formData, location: e.target.value})}>
//                         {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
//                     </select>
//                 </div> */}

//         {/* <div className="mb-4">
//           <label className="form-label fw-bold">Choose Destination</label>

//           <div className="row g-3">
//             {locationData.map((loc) => (
//               <div className="col-md-6" key={loc.name}>
//                 <div
//                   className={`card h-100 shadow-sm border-2 ${
//                     formData.location === loc.name
//                       ? "border-primary"
//                       : "border-light"
//                   }`}
//                   style={{ cursor: "pointer", borderRadius: "15px" }}
//                   onClick={() =>
//                     setFormData({ ...formData, location: loc.name })
//                   }
//                 >
//                   <img
//                     src={loc.image}
//                     className="card-img-top"
//                     alt={loc.name}
//                     style={{
//                       height: "160px",
//                       objectFit: "cover",
//                       borderTopLeftRadius: "15px",
//                       borderTopRightRadius: "15px",
//                     }}
//                   />
//                   <div className="card-body">
//                     <h6 className="fw-bold">{loc.name}</h6>
//                     <p className="text-muted small mb-0">{loc.description}</p>
//                   </div>

//                   {formData.location === loc.name && (
//                     <div className="text-center text-primary fw-bold pb-2">
//                       ✓ Selected
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div> */}

//         <div className="mb-4">
//   <label className="form-label fw-bold">Choose Destination</label>

//   <div className="row g-3">
//     {locations.map((loc) => {
//       const image =
//         locationAssets[loc.location_Name]?.image || defaultLocationImage;

//       return (
//         <div className="col-md-6" key={loc.location_Name}>
//           <div
//             className={`card h-100 shadow-sm border-2 ${
//               formData.location === loc.location_Name
//                 ? "border-primary"
//                 : "border-light"
//             }`}
//             style={{ cursor: "pointer", borderRadius: "15px" }}
//             onClick={() =>
//               setFormData({ ...formData, location: loc.location_Name })
//             }
//           >
//             <img
//               src={image}
//               alt={loc.location_Name}
//               style={{
//                 height: "160px",
//                 objectFit: "cover",
//                 borderTopLeftRadius: "15px",
//                 borderTopRightRadius: "15px"
//               }}
//             />

//             <div className="card-body">
//               <h6 className="fw-bold mb-1">{loc.location_Name}</h6>
//               <small className="text-muted">
//                 ⭐ {loc.average_Rating} • {loc.total_Reviews} reviews
//               </small>
//             </div>

//             {formData.location === loc.location_Name && (
//               <div className="text-center text-primary fw-bold pb-2">
//                 ✓ Selected
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </div>

//         <div className="mb-3">
//           <label className="form-label">Your Location (City/Country)</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="e.g. London, UK"
//             required
//             onChange={(e) =>
//               setFormData({ ...formData, userLocation: e.target.value })
//             }
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Rating (1-5)</label>
//           <input
//             type="range"
//             className="form-range"
//             min="1"
//             max="5"
//             value={formData.rating}
//             onChange={(e) =>
//               setFormData({ ...formData, rating: parseInt(e.target.value) })
//             }
//           />
//           <div className="text-center fw-bold text-primary">
//             {formData.rating} Stars
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Your Review</label>
//           <textarea
//             className="form-control"
//             rows="4"
//             placeholder="How was your visit?"
//             required
//             onChange={(e) => setFormData({ ...formData, text: e.target.value })}
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary w-100 py-2 fw-bold rounded-pill"
//         >
//           Post Review
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddReview;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { locationAssets, defaultLocationImage } from "../utils/locationAssets";

const AddReview = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
    userLocation: "",
    rating: 5,
    text: ""
  });

  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingLocations, setLoadingLocations] = useState(true);

  /* ---------------- FETCH LOCATIONS ---------------- */
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7085/api/Reviews/locations"
        );

        setLocations(res.data);

        // Auto-select first location
        if (res.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            location: res.data[0].location_Name
          }));
        }
      } catch (err) {
        console.error("Failed to load locations", err);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  /* ---------------- FILTER LOCATIONS ---------------- */
  const filteredLocations = locations.filter(loc =>
    loc.location_Name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- SUBMIT REVIEW ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://localhost:7085/api/reviews/submit",
        formData
      );
      alert("Review Submitted Successfully!");
      navigate("/reviews");
    } catch (err) {
      alert("Error submitting review");
    }
  };

  return (
    <div
      className="card shadow border-0 p-4 mx-auto"
      style={{ maxWidth: "650px", borderRadius: "20px" }}
    >
      <h3 className="fw-bold mb-4 text-center">Share Your Experience</h3>

      <form onSubmit={handleSubmit}>

        {/* ================= LOCATION SELECTOR ================= */}
        <div className="mb-4">
          <label className="form-label fw-bold">
            Choose Destination
          </label>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="🔍 Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div
            className="list-group shadow-sm"
            style={{
              maxHeight: "280px",
              overflowY: "auto",
              borderRadius: "12px"
            }}
          >
            {loadingLocations && (
              <div className="list-group-item text-center">
                Loading locations...
              </div>
            )}

            {!loadingLocations && filteredLocations.length === 0 && (
              <div className="list-group-item text-center text-muted">
                No locations found
              </div>
            )}

            {filteredLocations.map((loc) => (
              <button
                key={loc.location_Name}
                type="button"
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  formData.location === loc.location_Name ? "active" : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    location: loc.location_Name
                  })
                }
              >
                <div>
                  <div className="fw-bold">
                    {loc.location_Name}
                  </div>
                  <small className="text-muted">
                    ⭐ {loc.average_Rating} • {loc.total_Reviews} reviews
                  </small>
                </div>
                {formData.location === loc.location_Name && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* ================= SELECTED LOCATION PREVIEW ================= */}
        {formData.location && (
          <div className="card mb-4 shadow-sm border-0">
            <img
              src={
                locationAssets[formData.location]?.image ||
                defaultLocationImage
              }
              alt={formData.location}
              style={{
                height: "200px",
                objectFit: "cover",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px"
              }}
            />
            <div className="card-body">
              <h5 className="fw-bold mb-1">
                {formData.location}
              </h5>
              <small className="text-muted">
                Selected destination for your review
              </small>
            </div>
          </div>
        )}

        {/* ================= USER LOCATION ================= */}
        <div className="mb-3">
          <label className="form-label">
            Your Location (City / Country)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. London, UK"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                userLocation: e.target.value
              })
            }
          />
        </div>

        {/* ================= RATING ================= */}
        <div className="mb-3">
          <label className="form-label">
            Rating (1–5)
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) =>
              setFormData({
                ...formData,
                rating: parseInt(e.target.value)
              })
            }
          />
          <div className="text-center fw-bold text-primary">
            {formData.rating} Stars
          </div>
        </div>

        {/* ================= REVIEW TEXT ================= */}
        <div className="mb-4">
          <label className="form-label">
            Your Review
          </label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="How was your visit?"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                text: e.target.value
              })
            }
          ></textarea>
        </div>

        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          className="btn btn-primary w-100 py-2 fw-bold rounded-pill"
        >
          Post Review
        </button>

      </form>
    </div>
  );
};

export default AddReview;