import { useState, useEffect } from 'react';
import { getAllCountries } from '../../services/api';
import CountryCard from '../../src/components/CountryCard/CountryCard';
import './Explore.css';

export default function Explore() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === '' || country.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  if (loading) return <div className="status-message">Loading countries...</div>;
  if (error) return <div className="status-message" style={{color: 'red'}}>Error: {error}</div>;

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore the World</h1>
      
      <div className="controls">
        <input 
          type="text" 
          placeholder="Search countries..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select 
          value={regionFilter} 
          onChange={(e) => setRegionFilter(e.target.value)}
          className="region-select"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="country-grid">
        {filteredCountries.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
      
      {filteredCountries.length === 0 && (
        <div className="status-message">No countries found matching your criteria.</div>
      )}
    </div>
  );
}