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
        if (task.data) {
            task.data = task.data.split('-');
            task.data = `${task.data[1]}/${task.data[2]}/${task.data[0]}`;
        }
        return axios.post(`${baseEndpoint}/${projectId}/${endpoint}`, task);
    },

    updateTaskStatus(id, status) {
        return axios.put(`${endpoint}/${id}/status`, { status });
    },

    updateTask(id, task) {
        if (task.data) {
            task.data = task.data.split('-');
            task.data = `${task.data[1]}/${task.data[2]}/${task.data[0]}`;
        }
        return axios.put(`${endpoint}/${id}`, task);
    },

    deleteTask(id) {
        return axios.delete(`${endpoint}/${id}`);
    }
};
