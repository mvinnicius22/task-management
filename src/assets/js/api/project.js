import axios from "axios";

export default {
    fetchProjects() {
        return axios.get('projetos');
    },

    fetchProject(id) {
        return axios.get(`projetos/${id}`);
    },

    createProject(project) {
        return axios.post('projetos', project);
    },

    updateProject(id, project) {
        return axios.put(`projetos/${id}`, project);
    },

    deleteProject(id) {
        return axios.delete(`projetos/${id}`);
    }
};
