import { createRouter, createWebHistory } from 'vue-router';
import TaskView from '../views/TaskView.vue';
import ProjectView from '../views/ProjectView.vue';

const routes = [
	{
		path: '/',
		name: 'projects',
		component: ProjectView,
	},
	{
		path: '/board/:id',
		name: 'board',
		component: TaskView
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
