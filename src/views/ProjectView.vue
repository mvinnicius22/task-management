<template>
    <v-container>
        <v-row class="mt-1 pl-3">
			<p class='pt-2 text-gray-700 font-semibold font-sans tracking-wide text-xl'>Seu trabalho</p>
			<v-card-actions class="pt-0">
				<v-btn
					text
					color="blue darken-1"
                    @click="showProject()"
                >
                    <v-icon
                        left
                        dark
                    >
                        mdi-plus
                        </v-icon>
					Novo projeto
				</v-btn>
			</v-card-actions>
		</v-row>

        <project-form
            v-if="showProjectForm"
            :project-id="projectId"
            @close="showProjectForm = false"
            @saved="showProjectForm = false"
        ></project-form>

        <v-divider class="mt-6"></v-divider>

        <project-list @update-project="id => showProject(id)"/>

        <v-divider class="mt-6"></v-divider>

        <task-list />
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import projectForm from '../components/Form/ProjectForm.vue';
import projectList from '../components/List/ProjectList.vue';
import taskList from '../components/List/TaskList.vue';

export default defineComponent({
	name: 'ProjectView',

    components: {
        projectForm,
        projectList,
        taskList,
    },

    data: () => ({
        showProjectForm: false,
        projectId: null,
    }),

    created() {
		document.title = "Projects";
	},

    methods: {
        showProject(id = null) {
            this.showProjectForm = true;
            this.projectId = id;
        },
    },
});
</script>