import axios from "axios";

const api = axios.create({
  baseURL: "https://ocampo.onrender.com"
});

export default api;