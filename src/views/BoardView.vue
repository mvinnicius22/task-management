<template>
	<v-container>
		<v-row class="mt-1 pl-3">
			<p class='pt-2 text-gray-500 font-semibold font-sans tracking-wide text-xl'>Projetos / 1 / Board</p>
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
		<div class="flex justify-center">
			<div class="min-h-screen flex overflow-x-scroll py-6">
				<div
					v-for="column in columns"
					:key="column.title"
					class="px-3 py-3 column-width rounded mr-4"
				>
					<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.title}}</p>
					<draggable :list="column.tasks" item-key="id" :animation="200" ghost-class="ghost-card" group="tasks" @change="log">
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
					:task-id="taskId"
					@close="showTaskForm = false"
					@saved="showTaskForm = false"
				></task-form>
			</div>
		</div>
	</v-container>
</template>

<script>
import { defineComponent } from 'vue';
import draggable from 'vuedraggable';
import taskCard from '../components/Card/TaskCard.vue';
import taskForm from '../components/Form/TaskForm.vue';

export default defineComponent({
	name: 'BoardView',

	components: {
		taskCard,
		draggable,
		taskForm,
	},

	data: () => ({
		columns: [
			{
				title: "Backlog",
				tasks: [
					{
						id: 1,
						title: "Add discount code to checkout page",
						date: "Sep 14",
						type: "Feature Request"
					},
					{
						id: 2,
						title: "Provide documentation on integrations",
						date: "Sep 12"
					},
					{
						id: 3,
						title: "Design shopping cart dropdown",
						date: "Sep 9",
						type: "Design"
					},
					{
						id: 4,
						title: "Add discount code to checkout page",
						date: "Sep 14",
						type: "Feature Request"
					},
					{
						id: 5,
						title: "Test checkout flow",
						date: "Sep 15",
						type: "QA"
					}
				]
			},
			{
				title: "In Progress",
				tasks: [
					{
						id: 6,
						title: "Design shopping cart dropdown",
						date: "Sep 9",
						type: "Design"
					},
					{
						id: 7,
						title: "Add discount code to checkout page",
						date: "Sep 14",
						type: "Feature Request"
					},
					{
						id: 8,
						title: "Provide documentation on integrations",
						date: "Sep 12",
						type: "Backend"
				}
				]
			},
			{
				title: "Review",
				tasks: [
					{
						id: 9,
						title: "Provide documentation on integrations",
						date: "Sep 12"
					},
					{
						id: 10,
						title: "Design shopping cart dropdown",
						date: "Sep 9",
						type: "Design"
					},
					{
						id: 11,
						title: "Add discount code to checkout page",
						date: "Sep 14",
						type: "Feature Request"
					},
					{
						id: 12,
						title: "Design shopping cart dropdown",
						date: "Sep 9",
						type: "Design"
					},
					{
						id: 13,
						title: "Add discount code to checkout page",
						date: "Sep 14",
						type: "Feature Request"
					}
				]
			},
			{
				title: "Done",
				tasks: [
					{
						id: 14,
						title: "Add discount code to checkout page",
						date: "Sep 14",
						type: "Feature Request"
					},
					{
						id: 15,
						title: "Design shopping cart dropdown",
						date: "Sep 9",
						type: "Design"
					},
					{
						id: 16,
						title: "Add discount code to checkout page",
						date: "Sep 14",
						type: "Feature Request"
					}
				]
			}
		],
		taskId: null,
		showTaskForm: false,
		projectId: null,
	}),

	created() {
		document.title = "Board";
		this.projectId = this.$route.params.id;
        this.log(this.projectId);
	},

	methods: {
		log(event) {
			console.log(event);
		},
		
		showTask(id = null) {
			this.showTaskForm = true;
			this.taskId = id;
		},

		goToProjects() {
			this.$router.push({ name: 'projects' });
		},
	}
});
</script>

<style scoped>
.column-width {
	min-width: 320px;
	width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
	opacity: 0.5;
	background: #F7FAFC;
	border: 1px solid #4299e1;
}
</style>