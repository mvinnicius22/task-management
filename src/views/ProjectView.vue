<template>
    <v-container>
        <p class='pt-2 text-gray-700 font-semibold font-sans tracking-wide text-xl'>Seu trabalho</p>

        <v-divider class="mt-6"></v-divider>

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

    data: () => ({
    }),
});
</script>