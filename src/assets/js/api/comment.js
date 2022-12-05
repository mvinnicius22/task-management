import axios from "axios";

const baseEndpoint = 'tarefas';
const endpoint = 'comentarios';

export default {
    fetchComments(taskId) {
        return axios.get(`${baseEndpoint}/${taskId}/${endpoint}`);
    },

    fetchComment(id) {
        return axios.get(`${endpoint}/${id}`);
    },

    createComment(taskId, comment) {
        return axios.post(`${baseEndpoint}/${taskId}/${endpoint}`, comment);
    },

    updateComment(id, comment) {
        return axios.put(`${endpoint}/${id}`, comment);
    },

    deleteComment(id) {
        return axios.delete(`${endpoint}/${id}`);
    }
};
