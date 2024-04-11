import axios from "axios";

const REACT_URL = import.meta.env.VITE_URL;

const baseUrl = REACT_URL;

async function register(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

export default { register };
