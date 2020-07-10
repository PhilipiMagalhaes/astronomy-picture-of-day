import axios from 'axios';
const apiKey = 'DEMO_KEY';
const api = axios.create({
baseURL:`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, 
});

export default api;
