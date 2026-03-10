// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     // Replace with your API URL
//     axios.get('https://localhost:7085/api/Reviews/locations')
//       .then(res => setLocations(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="animate__animated animate__fadeIn">
//       <h2 className="mb-4 fw-bold">Location Performance Summary</h2>
//       <div className="card border-0 shadow-sm p-3">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>Destination</th>
//                 <th>Avg Rating</th>
//                 <th>Total Reviews</th>
//                 <th>Positive</th>
//                 <th>Negative</th>
//                 <th>Neutral</th>
//                 <th>Suggestions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {locations.map((loc, idx) => (
//                 <tr key={idx}>
//                   <td className="fw-bold">{loc.location_Name}</td>
//                   <td><span className="badge bg-warning text-dark">{loc.average_Rating} ⭐</span></td>
//                   <td>{loc.total_Reviews}</td>
//                   <td className="text-success fw-semibold">{loc.total_Positive}</td>
//                   <td className="text-danger fw-semibold">{loc.total_Negative}</td>
//                   <td className="text-secondary">{loc.total_Neutral}</td>
//                   <td><span className="badge bg-info text-dark">{loc.total_Suggestions} Ideas</span></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const Dashboard = () => {
    const [locations, setLocations] = useState([]);
    const [stats, setStats] = useState({ pos: 0, neg: 0, neu: 0 });

    // Coordinates for Sri Lanka locations (You can also add these to your CSV/API)
    const coords = {
        "Arugam Bay": [6.8417, 81.8333],
        "Pinnawala Elephant Orphanage": [7.3015, 80.3875],
        "Royal Botanical Gardens": [7.2683, 80.5966],
        "Polonnaruwa": [7.9403, 81.0188],
        "Wilpattu National Park": [8.4355, 80.0033],
        "Dambulla Cave Temple": [7.8577, 80.6524],
        "Galle Fort": [6.0333, 80.2167],
        "Sigiriya": [7.9570, 80.7603]
    };

    useEffect(() => {
        axios.get('https://localhost:7085/api/Reviews/locations')
            .then(res => {
                setLocations(res.data);
                // Calculate total sentiment for Pie Chart
                const totalPos = res.data.reduce((acc, curr) => acc + curr.total_Positive, 0);
                const totalNeg = res.data.reduce((acc, curr) => acc + curr.total_Negative, 0);
                const totalNeu = res.data.reduce((acc, curr) => acc + curr.total_Neutral, 0);
                setStats({ pos: totalPos, neg: totalNeg, neu: totalNeu });
            })
            .catch(err => console.error(err));
    }, []);

    const pieData = [
        { name: 'Positive', value: stats.pos, color: '#198754' },
        { name: 'Neutral', value: stats.neu, color: '#6c757d' },
        { name: 'Negative', value: stats.neg, color: '#dc3545' },
    ];

    return (
        <div className="animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0">Analytics Executive Overview</h2>
                <span className="badge bg-primary px-3 py-2">Real-time CSV Data</span>
            </div>

            {/* Top Row: Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 bg-white text-center">
                        <small className="text-muted fw-bold">TOTAL REVIEWS</small>
                        <h3 className="fw-bold text-dark">{locations.reduce((a, b) => a + b.total_Reviews, 0)}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 bg-success text-white text-center">
                        <small className="fw-bold">OVERALL POSITIVE</small>
                        <h3 className="fw-bold">{stats.pos}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 bg-danger text-white text-center">
                        <small className="fw-bold">CRITICAL ISSUES</small>
                        <h3 className="fw-bold">{stats.neg}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 bg-info text-white text-center">
                        <small className="fw-bold">AI SUGGESTIONS</small>
                        <h3 className="fw-bold">{locations.reduce((a, b) => a + b.total_Suggestions, 0)}</h3>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                {/* Chart: Rating Comparison */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '15px' }}>
                        <h5 className="fw-bold mb-4">Average Rating per Destination</h5>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={locations}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="location_Name" fontSize={12} />
                                    <YAxis domain={[0, 5]} />
                                    <Tooltip cursor={{fill: '#f8f9fa'}} />
                                    <Bar dataKey="average_Rating" radius={[10, 10, 0, 0]}>
                                        {locations.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.average_Rating >= 4 ? '#0d6efd' : '#fd7e14'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Pie Chart: Sentiment Distribution */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '15px' }}>
                        <h5 className="fw-bold mb-3">Sentiment Share</h5>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                        {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-2">
                            {pieData.map(d => (
                                <div key={d.name} className="d-flex justify-content-between small mb-1">
                                    <span>{d.name}</span>
                                    <span className="fw-bold" style={{color: d.color}}>{Math.round((d.value/ (stats.pos+stats.neg+stats.neu)) * 100)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <div className="p-3 bg-white border-bottom">
                    <h5 className="fw-bold m-0">Geographical Satisfaction Map</h5>
                </div>
                <div style={{ height: '400px', width: '100%' }}>
                    <MapContainer center={[7.8731, 80.7718]} zoom={7} scrollWheelZoom={false} style={{ height: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {locations.map((loc, i) => coords[loc.location_Name] && (
                            <Marker key={i} position={coords[loc.location_Name]}>
                                <Popup>
                                    <strong>{loc.location_Name}</strong><br />
                                    Rating: {loc.average_Rating} ⭐<br />
                                    Positive: {loc.total_Positive}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* Table Section */}
            <div className="card border-0 shadow-sm p-3 mb-5" style={{ borderRadius: '15px' }}>
                <h5 className="fw-bold p-2">Detailed Metrics</h5>
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Destination</th>
                                <th>Avg Rating</th>
                                <th>Reviews</th>
                                <th>Positive</th>
                                <th>Negative</th>
                                <th>Suggestions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((loc, idx) => (
                                <tr key={idx}>
                                    <td className="fw-bold">{loc.location_Name}</td>
                                    <td><span className="badge bg-warning text-dark">{loc.average_Rating} ⭐</span></td>
                                    <td>{loc.total_Reviews}</td>
                                    <td className="text-success">{loc.total_Positive}</td>
                                    <td className="text-danger">{loc.total_Negative}</td>
                                    <td><span className="badge bg-info-subtle text-info border border-info">{loc.total_Suggestions} Actionable</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;