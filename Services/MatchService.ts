import axios from "axios";

axios.defaults.baseURL = "https://stunning-acorn-xqw4gwjx5rfpvj4-5000.app.github.dev/matches";


export const getMatches = async () => {
  try {
    const response = await axios.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};

export const createMatch = async (name: string, actions: string) => {
  try {
    const response = await axios.post("/", { name, actions });
    return response.data;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};

export const updateMatch = async (
  id: string,
  name: string,
  actions: string
) => {
  try {
    const response = await axios.put(`/${id}`, { name, actions });
    return response.data;
  } catch (error) {
    console.error("Error updating match:", error);
    throw error;
  }
};

export const deleteMatch = async (id: string) => {
  try {
    const response = await axios.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting match:", error);
    throw error;
  }
};

export const getMatchById = async (id: string) => {
  try {
    const response = await axios.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match by ID:", error);
    throw error;
  }
};
