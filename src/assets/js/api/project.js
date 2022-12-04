import axios from "axios";

const endpoint = 'projetos';

export default {
    fetchProjects() {
        return axios.get(endpoint);
    },

    fetchProject(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    createProject(project) {
        return axios.post(endpoint, project);
    },

    updateProject(id, project) {
        return axios.put(`${endpoint}/${id}`, project);
    },

    deleteProject(id) {
        return axios.delete(`${endpoint}/${id}`);
    }
};
