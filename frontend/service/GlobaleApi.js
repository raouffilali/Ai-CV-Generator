import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const API_URL = import.meta.env.VITE_STRAPI_API_URL;

const axiosCLient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY} `,
  },
});

const CreateNewResume = (data) => {
  return axiosCLient.post("/user-resumes", data);
};

const GetUserResumes = (userEmail) =>
  axiosCLient.get(`/user-resumes?filters[userEmail] [$eq]=${userEmail}`);

const updateResumeDetail = (id, data) =>
  axiosCLient.put(`/user-resumes/${id}`, data);

export default { CreateNewResume, GetUserResumes, updateResumeDetail };
