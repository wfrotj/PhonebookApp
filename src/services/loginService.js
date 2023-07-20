import axios from "axios";

const baseUrl = "http://localhost:4000/api/login";

async function login(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

export default { login };
