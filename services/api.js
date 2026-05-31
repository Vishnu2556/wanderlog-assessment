const REQRES_URL = 'https://reqres.in/api';
const COUNTRIES_URL = 'https://restcountries.com/v3.1';

export const loginUser = async (email, password) => {
  // Developer Fallback: Simulating the API response locally 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'eve.holt@reqres.in') {
        resolve({ token: 'QpwL5tke4Pnpja7X4' }); 
      } else {
        reject(new Error('User not found'));
      }
    }, 800); // 800ms delay to simulate network loading
  });
};

export const getAllCountries = async () => {
  const response = await fetch(`${COUNTRIES_URL}/all?fields=name,flags,cca3,region,population`);
  if (!response.ok) throw new Error('Failed to fetch countries');
  return response.json();
};

export const getCountryByCode = async (code) => {
  const response = await fetch(`${COUNTRIES_URL}/alpha/${code}`);
  if (!response.ok) throw new Error('Failed to fetch country details');
  const data = await response.json();
  return data[0]; 
};