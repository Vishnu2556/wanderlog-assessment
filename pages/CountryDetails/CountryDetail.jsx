import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../../services/api';
import { useBucketList } from '../../context/BucketListContext';
import './CountryDetail.css';

export default function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { bucketList, visited, toggleBucketList, toggleVisited } = useBucketList();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByCode(code);
        setCountry(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) return <div className="status-message">Loading...</div>;
  if (error) return <div className="status-message" style={{color: 'red'}}>Error: {error}</div>;
  if (!country) return null;

  const inBucketList = bucketList.includes(country.cca3);
  const isVisited = visited.includes(country.cca3);

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="btn-back">
        &larr; Back to Explore
      </button>

      <div className="detail-card">
        <div className="detail-img-container">
          <img 
            src={country.flags.svg} 
            alt={`Flag of ${country.name.common}`} 
            className="detail-img"
          />
        </div>
        
        <div className="detail-content">
          <h1 className="detail-title">{country.name.common}</h1>
          <h2 className="detail-subtitle">{country.name.official}</h2>
          
          <div className="detail-info">
            <p><strong>Region:</strong> {country.region} ({country.subregion})</p>
            <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          </div>

          <div className="action-buttons">
            <button 
              onClick={() => toggleBucketList(country.cca3)}
              className={`btn-action btn-bucket ${inBucketList ? 'active' : ''}`}
            >
              {inBucketList ? '✓ In Bucket List' : '+ Add to Bucket List'}
            </button>
            
            <button 
              onClick={() => toggleVisited(country.cca3)}
              className={`btn-action btn-visited ${isVisited ? 'active' : ''}`}
            >
              {isVisited ? '✓ Visited' : 'Mark as Visited'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}