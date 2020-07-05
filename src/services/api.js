import axios from 'axios';
const apiKey = 'VqCykSnzg7xUbV0cmh5wzLAyStAmMH7Ny7bXbEji';
const api = axios.create({
baseURL:`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, 
});

export default api;