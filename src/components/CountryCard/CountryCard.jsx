import { Link } from 'react-router-dom';
import './CountryCard.css';

export default function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.cca3}`} className="country-card">
      <img 
        src={country.flags.svg} 
        alt={`Flag of ${country.name.common}`} 
        className="card-img"
      />
      <div className="card-body">
        <h3 className="card-title">{country.name.common}</h3>
        <p className="card-text"><strong>Region:</strong> {country.region}</p>
        <p className="card-text"><strong>Population:</strong> {country.population.toLocaleString()}</p>
      </div>
    </Link>
  );
}