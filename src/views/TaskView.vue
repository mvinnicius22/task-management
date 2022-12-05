<template>
	<v-container>
		<v-row class="mt-1 pl-3">
			<p class='pt-2 text-gray-500 font-semibold font-sans tracking-wide text-xl'>Projetos / {{ projectId }} / Board</p>
			<v-card-actions class="pt-0">
				<v-btn
					text
					color="blue darken-1"
                    @click="showTask()"
                >
                    <v-icon
                        left
                        dark
                    >
                        mdi-plus
                        </v-icon>
					Nova Tarefa
				</v-btn>
				<v-btn
					text
					color="blue darken-1"
					@click="goToProjects()"
				>
					Voltar
				</v-btn>
			</v-card-actions>
		</v-row>
		<v-divider class="mt-5"></v-divider>
		<div v-if="!loading" class="flex justify-center">
			<div class="min-h-screen flex overflow-x-scroll py-6">
				<div
					v-for="column in columns"
					:key="column.title"
					class="px-3 py-3 column-width rounded"
				>
					<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.title}}</p>
					<draggable
						:list="column.tasks" 
						item-key="id" 
						:animation="200" 
						ghost-class="ghost-card" 
						group="tasks" 
						:emptyInsertThreshold="100"
						@change="moveTask($event, column.title)"
					>
						<template #item="{ element, index }">
							<task-card
								:key="index"
								:task="element"
								class="mt-3 cursor-move"
								@click="showTask(element.id)"
							>
							</task-card>
						</template>
					</draggable>
				</div>
				<task-form
					v-if="showTaskForm"
					:project-id="projectId"
					:task-id="taskId"
					@close="closeTask"
					@saved="[
						notify(),
						closeTask(),
						fetchTasks(projectId),
					]"
				></task-form>
			</div>
		</div>
		<v-snackbar
			v-model="dialog.show"
			:color="dialog.color"
			:timeout="5000"
			text
		>
			{{ dialog.message }}
		</v-snackbar>
	</v-container>
</template>

<script>
import { defineComponent } from 'vue';
import draggable from 'vuedraggable';
import taskApi from '../assets/js/api/task.js';
import taskCard from '../components/Card/TaskCard.vue';
import taskForm from '../components/Form/TaskForm.vue';
import statusesMixin from '../assets/js/mixins/statuses.js';

export default defineComponent({
	name: 'BoardView',

	components: {
		taskCard,
		draggable,
		taskForm,
	},

	mixins: [
		statusesMixin,
	],

	data: () => ({
		columns: [],
		loading: true,
		taskId: null,
		showTaskForm: false,
		projectId: null,
	}),

	created() {
		document.title = "Board";
		this.projectId = this.$route.params.id;
		this.fetchStatuses();
        this.fetchTasks(this.projectId);
	},

	methods: {
		fetchStatuses() {
			this.statuses.forEach((status) => {
				this.columns.push({
					title: status,
					tasks: []
				});
			});
		},

		fetchTasks(projectId) {
            this.loading = true;
            taskApi.fetchTasks(projectId).then((response) => {
				this.columns.forEach((column) => {
					column.tasks = [];
				});
				response.data.forEach((task) => {
					if (! task.status) task.status = 'Backlog';
					this.columns.findIndex((column) => {
						if (column.title === task.status) {
							column.tasks.push(task);
						}
					});
				});
            }).finally(() => {
                this.loading = false;
            });
        },

		moveTask(event, status) {
			if (! event.added) return;
			taskApi.updateTaskStatus(event.added.element.id, status).then(() => {
				this.notify('Tarefa movida com sucesso!', 'success');
			}).catch(() => {
				this.notify('Error moving task', 'error');
			}).finally(() => {
				this.fetchTasks(this.projectId);
			});
		},
		
		showTask(id = null) {
			this.showTaskForm = true;
			this.taskId = id;
		},

		closeTask() {
            this.showTaskForm = false;
        },

        notify(message = null, color = 'success') {
            this.alertSuccess(message || 'Operação realizada com sucesso!', color);
        },

		goToProjects() {
			this.$router.push({ name: 'projects' });
		},
	}
});
</script>

<style scoped>
.column-width {
	min-width: 270px;
	width: 270px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
	opacity: 0.5;
	background: #F7FAFC;
	border: 1px solid #4299e1;
}
</style>