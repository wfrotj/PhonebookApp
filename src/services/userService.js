import axios from "axios";

const baseUrl = "http://localhost:4000/api/users";

async function register(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

export default { register };
