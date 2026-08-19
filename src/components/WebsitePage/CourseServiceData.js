import api from "../api";

 
export const getDepartments = async () => {
  const response = await api.get("/departments/");

  return response.data.results;
};
 
export const getCourses = async (slug) => {
    const response = await api.get(`/courses/?department=${slug}`);

    return response.data.results;
};
export const getSubjects = async (slug) => {
    const response = await api.get(`/materials/subjects/?course=${slug}`);

    return response.data.results;
};

export const createUser = async (data) => {
    const response = await api.post("/student-forms/", data);
    return response.data;
};

