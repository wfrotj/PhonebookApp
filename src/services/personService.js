import axios from "axios";

const REACT_URL = import.meta.env.VITE_URL;

const baseUrl = REACT_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    common: {
      "Content-Type": "multipart/form-data",
    },
  },
});

function setToken(newToken) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
}

async function getPersons() {
  const response = await apiClient.get("/api/persons");
  return response.data;
}

async function createPerson(person) {
  const response = await apiClient.post("/api/persons", person);
  return response.data;
}

async function updatePerson(id, person) {
  const response = await apiClient.put(`/api/persons/${id}`, person);
  return response.data;
}

async function deletePerson(id) {
  const response = await apiClient.delete(`/api/persons/${id}`);
  return response.status;
}

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
  setToken,
};
