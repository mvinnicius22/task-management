import axios from "axios";

const baseEndpoint = 'projetos';
const endpoint = 'tarefas';

export default {
    fetchTasks(projectId) {
        return axios.get(`${baseEndpoint}/${projectId}/${endpoint}`);
    },

    fetchTask(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    createTask(projectId, task) {
        return axios.post(`${baseEndpoint}/${projectId}/${endpoint}`, task);
    },

    updateTask(id, task) {
        return axios.put(`${endpoint}/${id}`, task);
    },

    deleteTask(id) {
        return axios.delete(`${endpoint}/${id}`);
    }
};
