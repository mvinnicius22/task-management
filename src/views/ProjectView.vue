<template>
    <v-container>
        <v-row class="mt-1 pl-3">
			<p class='pt-2 text-gray-700 font-semibold font-sans tracking-wide text-xl'>Seu trabalho</p>
		</v-row>

        <v-divider class="mt-9"></v-divider>

        <project-list />

        <v-divider class="mt-6"></v-divider>

        <task-list />
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import projectList from '../components/List/ProjectList.vue';
import taskList from '../components/List/TaskList.vue';

export default defineComponent({
	name: 'ProjectView',

    components: {
        projectList,
        taskList,
    },

    created() {
		document.title = "Projects";
	},
});
</script>