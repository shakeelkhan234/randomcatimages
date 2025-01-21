import React, { useEffect, useState } from 'react';
import './Card.css';
import axios from 'axios';

const Card = () => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // Key for reloading the component

  // Fetch data when the component mounts or reloadKey changes
  useEffect(() => {
    setAnimate(true); // Trigger animation when the component mounts
    setLoading(true); // Reset loading state when reloading
    axios.get('https://api.thecatapi.com/v1/images/search')  // Example API URL
      .then((response) => {
        setData(response.data);  // Set the fetched data
        setLoading(false);        // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message);  // Set error message if request fails
        setLoading(false);
      });
  }, [reloadKey]);  // Effect will run every time reloadKey changes

  // Reload function to increment the reloadKey
  const reloadComponent = () => {
    setReloadKey(prevKey => prevKey + 1);  // Increment the reloadKey to trigger re-render
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={`card ${animate ? 'card-animate' : ''}`}>
        <img src={data[0].url} alt="Cat" className="card-image" />
      </div>
      <h3 className="card-heading">{data[0].breeds}</h3>

      {/* Reload Button */}
      <button className="loadbtn" onClick={reloadComponent}>Next</button>
    </div>
  );
};

export default Card;
